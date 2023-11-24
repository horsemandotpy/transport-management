import { TableStyle, TableWrapper } from '../tableStyle'
import { TableSmallHead } from '../CustomerDebtTable/customerDebtTableStyle'
import dayjs from 'dayjs'

const WarehouseDebtTable = ({ record }) => {
    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableSmallHead>STT</TableSmallHead>
                        <TableSmallHead>Tên khách hàng</TableSmallHead>
                        <TableSmallHead>Nhân viên nhập</TableSmallHead>
                        <TableSmallHead>Ngày ghi nợ</TableSmallHead>
                        <TableSmallHead>Tổng tiền</TableSmallHead>
                        <TableSmallHead>Đã thanh toán</TableSmallHead>
                        <TableSmallHead>Còn lại</TableSmallHead>
                    </tr>
                </thead>
                <tbody>

                    {record && record.map((item, i) => {
                        return (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.customer.name}</td>
                                <td>{item.employee}</td>
                                <td>{dayjs(item.fromDate).format("DD-MM-YYYY")}</td>
                                <td>{item.amount} NDT</td>
                                <td>{item.prePay} NDT</td>
                                <td>{item.amount - item.prePay} NDT</td>
                            </tr>
                        )
                    })}

                </tbody>

            </TableStyle>
        </TableWrapper>
    )
}

export default WarehouseDebtTable
