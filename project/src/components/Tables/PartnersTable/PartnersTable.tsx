import { Link } from "react-router-dom"
import { TableHead, TableStyle, TableWrapper, ThCenter } from "../tableStyle"

const PartnersTable = ({ partnerData }) => {
    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <ThCenter>STT</ThCenter>
                        <ThCenter>Họ tên</ThCenter>
                        <ThCenter>Số ĐT</ThCenter>
                        <ThCenter>Phương tiện</ThCenter>
                        <ThCenter>KG(VNĐ)</ThCenter>
                        <ThCenter>Kiện(VNĐ)</ThCenter>
                        <ThCenter>Kiện lớn(VNĐ)</ThCenter>
                        <ThCenter>Vận chuyển từ - đến</ThCenter>
                        <ThCenter>Dư nợ(VNĐ)</ThCenter>
                    </tr>
                </thead>
                <tbody>
                    {partnerData.map(partner => {
                        return (
                            <tr key={partner.id}>
                                <td>{partner.id}</td>
                                <td>
                                    <Link to={`/partners/${partner.id}/progress`}>
                                        {partner.name}
                                    </Link>
                                </td>
                                <td>{partner.phone}</td>
                                <td>{partner.vehicle}</td>
                                <td>{partner.pricePerKg}</td>
                                <td>{partner.pricePerPackage}</td>
                                <td>{partner.pricePerBigPackage}</td>
                                <td>{partner.transferFrom}-{partner.transferTo}</td>
                                <td>{partner.debt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default PartnersTable
