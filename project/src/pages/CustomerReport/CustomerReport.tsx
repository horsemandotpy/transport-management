import React, { useEffect, useState } from 'react'
import { PageWrapper, TitleBarWrapper } from '../../style/style'
import { useParams } from 'react-router-dom'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import axios from 'axios';
import CustomerReportTable from '../../components/Tables/CustomerReportTable/CustomerReportTable';
const { RangePicker } = DatePicker;


const CustomerReport = () => {
    const { id } = useParams()
    const [dateback, setDateback] = useState({
        from: dayjs().startOf("M").format("YYYY-MM-DD"),
        to: dayjs().format("YYYY-MM-DD")
    })
    const [report, setReport] = useState([])

    const getReport = async () => {
        const data = await axios.get(`/api/preview?table=customer&id=${id}&from=${dateback.from}&to=${dateback.to}`)
        setReport(data.data.data)
    }

    useEffect(() => {
        getReport()
    }, [])

    useEffect(() => {
        getReport()
    }, [dateback])

    return (
        <PageWrapper>
            <TitleBarWrapper
                style={{
                    justifyContent: "flex-end"
                }}
            >
                <RangePicker
                    defaultValue={
                        [dayjs().startOf("M"), dayjs()]
                    } onChange={(e) => {
                        setDateback({
                            from: dayjs(e[0]).format("YYYY-MM-DD"),
                            to: dayjs(e[1]).format("YYYY-MM-DD")
                        })
                    }} />
            </TitleBarWrapper>
            <CustomerReportTable report={report} />
        </PageWrapper>
    )
}

export default CustomerReport
