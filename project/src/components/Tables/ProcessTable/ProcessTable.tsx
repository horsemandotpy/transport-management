import { TableHead, TableStyle, TableWrapper } from '../tableStyle'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const ProcessTable = ({ filteredProcess, currentPage }) => {
    const numberpage = useSelector(state => state.filter.numberpage)

    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Đối tác</TableHead>
                        <TableHead>Tag</TableHead>
                        <TableHead>Hàng hóa</TableHead>
                        <TableHead>Kho</TableHead>
                        <TableHead>KG</TableHead>
                        <TableHead>Ngày nhận</TableHead>
                        <TableHead>Ngày phát</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {filteredProcess?.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{+numberpage * (currentPage - 1) + index + 1}</td>
                                <td>{item.item.customer.name}</td>
                                <td>{item.partner.name}</td>
                                <td>{item.tags.map(tag => tag.slug).join()}</td>
                                <td>{item.item.name}</td>
                                <td>{item.item.warehouse.name}</td>
                                <td>{item.item.weight}</td>
                                <td>{dayjs(item.fromDate).format("DD/MM/YYYY")}</td>
                                <td>{item.deliveryDate ? dayjs(item.deliveryDate).format("DD/MM/YYYY") : ""}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default ProcessTable
