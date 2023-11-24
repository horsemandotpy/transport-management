import dayjs from 'dayjs'
import { TableStyle, TableWrapper } from '../tableStyle'
import { TableSmallHead } from './customerDebtTableStyle'
import { useEffect, useState } from 'react'

const CustomerDebtTable = ({ record, status }) => {

    const [debt, setDebt] = useState()

    const getStatusLabel = (num: string) => {
        if (num === "1") {
            return "đã thanh toán"
        }
        if (num === "-1") {
            return "chưa thanh toán"
        }
    }

    const getDebt = (record) => {
        const debt = record.filter(item => item.pay_value === null).map(item => item.amount).join()
        setDebt(debt)
    }

    useEffect(() => {
        getDebt(record)
    }, [record])

    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableSmallHead>Khách hàng</TableSmallHead>
                        <TableSmallHead>Chủ kho</TableSmallHead>
                        <TableSmallHead>Thời gian ghi nợ</TableSmallHead>
                        <TableSmallHead>NDT</TableSmallHead>
                        <TableSmallHead>Tỉ giá</TableSmallHead>
                        <TableSmallHead>Trạng thái</TableSmallHead>
                        <TableSmallHead>Tỉ giá thanh toán</TableSmallHead>
                        <TableSmallHead>VND</TableSmallHead>
                        <TableSmallHead>Ngày thanh toán</TableSmallHead>
                    </tr>
                </thead>
                {record && <tbody>
                    {record.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.customerName}</td>
                                <td>{item.warehouseName}</td>
                                <td>{dayjs(item.created_time).format("DD-MM-YYYY")}</td>
                                <td>{item.amount}</td>
                                <td>{item.value}</td>
                                <td>{getStatusLabel(item.status)}</td>
                                <td>{item.pay_value}</td>
                                <td>{item.pay_value * item.amount} VND</td>
                                <td>{item.pay_date && dayjs(item.pay_date).format("DD-MM-YYYY")}</td>
                            </tr>
                        )
                    })}
                    {!status &&
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>chưa thanh toán </td>
                            <td>{debt} NDT</td>
                        </tr>}
                </tbody>}
            </TableStyle>
        </TableWrapper>
    )
}

export default CustomerDebtTable
