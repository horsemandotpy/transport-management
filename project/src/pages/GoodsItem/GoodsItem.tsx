import { useParams } from "react-router-dom"
import { PageTitle, PageWrapper, SelectOption, TitleBarWrapper, TitleWrapper } from "../../style/style"
import axios from "axios";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import GoodItemTable from "../../components/Tables/GoodItemTable/GoodItemTable";
import BlueButton from "../../components/Button/BlueButton/BlueButton";
import InformationBoard from "../../components/InformationBoard/InformationBoard";
import { Input, Modal } from "antd";
import { ButtonWrapper, CostDisplayBlock, InforLabelWrapper, ModalColumn, OptionInfoWrapper, PayingMethodButton, PayingMethodGrid } from "./goodsItemStyle";
import TextArea from "antd/es/input/TextArea";

const GoodsItem = () => {
    const { id } = useParams();
    const [goods, setGoods] = useState()
    const [initialGoods, setInitialGoods] = useState()
    const [processes, setProcesses] = useState([])
    const [inforDisplay, setInforDisplay] = useState(false)
    const [openEditInfo, setOpenEditInfo] = useState(false)
    const [openAddProcess, setOpenAddProcess] = useState(false)
    const [customerData, setCustomerData] = useState([])
    const [warehouseData, setWarehouseData] = useState([])
    const [partnerData, setPartnerData] = useState([])
    const [tagsData, setTagsData] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [selectedWarehouse, setSelectedWarehouse] = useState()
    const [selectedPartner, setSelectedPartner] = useState({})
    const [selectedTags, setSelectedTags] = useState([])

    const [addedProcess, setAddedProcess] = useState({
        payType: "1",
        price: 0,
        pricePer: 0
    })


    const REGEX_NUMBER = new RegExp(/^[0-9]*\.?[0-9]*$/)

    const getItemInfo = async () => {
        const response = await axios.get(`/api/hanghoas/${id}`)
        setGoods(response.data)
        setInitialGoods(response.data)
        setSelectedCustomer(response.data.customer.name)
        setSelectedWarehouse(response.data.warehouse.name)
    }

    const getProcessInfo = async () => {
        const response = await axios.get(`/api/vanchuyens?page=1&numberpage=20&item_id=${id}`)
        setProcesses(response.data.data)
    }

    const fetchAllCustomer = async () => {
        const goodsClientsData = await axios.get("/api/khachhangs/all")
        let check = goodsClientsData.data.data;
        setCustomerData(check)
    }

    const fetchAllWareHouse = async () => {
        const wareHouse = await axios.get("/api/chukhos?page=1&limit=1000")
        setWarehouseData(wareHouse.data.data)
    }

    const getPartnersData = async () => {
        const response = await axios.get(`/api/doitacs?page=1s&numberpage=10&active=true`)
        setPartnerData(response.data.data)
    }

    const getTagsData = async () => {
        const response = await axios.get(`/api/tags/all?t=1`)
        setTagsData(response.data.data)
    }

    const CLIENT_OPTIONS = customerData.map(goods => goods);
    const WAREHOUSE_OPTIONS = warehouseData.map(goods => goods)
    const TAG_OPTIONS = tagsData.map(tag => tag)
    const PARTNER_OPTIONS = partnerData.map(item => item)

    const filteredClientOptions = CLIENT_OPTIONS.filter(customer => customer.name !== selectedCustomer)
    const filteredWarehouseOptions = WAREHOUSE_OPTIONS.filter(Warehouses => Warehouses.name !== selectedWarehouse)
    const filteredTags = TAG_OPTIONS.filter(tag => !selectedTags.includes(tag.name))
    const filteredPartner = PARTNER_OPTIONS.filter(partner => partner.name !== selectedPartner)

    useEffect(() => {
        getItemInfo()
        getProcessInfo()
        fetchAllCustomer()
        fetchAllWareHouse()
        getPartnersData()
        getTagsData()
    }, [])

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

    const postInforModal = async (goods) => {
        console.log(goods)

        await axios.post(`/api/hanghoas/${id}`, {
            ...goods,
            customField: `${goods.customer.name} - ${goods.weight} - ${goods.name}`,
            customerId: `${goods.customer.id}`,
        })
    }

    const postAddProcess = async (process) => {

        await axios.post(`/api/vanchuyens`, {
            ...addedProcess,
            item_id: id,
            partner_id: selectedPartner.id,
            selectedTags,
            status: 0
        })
    }

    const handleOkEditModal = async (goods) => {
        await postInforModal(goods)
        await getProcessInfo()
        await getItemInfo()
    }

    return (
        <PageWrapper >
            <TitleBarWrapper>
                <TitleWrapper>
                    <PageTitle>Hàng hóa:  {goods?.name || ""} <i className="fa-solid fa-circle-info" onClick={() => {
                        setInforDisplay(prev => !prev)
                    }}></i></PageTitle>
                    {goods && <InformationBoard setInforDisplay={setInforDisplay} setOpenEditInfo={setOpenEditInfo} inforDisplay={inforDisplay} arrayInfor={[
                        {
                            label: "Khách hàng:",
                            value: goods?.customer.name,
                        },
                        {
                            label: "Vận chuyển từ:",
                            value: goods?.from,
                        },
                        {
                            label: "Vận chuyển đến:",
                            value: goods?.to,
                        },
                        {
                            label: "Kho:",
                            value: goods?.warehouse.name,
                        },
                        {
                            label: "Vị trí hiện tại:",
                            value: goods?.currentLocation || "",
                        },
                        {
                            label: "Ngày phát hàng:",
                            value: dayjs(goods?.fromDate).format("YYYY-MM-DD"),
                        },
                        {
                            label: "Ngày giao hàng:",
                            value: dayjs(goods?.fromDate).format("YYYY-MM-DD"),
                        },
                        {
                            label: "Ngày kết thúc đơn hàng:",
                            value: dayjs(goods?.fromDate).format("YYYY-MM-DD"),
                        },
                        {
                            label: "Cân nặng(Kg):",
                            value: goods?.weight,
                        },
                        {
                            label: "Kiện hàng:",
                            value: goods?.numPkg,
                        },
                        {
                            label: "Kiện hàng lớn:",
                            value: goods?.numBigPkg,
                        },
                        {
                            label: "Giá trị hàng hóa(VNĐ):",
                            value: goods?.value,
                        },

                        {
                            label: "Cách trả phí theo :",
                            value: goods?.payType,
                        },
                        {
                            label: "Tỉ giá hiện tại:",
                            value: goods?.price_unit,
                        },
                        {
                            label: "Chi phí khách hàng trả(VNĐ):",
                            value: goods?.price,
                        },
                        {
                            label: "Trạng thái:",
                            value: goods?.status,
                        },
                        {
                            label: "Ghi chú:",
                            value: goods?.note,
                        },
                    ]} />}
                </TitleWrapper>
            </TitleBarWrapper>

            <TitleBarWrapper>
                {goods && <Modal width={600} title={`Cập nhật thông tin hàng hóa: ${goods?.name}`} open={openEditInfo} onCancel={() => {
                    setOpenEditInfo(false)
                    setGoods(initialGoods)
                }} onOk={() => {
                    handleOkEditModal(goods)
                    setOpenEditInfo(false)
                }}>
                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Khách hàng:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <SelectOption
                                placeholder="Search By Clients"
                                value={selectedCustomer}
                                onChange={(e) => {
                                    setSelectedCustomer(e);
                                    const newCustomer = customerData.filter(item => item.name === e)[0];
                                    setGoods({
                                        ...goods,
                                        customer: newCustomer,
                                        payType: "1",
                                        price_unit: newCustomer.pricePerKg,
                                        price: +goods.weight * newCustomer.pricePerKg
                                    })
                                }}
                                style={{
                                    width: '100%',
                                }}
                                options={filteredClientOptions.map((item) => ({
                                    key: item.id,
                                    value: item.name,
                                    label: item.name,
                                }))}
                            />
                        </OptionInfoWrapper>
                    </ModalColumn>
                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Kho:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <SelectOption
                                placeholder="Search By Warehouse"
                                value={selectedWarehouse}
                                onChange={(e) => {
                                    setSelectedWarehouse(e);
                                    const newWarehouse = warehouseData.filter(warehouse => warehouse.name === e)[0]
                                    setGoods({
                                        ...goods,
                                        warehouse: newWarehouse,
                                        warehouseId: newWarehouse.id,
                                    })
                                }}
                                style={{
                                    width: '100%',
                                }}
                                options={filteredWarehouseOptions.map((item) => ({
                                    key: item.id,
                                    value: item.name,
                                    label: item.name,
                                }))}
                            />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Tên hàng hóa:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input value={goods?.name} onChange={(e) => {
                                setGoods({
                                    ...goods,
                                    name: e.target.value
                                })
                            }} />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Cân nặng:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input value={goods?.weight} onChange={(e) => {

                                if (REGEX_NUMBER.test(e.target.value)) {

                                    setGoods({
                                        ...goods,
                                        weight: e.target.value,
                                        price: getPrice(goods.price_unit,
                                            e.target.value,
                                            goods.numPkg,
                                            goods.numBigPkg,
                                            goods.value,
                                            goods.payType,
                                            goods.price
                                        )
                                    })
                                }
                            }} />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Giá trị hàng hóa:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input value={goods?.value} onChange={(e) => {

                                if (REGEX_NUMBER.test(e.target.value)) {
                                    setGoods({
                                        ...goods,
                                        value: e.target.value,
                                        price: getPrice(goods.price_unit,
                                            goods.weight,
                                            goods.numPkg,
                                            goods.numBigPkg,
                                            e.target.value,
                                            goods.payType,
                                            goods.price
                                        )
                                    })
                                }
                            }} />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Cách trả phí:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <PayingMethodGrid>
                                <PayingMethodButton green={goods.payType === "1"} value="1" onClick={() => {
                                    setGoods({
                                        ...goods,
                                        payType: "1",
                                        price_unit: goods.customer.pricePerKg,
                                        price: `${+goods.customer.pricePerKg * +goods.weight}`
                                    })

                                }}>
                                    Cân nặng
                                </PayingMethodButton>
                                <PayingMethodButton green={goods.payType === "2"} value="2" onClick={() => {
                                    setGoods({
                                        ...goods,
                                        payType: "2",
                                        price_unit: goods.customer.pricePerPackage,
                                        price: `${+goods.customer.pricePerPackage * +goods.numPkg}`,
                                    })
                                }}>
                                    Kiện
                                </PayingMethodButton>
                                <PayingMethodButton green={goods.payType === "3"} value="3" onClick={() => {
                                    setGoods({
                                        ...goods,
                                        payType: "3",
                                        price_unit: goods.customer.pricePerBigPackage,
                                        price: `${+goods.customer.pricePerBigPackage * +goods.numBigPkg}`,
                                    })

                                }}>
                                    Kiện lớn
                                </PayingMethodButton>
                                <PayingMethodButton green={goods.payType === "4"} value="4" onClick={() => {
                                    setGoods({
                                        ...goods,
                                        payType: "4",
                                        price_unit: goods.customer.pricePerPercent,
                                        price: `${+goods.customer.pricePerPercent * +goods.value}`
                                    })
                                }}>
                                    Phần trăm
                                </PayingMethodButton>
                                <PayingMethodButton green={goods.payType === "5"} value="5" onClick={() => {
                                    setGoods({
                                        ...goods,
                                        payType: "5",
                                        price_unit: "0",
                                        price: `0`
                                    })
                                }}>
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
                                <Input value={goods.price_unit} onChange={(e) => {
                                    if (REGEX_NUMBER.test(e.target.value)) {
                                        setGoods({
                                            ...goods,
                                            price_unit: e.target.value,
                                            price: getPrice(e.target.value,
                                                goods.weight,
                                                goods.numPkg,
                                                goods.numBigPkg,
                                                goods.value,
                                                goods.payType,
                                                goods.price
                                            )
                                        })
                                    }
                                }} />
                                <CostDisplayBlock>={goods.price}</CostDisplayBlock>
                            </ModalColumn>
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Ngày bắt đầu</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <DatePicker defaultValue={dayjs()} onChange={(e) => {
                                const date = dayjs(e).format("YYYY-MM-DD");
                                setGoods({
                                    ...goods,
                                    fromDate: date,
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
                                setGoods({
                                    ...goods,
                                    note: e.target.value
                                })
                            }} />
                        </OptionInfoWrapper>
                    </ModalColumn>

                </Modal>}

                {goods && <Modal width={600} title={`Thêm tiến trình`} open={openAddProcess} onOk={() => {
                    postAddProcess(addedProcess)
                    setSelectedPartner({})
                    setAddedProcess({
                        payType: "1",
                        price: 0,
                        pricePer: 0
                    })
                    getProcessInfo()
                    setOpenAddProcess(false)

                }} onCancel={() => {
                    setOpenAddProcess(false)
                    setSelectedPartner({})
                    setAddedProcess({
                        payType: "1",
                        price: 0,
                        pricePer: 0
                    })
                }}>
                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Tên tiến trình</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input onChange={(e) => {
                                setAddedProcess({
                                    ...addedProcess,
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
                            <SelectOption
                                style={{
                                    width: '70%',
                                }}
                                placeholder="Search By Partner"
                                value={selectedPartner.fullName}
                                onChange={(e) => {
                                    const newPartner = partnerData.filter(partner => partner.fullName === e)[0];
                                    setSelectedPartner(newPartner)
                                    setAddedProcess({
                                        ...addedProcess,
                                        payType: "1",
                                        price: +goods.weight * +newPartner.pricePerKg,
                                        pricePer: +newPartner.pricePerKg
                                    })
                                }}
                                options={filteredPartner.map((item) => ({
                                    key: item.id,
                                    value: item.fullName,
                                    label: item.fullName,
                                }))}
                            />
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
                                <PayingMethodButton green={addedProcess.payType === "1"} value="1" onClick={() => {
                                    setAddedProcess({
                                        ...addedProcess,
                                        payType: "1",
                                        price: +goods.weight * +selectedPartner.pricePerKg,
                                        pricePer: +selectedPartner.pricePerKg
                                    })

                                }}>
                                    Cân nặng
                                </PayingMethodButton>
                                <PayingMethodButton green={addedProcess.payType === "2"} value="2" onClick={() => {
                                    setAddedProcess({
                                        ...addedProcess,
                                        payType: "2",
                                        price: +goods.numPkg * +selectedPartner.pricePerPackage,
                                        pricePer: +selectedPartner.pricePerPackage
                                    })
                                }}>
                                    Kiện
                                </PayingMethodButton>
                                <PayingMethodButton green={addedProcess.payType === "3"} value="3" onClick={() => {
                                    setAddedProcess({
                                        ...addedProcess,
                                        payType: "3",
                                        price: +goods.numBigPkg * +selectedPartner.pricePerBigPackage,
                                        pricePer: +selectedPartner.pricePerBigPackage
                                    })

                                }}>
                                    Kiện lớn
                                </PayingMethodButton>
                                <PayingMethodButton green={addedProcess.payType === "4"} value="4" onClick={() => {
                                    setAddedProcess({
                                        ...addedProcess,
                                        payType: "4",
                                        price: +goods.value * +selectedPartner.pricePerPercent,
                                        pricePer: +selectedPartner.pricePerPercent
                                    })
                                }}>
                                    Phần trăm
                                </PayingMethodButton>
                                <PayingMethodButton green={addedProcess.payType === "5"} value="5" onClick={() => {
                                    setAddedProcess({
                                        ...addedProcess,
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
                                <Input value={addedProcess.pricePer} onChange={(e) => {
                                    if (REGEX_NUMBER.test(e.target.value)) {
                                        setAddedProcess({
                                            ...addedProcess,
                                            pricePer: +e.target.value,
                                            price: +getPrice(e.target.value,
                                                goods.weight,
                                                goods.numPkg,
                                                goods.numBigPkg,
                                                goods.value,
                                                addedProcess.payType,
                                                addedProcess.price
                                            )
                                        })
                                    }
                                }} />
                                <CostDisplayBlock>={addedProcess.price}</CostDisplayBlock>
                            </ModalColumn>
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Ghi chú</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <TextArea onChange={(e) => {
                                setAddedProcess({
                                    ...addedProcess,
                                    note: e.target.value
                                })
                            }} />
                        </OptionInfoWrapper>
                    </ModalColumn>
                </Modal>}

                <ButtonWrapper>
                    <BlueButton name={"Thêm tiến trình"} setOpenModal={setOpenAddProcess} />
                </ButtonWrapper>
            </TitleBarWrapper>


            <GoodItemTable
                goods={goods}
                processes={processes}
                getPrice={getPrice}
                REGEX_NUMBER={REGEX_NUMBER}
                tagsData={tagsData}
                getProcessInfo={getProcessInfo}
            />


        </PageWrapper >
    )
}

export default GoodsItem
