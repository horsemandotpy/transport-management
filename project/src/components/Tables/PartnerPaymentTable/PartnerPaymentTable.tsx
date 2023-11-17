import dayjs from 'dayjs'
import { TableData, TableHead, TableStyle, TableWrapper } from '../tableStyle'
import { ItemNameStyle } from './partnerPaymentTableStyle'
import { Link } from 'react-router-dom'

const PartnerPaymentTable = ({ paymentData }) => {
    const REGEX_ITEM_ID = /id:\s*\(item#\d+\)/

    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Ngày thanh toán hàng</TableHead>
                        <TableHead>Nhân viên nhập</TableHead>
                        <TableHead>Số tiền (VNĐ)</TableHead>
                        <TableHead>Ghi chú</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {paymentData.map((record, i) => {
                        let itemObj;
                        let itemId
                        let itemName;
                        let sliceNameNum;
                        let matchNameNum;

                        if (record.note.match(REGEX_ITEM_ID)) {
                            itemId = record.note.match(/\d+/)
                            matchNameNum = record.note.match(REGEX_ITEM_ID)[0].length
                            sliceNameNum = record.note.search(REGEX_ITEM_ID)

                            if (record.items[itemId[0]]) {
                                itemObj = record.items[itemId[0]]
                                itemName = `${itemObj.name}`
                            }

                        }

                        return (
                            <tr key={i}>
                                <TableData>{i + 1}</TableData>
                                <TableData>{record.paymentDate && dayjs(record.paymentDate).format("DD-MM-YYYY")}</TableData>
                                <TableData>{record.employee}</TableData>
                                <TableData>{record.amount}</TableData>
                                <TableData>
                                    {record.note.slice(0, sliceNameNum)}
                                    <ItemNameStyle>
                                        <Link to={`/goods/${itemId}}`}>{itemName}</Link>
                                    </ItemNameStyle>
                                    {record.note.slice(matchNameNum + sliceNameNum)}
                                </TableData>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>

        </TableWrapper>
    )
}

export default PartnerPaymentTable
