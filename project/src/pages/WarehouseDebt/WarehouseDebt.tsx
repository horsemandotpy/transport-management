import { useEffect, useState } from 'react'
import { PageWrapper, TitleBarWrapper } from '../../style/style'
import BlueButton from '../../components/Button/BlueButton/BlueButton'
import { Button, DatePicker, Modal } from 'antd'
import dayjs from 'dayjs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WarehouseDebtTable from '../../components/Tables/WarehouseDebt/WarehouseDebtTable';

const WarehouseDebt = () => {
    const { id } = useParams()
    const [record, setRecord] = useState([])
    const [payModal, setPayModal] = useState(false)


    const [payDate, setPayDate] = useState(dayjs().format("YYYY-MM-DD"))

    const [totalDebt, setTotalDebt] = useState()

    const getDebtRecord = async () => {
        const data = await axios.get(`/api/ghino/${id}?page=1&numberpage=20`)
        setRecord(data.data.data)
    }

    const getDebtByTime = async () => {
        const data = await axios.get(`/api/ghino/check/${id}?to=${payDate}`)
        setTotalDebt(data.data)
    }

    const payDebtPost = async () => {
        await axios.post(`/api/ghino/update/${id}`, { to: payDate })
    }

    useEffect(() => {
        getDebtRecord()
    }, [])

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
            </TitleBarWrapper>
            <WarehouseDebtTable record={record} />
        </PageWrapper>
    )
}

export default WarehouseDebt
