import { LinkStyle, TableHead, TableStyle, TableWrapper } from '../tableStyle'

const CustomersTable = ({ customersData }: any) => {
    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Số ĐT</TableHead>
                        <TableHead>Dư nợ(VNĐ)</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {customersData.map((customer: any) => {
                        return (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td><LinkStyle to={`/customers/${customer.id}/items`}>{customer.name}</LinkStyle></td>
                                <td>{customer.mobile}</td>
                                <td><span>
                                    {customer.debt}
                                </span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper >
    )
}

export default CustomersTable
