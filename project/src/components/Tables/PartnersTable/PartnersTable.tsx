import { TableHead, TableStyle, TableWrapper } from "../tableStyle"

const PartnersTable = ({ partnerData }) => {
    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Số ĐT</TableHead>
                        <TableHead>Phương tiện</TableHead>
                        <TableHead>KG(VNĐ)</TableHead>
                        <TableHead>Kiện(VNĐ)</TableHead>
                        <TableHead>Kiện lớn(VNĐ)</TableHead>
                        <TableHead>Vận chuyển từ - đến</TableHead>
                        <TableHead>Dư nợ(VNĐ)</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {partnerData.map(partner => {
                        return (
                            <tr key={partner.id}>
                                <td>{partner.id}</td>
                                <td>{partner.name}</td>
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
