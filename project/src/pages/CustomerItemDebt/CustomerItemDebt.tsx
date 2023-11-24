import { useEffect, useState } from 'react'
import { PageWrapper, SelectOption, TitleBarWrapper } from '../../style/style'
import BlueButton from '../../components/Button/BlueButton/BlueButton'
import { Button, DatePicker, Input, Modal } from 'antd'
import dayjs from 'dayjs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SelectionSpace } from './customerItemDebtStyle';
import CustomerDebtTable from '../../components/Tables/CustomerDebtTable/CustomerDebtTable';
const { RangePicker } = DatePicker;

const CustomerItemDebt = () => {
    const { id } = useParams()
    const [record, setRecord] = useState([])
    const [payModal, setPayModal] = useState(false)
    const [status, setStatus] = useState("")
    const [date, setDate] = useState({
        from: dayjs().startOf("M").format("YYYY-MM-DD"),
        to: dayjs().format("YYYY-MM-DD")
    })

    const [payDate, setPayDate] = useState(dayjs().format("YYYY-MM-DD"))

    const [totalDebt, setTotalDebt] = useState()

    const getStatus = () => {

        if (status === undefined) {
            return ""
        }

        return status
    }

    const getDebtRecord = async () => {
        const data = await axios.get(`/api/ghinoKhachHang/${id}?page=1&numberpage=20&from=${date.from}&to=${date.to}&status=${getStatus()}`)
        setRecord(data.data.data)
    }

    const getDebtByTime = async () => {
        const data = await axios.get(`/api/ghinoKhachHang/check/${id}?to=${payDate}`)
        setTotalDebt(data.data)
    }

    const payDebtPost = async () => {
        await axios.post(`/api/ghinoKhachHang/update/${id}`, { to: payDate })
    }

    useEffect(() => {
        getDebtRecord()
    }, [date, status])

    return (
        <PageWrapper>
            {payModal &&
                <Modal
                    title="Thanh toán"
                    open={payModal}
                    onCancel={() => {
                        setPayModal(false)
                        setTotalDebt(undefined)
                    }}
                    onOk={() => {
                        payDebtPost()
                        getDebtRecord()
                    }}
                >
                    <h5>Chọn ngày thanh toán</h5>
                    <div>
                        <DatePicker
                            defaultValue={dayjs()}
                            format={"DD/MM/YYYY"}
                            onChange={(e) => {
                                setPayDate(dayjs(e).format("YYYY-MM-DD"))
                            }}
                        />
                        <Button
                            onClick={() => {
                                getDebtByTime()
                            }}>
                            Kiểm tra
                        </Button>
                    </div>
                    <h5>Tất cả ghi nợ từ ngày này trở về trước chưa thanh toán sẽ được thanh toán</h5>
                    {totalDebt && <h3>Có {totalDebt.total} ghi nợ sẽ được thanh toán</h3>}
                    {totalDebt && <h3>Tổng trị giá {totalDebt.amount}</h3>}

                </Modal>
            }
            <TitleBarWrapper>
                <BlueButton name={"thanh toán"} setOpenModal={setPayModal} />
                <SelectionSpace>
                    <RangePicker
                        style={{
                            flexBasis: "60%"
                        }}
                        onChange={(e) => {
                            setDate({
                                from: dayjs(e[0]).format("YYYY-MM-DD"),
                                to: dayjs(e[1]).format("YYYY-MM-DD")
                            })
                        }}
                    />
                    <SelectOption
                        onChange={(e) => {
                            setStatus(e)
                        }}
                        style={{
                            flexBasis: "40%"
                        }}
                        options={[
                            {
                                key: 0,
                                value: "",
                                label: "Tất cả"
                            },
                            {
                                key: "1",
                                value: 1,
                                label: "Đã thanh toán"
                            },
                            {
                                key: 2,
                                value: "-1",
                                label: "Chưa thanh toán"
                            }
                        ]}

                    />
                </SelectionSpace>
            </TitleBarWrapper>
            <CustomerDebtTable status={status} record={record} />
        </PageWrapper>
    )
}

export default CustomerItemDebt
