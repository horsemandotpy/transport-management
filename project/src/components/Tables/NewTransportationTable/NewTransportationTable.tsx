import React from 'react'
import { TableStyle, TableWrapper } from '../tableStyle'
import { storeSetGoodsWareHouse } from '../../../store/filter-reducer'
import Partners from '../../../pages/Partners/Partners'
import { ColumnHeightOutlined } from '@ant-design/icons'

const NewTransportationTable = ({ filteredGoods, transportRoute }) => {
    const countNumber = transportRoute.map(goods => goods.count)
    const maxTitle = Math.max(...countNumber)
    const arr = []
    for (let i = 1; i <= maxTitle; i++) {
        arr.push(`Tiến trình ${i}`)
    }

    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Khách hàng</th>
                        <th>Kho</th>
                        <th>Hàng hóa</th>
                        <th>KG</th>
                        {arr.map(item => {
                            return (
                                <td>{item}</td>
                            )
                        })}

                    </tr>
                </thead>
                <tbody>
                    {filteredGoods.map((goods, index) => {
                        return (
                            <tr key={goods.id}>
                                <td>{index + 1}</td>
                                <td>{goods.customer.name}</td>
                                <td>{goods.warehouse.name}</td>
                                <td>{goods.name}</td>
                                <td>{goods.weight}</td>
                                {transportRoute.filter(object => {
                                    return object.data[0].item_id === goods.id
                                }).map(goods => {
                                    return goods.data.map(data => {
                                        return (
                                            <td>{data.partner.fullName}</td>
                                        )
                                    })
                                })}

                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default NewTransportationTable
