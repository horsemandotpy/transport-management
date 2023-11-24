import { TableHead, TableStyle, TableWrapper } from '../tableStyle'

const CustomerReportTable = ({ report }) => {
    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Số kiện</TableHead>
                        <TableHead>Số cân</TableHead>
                        <TableHead>Tỉ giá</TableHead>
                        <TableHead>Thành tiền</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {report.map((item, i) => {
                        return (
                            <tr key={item.i}>
                                <td>{item.created_date}</td>
                                <td>{item.customer_name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.weight}</td>
                                <td>{item.price_unit}</td>
                                <td>{item.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default CustomerReportTable
