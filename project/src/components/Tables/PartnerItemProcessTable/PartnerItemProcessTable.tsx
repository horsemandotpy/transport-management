import dayjs from 'dayjs'
import { TableStyle, TableWrapper } from '../tableStyle'
import { useState } from 'react'
import { DatePicker, Modal } from 'antd'
import { CostDisplayBlock, InforLabelWrapper, ModalColumn, OptionInfoWrapper, PayingMethodButton, PayingMethodGrid } from '../../../pages/GoodsItem/goodsItemStyle'
import Input from 'antd/es/input/Input'
import { SelectOption } from '../CreateItemsTable/createItemTableStyle'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { ChangeStatusOption, ChangeStatusTd, ChangeStatusWrapper } from './partnerItemProcessTableStyle'

const PartnerItemProcessTable = ({ filteredProcess, tags, getProcessByOption }) => {


    const [goods, setGoods] = useState()
    const [changeStatus, setChangeStatus] = useState()
    const [completeProcessModal, setCompleteProcessModal] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])

    const [completeProcess, setCompleteProcess] = useState()

    const TAG_OPTIONS = tags.map(tag => tag)

    const filteredTags = TAG_OPTIONS.filter(tag => !selectedTags.includes(tag.name))

    const REGEX_NUMBER = new RegExp(/^[0-9]*\.?[0-9]*$/)

    const changeProcessStatus = async (process) => {
        if (process.status === 0) {
            await axios.post(`/api/vanchuyens/${process.id}`, {
                ...process,
                bgColor: "#add3e2",
                deliveryDate: dayjs().format("YYYY-MM-DD"),
                status: 1,
            })
        }
        getProcessByOption()
    }

    const sendCompleteProcess = async (process) => {
        await axios.post(`/api/vanchuyens/${process.id}`, {
            ...process,
            status: 2
        })
        getProcessByOption()
    }

    const getStatus = (num) => {
        if (num === 1) {
            return "Đang vận chuyển"
        }
        if (num === 0) {
            return "Đang chờ"
        }
        if (num === -3) {
            return "Hủy"
        }
        if (num === 2) {
            return "Hoàn thành"
        }
        return "Không xác định"
    }

    const getPrice = (
        price_unit,
        pricePerKg,
        numPackage,
        numBigPackage,
        numValue,
        payType,
        defaultPrice) => {

        if (payType === "1") {
            return `${+price_unit * +pricePerKg}`
        }

        if (payType === "2") {
            return `${+price_unit * +numPackage}`
        }

        if (payType === "3") {
            return `${+price_unit * +numBigPackage}`
        }

        if (payType === "4") {
            return `${+price_unit / 100 * +numValue}`
        }

        if (payType === "5") {
            return `${+price_unit}`
        }

        return `${defaultPrice}`
    }

    return (
        <TableWrapper>

            {completeProcess && <Modal onOk={() => {
                sendCompleteProcess(completeProcess)
                setCompleteProcessModal(false)
            }} title="Hoàn thành tiến trình" open={completeProcessModal}
                onCancel={() => { setCompleteProcessModal(false) }} width={600}>
                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Đối tác</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <span>{completeProcess.partner.name}</span>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Tag</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <SelectOption
                            mode="multiple"
                            style={{
                                width: '100%',
                            }}
                            placeholder="Search By Tags"
                            value={selectedTags}
                            onChange={(e) => {
                                setSelectedTags(e)
                            }}
                            options={filteredTags.map((item) => ({
                                key: item.id,
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Cách trả phí:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <PayingMethodGrid>
                            <PayingMethodButton green={completeProcess.payType === "1"} value="1" onClick={() => {
                                setCompleteProcess({
                                    ...completeProcess,
                                    payType: "1",
                                    price: +goods.weight * +completeProcess.partner.pricePerKg,
                                    pricePer: +completeProcess.partner.pricePerKg
                                })

                            }}>
                                Cân nặng
                            </PayingMethodButton>
                            <PayingMethodButton green={completeProcess.payType === "2"} value="2" onClick={() => {
                                setCompleteProcess({
                                    ...completeProcess,
                                    payType: "2",
                                    price: +goods.numPkg * +completeProcess.partner.pricePerPackage,
                                    pricePer: +completeProcess.partner.pricePerPackage
                                })
                            }}>
                                Kiện
                            </PayingMethodButton>
                            <PayingMethodButton green={completeProcess.payType === "3"} value="3" onClick={() => {
                                setCompleteProcess({
                                    ...completeProcess,
                                    payType: "3",
                                    price: +goods.numBigPkg * +completeProcess.partner.pricePerBigPackage,
                                    pricePer: +completeProcess.partner.pricePerBigPackage
                                })

                            }}>
                                Kiện lớn
                            </PayingMethodButton>
                            <PayingMethodButton green={completeProcess.payType === "4"} value="4" onClick={() => {
                                setCompleteProcess({
                                    ...completeProcess,
                                    payType: "4",
                                    price: +goods.value * +completeProcess.partner.pricePerPercent,
                                    pricePer: +completeProcess.partner.pricePerPercent
                                })
                            }}>
                                Phần trăm
                            </PayingMethodButton>
                            <PayingMethodButton green={completeProcess.payType === "5"} value="5" onClick={() => {
                                setCompleteProcess({
                                    ...completeProcess,
                                    payType: "5",
                                    price: 0,
                                    pricePer: 0
                                })
                            }} >
                                Tự nhập
                            </PayingMethodButton>
                        </PayingMethodGrid>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Chi phí:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <ModalColumn>
                            <Input value={completeProcess.pricePer} onChange={(e) => {
                                if (REGEX_NUMBER.test(e.target.value)) {
                                    setCompleteProcess({
                                        ...completeProcess,
                                        pricePer: +e.target.value,
                                        price: +getPrice(e.target.value,
                                            goods.weight,
                                            goods.numPkg,
                                            goods.numBigPkg,
                                            goods.value,
                                            completeProcess.payType,
                                            completeProcess.price
                                        )
                                    })
                                }
                            }} />
                            <CostDisplayBlock>={completeProcess.price}</CostDisplayBlock>
                        </ModalColumn>
                    </OptionInfoWrapper>
                </ModalColumn>


                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Ngày nhận</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <DatePicker style={{
                            width: '45%',
                        }} defaultValue={dayjs(completeProcess.fromDate)} onChange={(e) => {
                            const date = dayjs(e).format("YYYY-MM-DD");
                            setCompleteProcess({
                                ...completeProcess,
                                fromDate: date,
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>


                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Ngày phát hàng</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <DatePicker style={{
                            width: '45%',
                        }} defaultValue={dayjs(completeProcess.deliveryDate)} onChange={(e) => {
                            const date = dayjs(e).format("YYYY-MM-DD");
                            setCompleteProcess({
                                ...completeProcess,
                                deliveryDate: date,
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Ngày giao hàng</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <DatePicker style={{
                            width: '45%',
                        }} defaultValue={dayjs()} onChange={(e) => {
                            const date = dayjs(e).format("YYYY-MM-DD");
                            setCompleteProcess({
                                ...completeProcess,
                                finishDate: date,
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Tiền thu hộ</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <Input style={{
                            width: '40%',
                        }} value={completeProcess.collect_money}
                            onChange={(e) => {
                                if (REGEX_NUMBER.test(e.target.value)) {
                                    setCompleteProcess({
                                        ...completeProcess,
                                        collect_money: e.target.value
                                    })
                                }
                            }} />
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Ghi chú</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <TextArea onChange={(e) => {
                            setCompleteProcess({
                                ...completeProcess,
                                note: e.target.value
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>

            </Modal>}

            <TableStyle>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Khách hàng</th>
                        <th>Tag</th>
                        <th>Hàng hóa</th>
                        <th>Kho</th>
                        <th>Kg</th>
                        <th>Số điện thoại</th>
                        <th>Ngày nhận</th>
                        <th>Ngày phát</th>
                        <th>Ngày giao</th>
                        <th>Trạng thái</th>
                        <th>Tỉ giá</th>
                        <th>Trả đối tác (VNĐ)</th>
                        <th>Thu hộ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProcess.map((process, i) => {
                        return (
                            <tr key={process.id}>
                                <td>{i + 1}</td>
                                <td>{process.item.customer.name}</td>
                                <td>{process.tags.map(tag => tag.name).join()}</td>
                                <td>{process.item.name}</td>
                                <td>{process.item.warehouse.name}</td>
                                <td>{process.item.weight}</td>
                                <td>{process.partner.phone}</td>
                                <td>{process.fromDate && dayjs(process.fromDate).format("DD-MM-YYYY")}</td>
                                <td>{process.deliveryDate && dayjs(process.deliveryDate).format("DD-MM-YYYY")}</td>
                                <td>{process.finishDate && dayjs(process.finishDate).format("DD-MM-YYYY")}</td>
                                <ChangeStatusTd onClick={() => {
                                    setChangeStatus(prev => {
                                        if (prev !== i) {
                                            return i
                                        }
                                        return ""
                                    })
                                }}>{getStatus(process.status)}
                                    {getStatus(process.status) !== "Hủy" &&
                                        getStatus(process.status) !== "Không xác định" &&
                                        <ChangeStatusWrapper changeStatus={changeStatus === i}>
                                            {getStatus(process.status) !== "Hoàn thành" &&
                                                <ChangeStatusOption>
                                                    {getStatus(process.status) === "Đang chờ" && <span onClick={() => {
                                                        changeProcessStatus(process)
                                                    }}>Đang vận chuyển</span>}
                                                    {getStatus(process.status) === "Đang vận chuyển" && <span onClick={() => {
                                                        setGoods(process.item)
                                                        setCompleteProcess({
                                                            ...process,
                                                            finishDate: dayjs().format("YYYY-MM-DD")
                                                        })
                                                        console.log(process)
                                                        setSelectedTags(process.tags.map(tag => tag.name))
                                                        setCompleteProcessModal(true)
                                                    }}>Hoàn thành</span>}
                                                </ChangeStatusOption>}
                                            {getStatus(process.status) !== "Hủy"
                                                && getStatus(process.status) !== "Không xác định"
                                                && <ChangeStatusOption>
                                                    Hủy
                                                </ChangeStatusOption>}
                                        </ChangeStatusWrapper>}
                                </ChangeStatusTd>
                                <td>{process.pricePer}</td>
                                <td>{process.price}</td>
                                <td>{process.collect_money}</td>

                            </tr>

                        )
                    })}
                </tbody>
            </TableStyle>

        </TableWrapper>
    )
}

export default PartnerItemProcessTable
