import React, { useContext, useEffect, useState } from 'react'
import { PageTitle, PageWrapper, TitleBarWrapper } from '../../style/style'
import { DatePicker, Input, Modal } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BlueButton from '../../components/Button/BlueButton/BlueButton'
import dayjs from 'dayjs'
import PartnerPaymentTable from '../../components/Tables/PartnerPaymentTable/PartnerPaymentTable'
import { PaymentModalColumn } from './partnerPaymentStyle'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { storeSetPartner } from '../../store/filter-reducer'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
const { RangePicker } = DatePicker;

const PartnerPayment = () => {
    const { id } = useParams()
    const dateFormat = 'DD/MM/YYYY';
    const REGEX_NUMBER = new RegExp(/^[0-9]*\.?[0-9]*$/)
    const [loadingPage, setLoadingPage] = useState(false)
    const [updateRecord, setUpdateRecord] = useState(false)

    const [user, setUser] = useState("")
    const [paymentData, setPaymentData] = useState([])
    const [paymentModal, setPaymentModal] = useState(false)
    const [dateback, setDateback] = useState()
    const [paymentRecord, setPaymentRecord] = useState({
        amount: "0",
        currency: "VNĐ",
        employee: user,
        id_payer: id,
        note: "",
        payment_type: 1,
        paymentDate: "",
        type: 1,
    })

    const dispatch = useDispatch()
    const partner = useSelector(state => state.filter.partner);

    const getUser = async () => {
        const data = await axios.get("/api/user/user")
        setUser(data.data.name)
    }

    const getPaymentData = async (id, dateback) => {
        setLoadingPage(true)
        const data = await axios.get(`/api/thanhtoans?
                                     id_payer=${id}&type=1&page=1
                                     &numberPage=20${dateback && `&fromDate=${dateback[0]}
                                     &toDate${dateback[1]}`
            || ""}`)
        setPaymentData(data.data.data)
        setLoadingPage(false)
    }

    const getPartnerInfor = async (id) => {
        const data = await axios.get(`/api/doitacs/${id}`)
        dispatch(storeSetPartner(data.data))
    }

    const addNewPaymentRecord = async (id, record) => {
        setUpdateRecord(true)
        await axios.post(`/api/thanhtoans`, record)
        setPaymentRecord({
            amount: "0",
            currency: "VNĐ",
            employee: user,
            id_payer: id,
            note: "",
            payment_type: 1,
            paymentDate: "",
            type: 1,
        })
        getPartnerInfor(id)
        setUpdateRecord(false)
    }

    useEffect(() => {
        getUser()
        getPaymentData(id, dateback)
    }, [partner])

    return (
        <PageWrapper>
            {loadingPage && <LoadingScreen message={`Đang tải dữ liệu`} />}
            {updateRecord && <LoadingScreen message={`Đang cập nhật dữ liệu`} />}
            <TitleBarWrapper>
                <Modal title={`Cập nhật thu chi: ${partner.name}`} open={paymentModal}
                    onOk={() => {
                        if (paymentRecord.payment_type === 2) {
                            addNewPaymentRecord(id, {
                                ...paymentRecord,
                                employee: user,
                                amount: `-${paymentRecord.amount}`
                            })
                        } else {
                            addNewPaymentRecord(id, {
                                ...paymentRecord,
                                employee: user,
                                amount: `${paymentRecord.amount}`
                            })
                        }
                        setPaymentModal(false)
                    }}
                    onCancel={() => {
                        setPaymentModal(false)
                        setPaymentRecord({
                            amount: "0",
                            currency: "VNĐ",
                            employee: user,
                            id_payer: id,
                            note: "",
                            payment_type: 1,
                            paymentDate: "",
                            type: 1,
                        })
                    }}>
                    <PaymentModalColumn>
                        <div>Loại hình</div>
                        <select
                            onChange={(e) => {
                                setPaymentRecord({
                                    ...paymentRecord,
                                    payment_type: +e.target.value,
                                })
                            }}
                            style={{
                                border: "0",
                                padding: "5px"
                            }} >
                            <option value="1">Trả phí</option>
                            <option value="2">Thu phí</option>
                        </select>
                    </PaymentModalColumn>
                    <PaymentModalColumn>
                        <div>Tên nhân viên</div>
                        <h6>{user}</h6>
                    </PaymentModalColumn>
                    <PaymentModalColumn>
                        <div>Ngày thanh toán</div>
                        <DatePicker
                            placeholder='DD/MM/YYYY'
                            format={dateFormat}
                            onChange={(e) => {
                                setPaymentRecord({
                                    ...paymentRecord,
                                    paymentDate: dayjs(e).format(dateFormat)
                                })
                            }}
                        />
                    </PaymentModalColumn>
                    <PaymentModalColumn>
                        <div>Tiền thanh toán</div>
                        <Input
                            value={paymentRecord.amount}
                            onChange={(e) => {
                                if (REGEX_NUMBER.test(e.target.value)) {
                                    setPaymentRecord({
                                        ...paymentRecord,
                                        amount: e.target.value
                                    })
                                }
                            }}
                        />
                    </PaymentModalColumn>
                    <PaymentModalColumn>
                        <div>Ghi chú</div>
                        <TextArea onChange={(e) => {
                            setPaymentRecord({
                                ...paymentRecord,
                                note: e.target.value
                            })
                        }} />
                    </PaymentModalColumn>
                </Modal>

                <BlueButton name="Thanh toán" setOpenModal={setPaymentModal} />

                <RangePicker defaultValue={
                    [dayjs(), dayjs()]
                } onChange={(e) => {
                    setDateback(e)
                }} />
            </TitleBarWrapper>
            <PartnerPaymentTable paymentData={paymentData} />
        </PageWrapper >
    )
}

export default PartnerPayment
