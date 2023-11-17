import dayjs from 'dayjs'
import { MaxContentContainer, ProcessTH, ProcessWrapper, TableStyle, TableWrapper, Tabody, ThCenter } from '../tableStyle'
import { CalendarTagsWrapper, CalendarWrapper } from './newTransportationTableStyle'

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
                        <ThCenter>STT</ThCenter>
                        <ThCenter>Khách hàng</ThCenter>
                        <ThCenter>Kho</ThCenter>
                        <ThCenter>Hàng hóa</ThCenter>
                        <ThCenter>KG</ThCenter>
                        {arr.map(item => {
                            return (
                                <ProcessTH>{item}</ProcessTH>
                            )
                        })}

                    </tr>
                </thead>
                <Tabody>
                    {filteredGoods.map((goods, index) => {
                        return (
                            <tr key={goods.id}>
                                <td>{index + 1}</td>
                                <td><MaxContentContainer>{goods.customer.name}</MaxContentContainer></td>
                                <td><MaxContentContainer>{goods.warehouse.name}</MaxContentContainer></td>
                                <td><MaxContentContainer>{goods.name}</MaxContentContainer></td>
                                <td>{goods.weight}</td>
                                {transportRoute.filter(object => {
                                    return object.data[0].item_id === goods.id
                                }).map(goods => {
                                    return goods.data.map(data => {
                                        console.log(data)
                                        return (
                                            <td>
                                                <MaxContentContainer>
                                                    {data.partner.fullName}
                                                </MaxContentContainer>
                                                <MaxContentContainer>
                                                    <CalendarWrapper>
                                                        <CalendarTagsWrapper>
                                                            <i className="fa-regular fa-calendar-check"></i>
                                                            <span>{dayjs(data.fromDate).format("YYYY-MM-DD")}</span>
                                                        </CalendarTagsWrapper>
                                                    </CalendarWrapper>
                                                </MaxContentContainer>
                                            </td>
                                        )
                                    })
                                })}

                            </tr>
                        )
                    })}
                </Tabody>
            </TableStyle>
        </TableWrapper>
    )
}

export default NewTransportationTable
