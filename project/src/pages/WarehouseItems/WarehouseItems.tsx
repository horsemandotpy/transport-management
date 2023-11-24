import { useEffect, useState } from 'react'
import StatusBar from '../../components/StatusBar/StatusBar'
import GoodsTable from '../../components/Tables/GoodsTable/GoodsTable'
import Footer from '../../layout/Footer/Footer';
import { PageTitle, PageWrapper, SelectOption, TitleBarWrapper, TitleWrapper } from '../../style/style'
import { useParams } from 'react-router-dom'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { storeSetWarehouse } from '../../store/filter-reducer';
const { RangePicker } = DatePicker;


const WarehouseItems = () => {

    const { id } = useParams()
    const warehouse = useSelector(state => state.filter.warehouse)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState([])
    const [customer, setCustomer] = useState([])
    const [colTitle, setColTitle] = useState([])
    const [allCol, setAllCol] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDates, setFilterDates] = useState({
        fromDate: dayjs().startOf("M").format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
    })
    const [totalPost, setTotalPost] = useState(0)
    const [filteredGoods, setFilteredGoods] = useState([])
    const [setCustomerIds, setSetCustomerIds] = useState([])
    const [selectedCustomerItems, setSelectedCustomerItems] = useState([])

    const numberpage = useSelector(state => state.filter.numberpage);

    const getCustomerIds = () => {
        if (setCustomerIds.length > 0) {
            return `&filterByCustomers=${setCustomerIds.join()}`
        }
        return ""
    }

    const getWarehouse = async (id) => {
        const data = await axios.get(`/api/chukhos/${id}`)
        dispatch(storeSetWarehouse(data.data))
    }

    const fetchAllCustomer = async () => {
        const customer = await axios.get("/api/khachhangs/all")
        setCustomer(customer.data.data);
    }

    const fetchColData = async () => {
        const colData = await axios.get("/api/user/item-fields")
        const data = colData.data
        setColTitle(data)
        setAllCol(data)
    }

    const fetchDataByOption = async (id) => {
        const goodsDataByCustomer = await axios.get(`/api/hanghoas?${getStatusParam()}page=${currentPage}&filterByWarehouses=${id}${getCustomerIds()}&fromDate=${filterDates.fromDate}&toDate=${filterDates.toDate}%2023:59:59&numberpage=${numberpage}`)
        const goodsDataCustomer = goodsDataByCustomer.data.data
        const count = goodsDataByCustomer.data.count;
        setTotalPost(count);

        setFilteredGoods(goodsDataCustomer);
    }

    const getStatusParam = () => {
        if (status.length >= 1) {
            return `status=${status.join()}`
        }
        return "";
    }

    const onChangeFilterCustomer = (e) => {
        const goodsByCustomer = customer.filter(goods => e.includes(goods.name))

        const customerIds = goodsByCustomer.map(goods => goods.id)

        const setCustomerIds = customerIds.filter((id, index) => {
            return customerIds.indexOf(id) === index
        })
        setSetCustomerIds(setCustomerIds);
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

    const filteredCustomerOptions = customer.filter((o) => !selectedCustomerItems.includes(o.name));

    useEffect(() => {
        fetchAllCustomer()
        fetchColData()
        fetchDataByOption(id)
        getWarehouse(id)
    }, [])

    useEffect(() => {
        fetchDataByOption(id);
    }, [setCustomerIds, filterDates, numberpage, currentPage, status])


    return (
        <>
            {isLoading && <LoadingScreen message={`Đang chuyển cột`} />}


            <PageWrapper>
                <TitleBarWrapper>
                    <TitleWrapper>
                        <PageTitle>Danh Sách Hàng Hóa</PageTitle>
                    </TitleWrapper>
                    <RangePicker defaultValue={[dayjs().startOf("M"), dayjs()]} onChange={(e) => {
                        dateChange(e)
                    }} />

                    <SelectOption
                        mode="multiple"
                        placeholder="Search By Warehouse"
                        value={selectedCustomerItems}
                        onChange={(e) => {
                            setSelectedCustomerItems(e);
                            onChangeFilterCustomer(e);
                        }}
                        options={filteredCustomerOptions.map((item) => ({
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

export default WarehouseItems
