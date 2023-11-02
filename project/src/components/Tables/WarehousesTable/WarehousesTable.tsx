import React from 'react'
import { TableHead, TableStyle, TableWrapper } from '../tableStyle'


const WarehousesTable = ({ warehousesData }) => {
    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Chủ kho</TableHead>
                        <TableHead>Số ĐT</TableHead>
                        <TableHead>Dư nợ(VNĐ)</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {warehousesData.map(warehouse => {
                        return (
                            <tr key={warehouse.id}>
                                <td>{warehouse.id}</td>
                                <td>{warehouse.name}</td>
                                <td>{warehouse.phone}</td>
                                <td>{warehouse.debt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default WarehousesTable
