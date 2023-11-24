import React, { useEffect, useState } from 'react'
import StatusBar from '../../components/StatusBar/StatusBar'
import GoodsTable from '../../components/Tables/GoodsTable/GoodsTable'
import Footer from '../../layout/Footer/Footer';
import { AddButton, PageTitle, PageWrapper, SelectOption, TitleBarWrapper, TitleWrapper } from '../../style/style'
import { Link, useParams } from 'react-router-dom'
import { DatePicker, Input, Modal } from 'antd'
import dayjs from 'dayjs'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { CostDisplayBlock, InforLabelWrapper, ModalColumn, OptionInfoWrapper, PayingMethodButton, PayingMethodGrid } from './customerItemsStyle';
import TextArea from 'antd/es/input/TextArea';
const { RangePicker } = DatePicker;


const CustomerItems = () => {

    const { id } = useParams()
    const [customer, setCustomer] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState([])
    const [warehouse, setWarehouse] = useState([])
    const [colTitle, setColTitle] = useState([])
    const [allCol, setAllCol] = useState([])
    const [setWarehouseIds, setSetWarehouseIds] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDates, setFilterDates] = useState({
        fromDate: dayjs().startOf("M").format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
    })
    const [totalPost, setTotalPost] = useState(0)
    const [filteredGoods, setFilteredGoods] = useState([])
    const [selectedWarehouseItems, setSelectedWarehouseItems] = useState([])

    const [addItemModal, setAddItemModal] = useState(false)
    const [newItem, setNewItem] = useState()

    const [newItemWarehouse, setNewItemWarehouse] = useState({})

    const numberpage = useSelector(state => state.filter.numberpage);

    const REGEX_NUMBER = new RegExp(/^[0-9]*\.?[0-9]*$/)

    const getCustomer = async (id) => {
        const data = await axios.get(`/api/khachhangs/${id}`)
        setCustomer(data.data)
    }


    const fetchAllWareHouse = async () => {
        const wareHouse = await axios.get("/api/chukhos?page=1&limit=1000")
        setWarehouse(wareHouse.data.data);
    }

    const fetchColData = async () => {
        const colData = await axios.get("/api/user/item-fields")
        const data = colData.data
        setColTitle(data)
        setAllCol(data)
    }

    const fetchDataByOption = async (id) => {
        const goodsDataByCustomer = await axios.get(`/api/hanghoas?${getStatusParam()}page=${currentPage}${getParamsWarehouseIds()}&fromDate=${filterDates.fromDate}&toDate=${filterDates.toDate}%2023:59:59&numberpage=${numberpage}&filterByCustomers=${id}`)
        const goodsDataCustomer = goodsDataByCustomer.data.data
        const count = goodsDataByCustomer.data.count;
        setTotalPost(count);

        setFilteredGoods(goodsDataCustomer);
    }

    const getParamsWarehouseIds = () => {
        if (setWarehouseIds.length >= 1) {
            return `&filterByWarehouses=${setWarehouseIds.join()}`
        }
        return ""
    }

    const getStatusParam = () => {
        if (status.length >= 1) {
            return `status=${status.join()}`
        }
        return "";
    }

    const onChangeFilterWarehouse = (e) => {
        const goodsByWareHouse = warehouse.filter(goods => e.includes(goods.name))

        const warehouseIDs = goodsByWareHouse.map(goods => goods.id)

        const setWarehouseIds = warehouseIDs.filter((id, index) => {
            return warehouseIDs.indexOf(id) === index
        })
        setSetWarehouseIds(setWarehouseIds);
        setCurrentPage(1);
    }

    const dateChange = (e) => {
        const date = {
            fromDate: dayjs(e[0]).format("YYYY-MM-DD"),
            toDate: dayjs(e[1]).format("YYYY-MM-DD"),
        }
        setFilterDates(date);
        setCurrentPage(1);
    };

    const postNewItem = async () => {
        await axios.post("/api/hanghoas", newItem)
    }

    const filteredWarehouseOptions = warehouse.filter((o) => !selectedWarehouseItems.includes(o.name));
    const filteredWarehouseModalOptions = warehouse.filter((house) => house.id !== newItemWarehouse)

    useEffect(() => {
        fetchAllWareHouse()
        fetchColData()
        fetchDataByOption(id)
        getCustomer(id)
    }, [])

    useEffect(() => {
        fetchDataByOption(id);
    }, [setWarehouseIds, filterDates, numberpage, currentPage, status])

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
        <>
            {isLoading && <LoadingScreen message={`Đang chuyển cột`} />}
            {customer && newItem &&
                <Modal
                    width={600}
                    title={`Thêm mới hàng hóa: (${customer.transferFrom} - ${customer.transferTo})`}
                    open={addItemModal}
                    onCancel={() => {
                        setNewItem({
                            customer: customer,
                            currentPartner: null,
                            customerId: customer.id,
                            from: customer.transferFrom,
                            name: "",
                            note: "",
                            numBigPkg: 1,
                            numPkg: 1,
                            payType: "1",
                            price: 0,
                            price_unit: 0,
                            value: 0,
                            weight: 0,
                            to: customer.transferTo
                        })
                        setNewItemWarehouse("")
                        setAddItemModal(false)
                    }}
                    onOk={() => {
                        postNewItem();
                        fetchDataByOption(id);
                        setNewItem({
                            customer: customer,
                            currentPartner: null,
                            customerId: customer.id,
                            from: customer.transferFrom,
                            name: "",
                            note: "",
                            numBigPkg: 1,
                            numPkg: 1,
                            payType: "1",
                            price: 0,
                            price_unit: 0,
                            value: 0,
                            weight: 0,
                            to: customer.transferTo
                        })
                        setNewItemWarehouse("")
                        setAddItemModal(false)
                    }}

                >

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Tên hàng hóa</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input
                                value={newItem.name}
                                onChange={(e) => {
                                    setNewItem({
                                        ...newItem,
                                        name: e.target.value
                                    })
                                }} />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Kho</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <SelectOption
                                style={{
                                    width: "100%"
                                }}
                                placeholder="Search By Warehouse"
                                value={newItemWarehouse}
                                onChange={(e) => {
                                    setNewItemWarehouse(e);
                                    const warehouseId = warehouse.filter(house => house.name === newItemWarehouse)[0].id
                                    setNewItem({
                                        ...newItem,
                                        warehouseId: warehouseId,
                                    })
                                }}
                                options={filteredWarehouseModalOptions.map((item) => ({
                                    key: item.id,
                                    value: item.name,
                                    label: item.name,
                                }))}
                            />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Cân nặng</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input
                                style={{
                                    width: "30%"
                                }}
                                onChange={(e) => {
                                    setNewItem({
                                        ...newItem,
                                        weight: +e.target.value,
                                        price: +getPrice(
                                            newItem.price_unit,
                                            e.target.value,
                                            newItem.numPkg,
                                            newItem.numBigPkg,
                                            newItem.value,
                                            newItem.payType,
                                            newItem.price
                                        )
                                    })
                                }} />
                            {" (KG)"}
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Giá trị hàng hóa</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <Input
                                style={{
                                    width: "40%"
                                }}
                                onChange={(e) => {
                                    setNewItem({
                                        ...newItem,
                                        value: +e.target.value,
                                        price: +getPrice(
                                            newItem.price_unit,
                                            newItem.weight,
                                            newItem.numPkg,
                                            newItem.numBigPkg,
                                            e.target.value,
                                            newItem.payType,
                                            newItem.price
                                        )
                                    })
                                }} />
                        </OptionInfoWrapper>
                    </ModalColumn>



                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Cách trả phí:</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <PayingMethodGrid>
                                <PayingMethodButton
                                    green={newItem.payType === "1"}
                                    value="1"
                                    onClick={() => {
                                        setNewItem({
                                            ...newItem,
                                            payType: "1",
                                            price: +newItem.weight * +customer.pricePerKg,
                                            price_unit: +customer.pricePerKg
                                        })

                                    }}>
                                    Cân nặng
                                </PayingMethodButton>
                                <PayingMethodButton
                                    green={newItem.payType === "2"}
                                    value="2"
                                    onClick={() => {
                                        setNewItem({
                                            ...newItem,
                                            payType: "2",
                                            price: +newItem.numPkg * +customer.pricePerPackage,
                                            price_unit: +customer.pricePerPackage
                                        })
                                    }}>
                                    Kiện
                                </PayingMethodButton>
                                <PayingMethodButton
                                    green={newItem.payType === "3"}
                                    value="3"
                                    onClick={() => {
                                        setNewItem({
                                            ...newItem,
                                            payType: "3",
                                            price: +newItem.numBigPkg * +customer.pricePerBigPackage,
                                            price_unit: +customer.pricePerBigPackage
                                        })

                                    }}>
                                    Kiện lớn
                                </PayingMethodButton>
                                <PayingMethodButton
                                    green={newItem.payType === "4"}
                                    value="4"
                                    onClick={() => {
                                        setNewItem({
                                            ...newItem,
                                            payType: "4",
                                            price: +newItem.value * +customer.pricePerPercent,
                                            price_unit: +customer.pricePerPercent
                                        })
                                    }}>
                                    Phần trăm
                                </PayingMethodButton>
                                <PayingMethodButton
                                    green={newItem.payType === "5"}
                                    value="5"
                                    onClick={() => {
                                        setNewItem({
                                            ...newItem,
                                            payType: "5",
                                            price: 0,
                                            price_unit: 0
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
                                <Input
                                    value={newItem.price_unit}
                                    onChange={(e) => {
                                        if (REGEX_NUMBER.test(e.target.value)) {
                                            setNewItem({
                                                ...newItem,
                                                price_unit: +e.target.value,
                                                price: +getPrice(e.target.value,
                                                    newItem.weight,
                                                    newItem.numPkg,
                                                    newItem.numBigPkg,
                                                    newItem.value,
                                                    newItem.payType,
                                                    newItem.price
                                                )
                                            })
                                        }
                                    }} />
                                <CostDisplayBlock>={newItem.price}</CostDisplayBlock>
                            </ModalColumn>
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            Ngày nhận
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <DatePicker
                                value={dayjs()} // Don't use object date here, conflict wiht dayjs
                                onChange={(e) => {
                                    setNewItem({
                                        ...newItem,
                                        fromDate: dayjs(e).format("YYYY-MM-DD"),
                                    })
                                }}
                            />
                        </OptionInfoWrapper>
                    </ModalColumn>

                    <ModalColumn>
                        <InforLabelWrapper>
                            <span>Ghi chú</span>
                        </InforLabelWrapper>
                        <OptionInfoWrapper>
                            <TextArea onChange={(e) => {
                                setNewItem({
                                    ...newItem,
                                    note: e.target.value
                                })
                            }} />
                        </OptionInfoWrapper>
                    </ModalColumn>

                </Modal>}

            <PageWrapper>
                <TitleBarWrapper>
                    <TitleWrapper>
                        <PageTitle>Danh Sách Hàng Hóa</PageTitle>
                        <AddButton
                            onClick={() => {
                                setNewItem({
                                    customer: customer,
                                    currentPartner: null,
                                    customerId: customer.id,
                                    from: customer.transferFrom,
                                    name: "",
                                    note: "",
                                    numBigPkg: 1,
                                    numPkg: 1,
                                    payType: "1",
                                    price: 0,
                                    price_unit: 0,
                                    value: 0,
                                    weight: 0,
                                    to: customer.transferTo
                                })
                                setAddItemModal(true)

                            }}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </AddButton>
                    </TitleWrapper>
                    <RangePicker defaultValue={[dayjs().startOf("M"), dayjs()]} onChange={(e) => {
                        dateChange(e)
                    }} />

                    <SelectOption
                        mode="multiple"
                        placeholder="Search By Warehouse"
                        value={selectedWarehouseItems}
                        onChange={(e) => {
                            setSelectedWarehouseItems(e);
                            onChangeFilterWarehouse(e);
                        }}
                        options={filteredWarehouseOptions.map((item) => ({
                            key: item.id,
                            value: item.name,
                            label: item.name,
                        }))}
                    />
                </TitleBarWrapper>

                <div>
                    <StatusBar
                        status={status}
                        setStatus={setStatus}
                        colTitle={colTitle}
                        setColTitle={setColTitle}
                        allCol={allCol}
                        setAllCol={setAllCol}
                    />
                </div>


                <GoodsTable
                    status={status}
                    currentPage={currentPage}
                    colTitle={colTitle}
                    fetchColData={fetchColData}
                    filteredGoods={filteredGoods}
                    setIsLoading={setIsLoading}
                    fetchDataByOption={fetchDataByOption}
                />

                <Footer
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPost={totalPost} />

            </PageWrapper>
        </>
    )
}

export default CustomerItems
