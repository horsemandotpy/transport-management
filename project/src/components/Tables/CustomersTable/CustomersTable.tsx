import React from 'react'
import { TableHead, TableStyle, TableWrapper } from '../tableStyle'
import { Link } from 'react-router-dom'

const CustomersTable = ({ customersData }) => {
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
                    {customersData.map(customer => {
                        return (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td><Link to={`/customers/${customer.id}/items`}>{customer.name}</Link></td>
                                <td>{customer.mobile}</td>
                                <td>{customer.debt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default CustomersTable
