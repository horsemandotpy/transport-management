import dayjs from 'dayjs'
import { TableStyle, TableWrapper } from '../tableStyle'
import { Link, useParams } from 'react-router-dom'
import { ChangeStatusOption, ChangeStatusTd, ChangeStatusWrapper, ProcessChangeWrapper } from './goodItemTableStyle'
import { useState } from 'react'
import { DatePicker, Modal } from 'antd'
import { CostDisplayBlock, InforLabelWrapper, ModalColumn, OptionInfoWrapper, PayingMethodButton, PayingMethodGrid } from '../../../pages/GoodsItem/goodsItemStyle'
import Input from 'antd/es/input/Input'
import { SelectOption } from '../CreateItemsTable/createItemTableStyle'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'

const GoodItemTable = ({ processes, goods, getPrice, REGEX_NUMBER, tagsData, getProcessInfo }) => {

    const [changeStatus, setChangeStatus] = useState()
    const [completeProcessModal, setCompleteProcessModal] = useState(false)
    const [editProcessModal, setEditProcessModal] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])

    const [completeProcess, setCompleteProcess] = useState()

    const TAG_OPTIONS = tagsData.map(tag => tag)

    const filteredTags = TAG_OPTIONS.filter(tag => !selectedTags.includes(tag.name))

    const changeProcessStatus = async (process) => {
        if (process.status === 0) {
            await axios.post(`/api/vanchuyens/${process.id}`, {
                ...process,
                bgColor: "#add3e2",
                deliveryDate: dayjs().format("YYYY-MM-DD"),
                status: 1,
            })
        }
        getProcessInfo()
    }

    const sendCompleteProcess = async (process) => {
        await axios.post(`/api/vanchuyens/${process.id}`, {
            ...process,
            status: 2
        })
        getProcessInfo()
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
    }

    return (
        <TableWrapper>

            {completeProcess && <Modal onOk={() => { setEditProcessModal(false) }} title="Sửa tiến trình" open={editProcessModal}
                onCancel={() => { setEditProcessModal(false) }} width={600}>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Tên tiến trình</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <Input style={{
                            width: '100%',
                        }} onChange={(e) => {
                            setCompleteProcess({
                                ...completeProcess,
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
                        }} defaultValue={completeProcess.deliveryDate !== null && dayjs(completeProcess.deliveryDate) || dayjs()} onChange={(e) => {
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
                        }} onChange={(e) => {
                            setCompleteProcess({
                                ...completeProcess,
                                collect_money: e.target.value
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
                        <th>Đối tác</th>
                        <th>Tag</th>
                        <th>Hàng hóa</th>
                        <th>Kho</th>
                        <th>Kg</th>
                        <th>Số điện thoại</th>
                        <th>Vận chuyển từ</th>
                        <th>Vận chuyển đến</th>
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
                    {processes.map((process, i) => {
                        return (
                            <tr key={process.id}>
                                <td>{i + 1}</td>
                                <td><Link to={`/partners/${process.partner.id}/progress`}>{process.partner.name}</Link></td>
                                <td></td>
                                <td>{process.item.name}</td>
                                <td>{process.item.warehouse.name}</td>
                                <td>{process.item.weight}</td>
                                <td>{process.partner.phone}</td>
                                <td>{process.partner.transferFrom}</td>
                                <td>{process.partner.transferTo}</td>
                                <td>{process.fromDate && dayjs(process.fromDate).format("DD-MM-YYYY")}</td>
                                <td></td>
                                <td></td>
                                <ChangeStatusTd onClick={() => {
                                    setChangeStatus(prev => {
                                        if (prev !== i) {
                                            return i
                                        }
                                        return ""
                                    })
                                }}>{getStatus(process.status)}
                                    {getStatus(process.status) !== "Hủy" && <ChangeStatusWrapper changeStatus={changeStatus === i}>
                                        <ChangeStatusOption>
                                            {getStatus(process.status) === "Đang chờ" && <span onClick={() => {
                                                changeProcessStatus(process)
                                            }}>Đang vận chuyển</span>}
                                            {getStatus(process.status) === "Đang vận chuyển" && <span onClick={() => {
                                                console.log(process)
                                                setCompleteProcess({
                                                    ...process,
                                                    finishDate: dayjs().format("YYYY-MM-DD")
                                                })
                                                setSelectedTags(process.tags.map(tag => tag.name))
                                                setCompleteProcessModal(true)
                                            }}>Hoàn thành</span>}
                                        </ChangeStatusOption>
                                        {getStatus(process.status) !== "Hủy" && <ChangeStatusOption>
                                            Hủy
                                        </ChangeStatusOption>}
                                    </ChangeStatusWrapper>}
                                </ChangeStatusTd>
                                <td>{process.pricePer}</td>
                                <td>{process.price}</td>
                                <td>{process.collect_money}</td>
                                <td>
                                    <ProcessChangeWrapper>
                                        {i > 1 && process.status !== 3 && <i className="fa-solid fa-arrow-up"></i>}
                                        {i < processes.length - 1 && process.status !== 1 && <i className="fa-solid fa-arrow-down"></i>}
                                        <i style={{
                                            cursor: "pointer"
                                        }} onClick={() => {
                                            console.log(process)
                                            setCompleteProcess(process)
                                            setEditProcessModal(true)
                                        }} className="fa-regular fa-pen-to-square"></i>

                                    </ProcessChangeWrapper>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </TableStyle>

        </TableWrapper>
    )
}

export default GoodItemTable
