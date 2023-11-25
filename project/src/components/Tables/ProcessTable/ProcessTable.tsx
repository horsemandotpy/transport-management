import { ThCenter, TableStyle, TableWrapper, LinkStyle } from '../tableStyle'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DatePicker, Input, Modal } from 'antd'
import { CostDisplayBlock, InforLabelWrapper, ModalColumn, OptionInfoWrapper, PayingMethodButton, PayingMethodGrid } from '../../../pages/GoodsItem/goodsItemStyle'
import { SelectOption } from '../CreateItemsTable/createItemTableStyle'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'

const ProcessTable = ({ filteredProcess, currentPage, filteredTagsOptions, getProcessByOption }) => {
    const numberpage = useSelector(state => state.filter.numberpage)
    const [editProcessModal, setEditProcessModal] = useState(false)
    const [editProcess, setEditProcess] = useState()
    const [selectedTags, setSelectedTags] = useState()

    const postEditProcess = async () => {
        await axios.post(`/api/vanchuyens/${editProcess.id}`, editProcess)
        await getProcessByOption()
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

    const REGEX_NUMBER = new RegExp(/^[0-9]*\.?[0-9]*$/)


    return (
        <TableWrapper>
            {editProcess && <Modal onOk={() => {
                postEditProcess()
                setEditProcessModal(false)
                setSelectedTags([])
            }} title="Sửa tiến trình" open={editProcessModal}
                onCancel={() => {
                    setEditProcessModal(false)
                    setSelectedTags([])
                }} width={600}>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Tên tiến trình</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <Input style={{
                            width: '100%',
                        }} onChange={(e) => {
                            setEditProcess({
                                ...editProcess,
                                nameProcess: e.target.value
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Đối tác</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <span>{editProcess.partner.name}</span>
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
                                setEditProcess({
                                    ...editProcess,
                                    selectedTags: e,
                                })
                            }}
                            options={filteredTagsOptions.map((item) => ({
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
                            <PayingMethodButton green={editProcess.payType === "1"} value="1" onClick={() => {
                                setEditProcess({
                                    ...editProcess,
                                    payType: "1",
                                    price: +editProcess.item.weight * +editProcess.partner.pricePerKg,
                                    pricePer: +editProcess.partner.pricePerKg
                                })

                            }}>
                                Cân nặng
                            </PayingMethodButton>
                            <PayingMethodButton green={editProcess.payType === "2"} value="2" onClick={() => {
                                setEditProcess({
                                    ...editProcess,
                                    payType: "2",
                                    price: +editProcess.item.numPkg * +editProcess.partner.pricePerPackage,
                                    pricePer: +editProcess.partner.pricePerPackage
                                })
                            }}>
                                Kiện
                            </PayingMethodButton>
                            <PayingMethodButton green={editProcess.payType === "3"} value="3" onClick={() => {
                                setEditProcess({
                                    ...editProcess,
                                    payType: "3",
                                    price: +editProcess.item.numBigPkg * +editProcess.partner.pricePerBigPackage,
                                    pricePer: +editProcess.partner.pricePerBigPackage
                                })

                            }}>
                                Kiện lớn
                            </PayingMethodButton>
                            <PayingMethodButton green={editProcess.payType === "4"} value="4" onClick={() => {
                                setEditProcess({
                                    ...editProcess,
                                    payType: "4",
                                    price: +editProcess.item.value * +editProcess.partner.pricePerPercent,
                                    pricePer: +editProcess.partner.pricePerPercent
                                })
                            }}>
                                Phần trăm
                            </PayingMethodButton>
                            <PayingMethodButton green={editProcess.payType === "5"} value="5" onClick={() => {
                                setEditProcess({
                                    ...editProcess,
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
                            <Input value={editProcess.pricePer} onChange={(e) => {
                                if (REGEX_NUMBER.test(e.target.value)) {
                                    setEditProcess({
                                        ...editProcess,
                                        pricePer: +e.target.value,
                                        price: +getPrice(e.target.value,
                                            editProcess.item.weight,
                                            editProcess.item.numPkg,
                                            editProcess.item.numBigPkg,
                                            editProcess.item.value,
                                            editProcess.payType,
                                            editProcess.price
                                        )
                                    })
                                }
                            }} />
                            <CostDisplayBlock>={editProcess.price}</CostDisplayBlock>
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
                        }} defaultValue={dayjs(editProcess.fromDate)} onChange={(e) => {
                            const date = dayjs(e).format("YYYY-MM-DD");
                            setEditProcess({
                                ...editProcess,
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
                        }} defaultValue={editProcess.deliveryDate !== null && dayjs(editProcess.deliveryDate) || dayjs()} onChange={(e) => {
                            const date = dayjs(e).format("YYYY-MM-DD");
                            setEditProcess({
                                ...editProcess,
                                deliveryDate: date,
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Ghi chú</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <TextArea onChange={(e) => {
                            setEditProcess({
                                ...editProcess,
                                note: e.target.value
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>
            </Modal>}

            <TableStyle>
                <thead>
                    <tr>
                        <ThCenter>STT</ThCenter>
                        <ThCenter>Khách hàng</ThCenter>
                        <ThCenter>Đối tác</ThCenter>
                        <ThCenter>Tag</ThCenter>
                        <ThCenter>Hàng hóa</ThCenter>
                        <ThCenter>Kho</ThCenter>
                        <ThCenter>KG</ThCenter>
                        <ThCenter>Ngày nhận</ThCenter>
                        <ThCenter>Ngày phát</ThCenter>
                    </tr>
                </thead>
                <tbody>
                    {filteredProcess?.map((process, index) => {
                        return (
                            <tr key={process.id}>
                                <td>{+numberpage * (currentPage - 1) + index + 1}</td>
                                <td><LinkStyle to={`/customers/${process.item.customer.id}`}>{process.item.customer.name}</LinkStyle></td>
                                <td><LinkStyle to={`/partners/${process.partner.id}`}>{process.partner.name}</LinkStyle></td>
                                <td>{process.tags.map(tag => tag.name).join()}</td>
                                <td><LinkStyle to={`/goods/${process.item.id}`}>{process.item.name}</LinkStyle></td>
                                <td><LinkStyle to={`/warehouses/${process.item.warehouse.id}`}>{process.item.warehouse.name}</LinkStyle></td>
                                <td>{process.item.weight}</td>
                                <td>{dayjs(process.fromDate).format("DD/MM/YYYY")}</td>
                                <td>{process.deliveryDate ? dayjs(process.deliveryDate).format("DD/MM/YYYY") : ""}</td>
                                <td>
                                    {process.status === 1 || process.status === 0 &&
                                        <i
                                            style={{ color: "blue", cursor: "pointer", fontSize: "1.2rem" }}
                                            onClick={() => {
                                                setSelectedTags(process.tags.map(tag => tag.name))
                                                setEditProcess(process)
                                                setEditProcessModal(true)
                                            }} className="fa-regular fa-pen-to-square"
                                        ></i>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default ProcessTable
