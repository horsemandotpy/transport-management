import { useState, useEffect } from 'react'
import { GoodWrapper, } from './goodsStyle'
import { AddButton, PageTitle, SelectOption, TitleBarWrapper, TitleWrapper } from '../../style/style'
import { DatePicker } from 'antd';
import GoodsTable from '../../components/Tables/GoodsTable/GoodsTable';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { storeSetSelectedWarehouseItems, storeSetFilteredGoods, storeSetGoodsAllClients, storeSetGoodsData, storeSetGoodsWareHouse, storeSetSelectedCustomerItems, storeSetSetCustomerIds, storeSetSetWarehouseIds, storeSetTransDate } from '../../store/filter-reducer';
import Footer from '../../layout/Footer/Footer';
import StatusBar from '../../components/StatusBar/StatusBar';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';



const Goods = () => {

  // Delete Goods
  // Select Goods
  // Customer Page
  // Goods Page
  // Partner Page

  const [colTitle, setColTitle] = useState([])
  const [allCol, setAllCol] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0)
  const [status, setStatus] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();
  const transDate = useSelector(state => state.filter.transDate);
  const goodsAllClients = useSelector((state) => state.filter.goodsAllClients);
  const goodsWarehouse = useSelector(state => state.filter.goodsWarehouse)
  const filteredGoods = useSelector(state => state.filter.filteredGoods)

  const selectedCustomerItems = useSelector(state => state.filter.selectedCustomerItems)
  const selectedWarehouseItems = useSelector(state => state.filter.selectedWarehouseItems)

  const setCustomerIds = useSelector(state => state.filter.setCustomerIds)
  const setWarehouseIds = useSelector(state => state.filter.setWarehouseIds)

  const numberpage = useSelector(state => state.filter.numberpage);

  const fetchAllCustomer = async () => {
    const goodsClientsData = await axios.get("/api/khachhangs/all")
    let check = goodsClientsData.data.data;
    dispatch(storeSetGoodsAllClients(check));
  }

  const fetchAllWareHouse = async () => {
    const wareHouse = await axios.get("/api/chukhos?page=1&limit=1000")
    dispatch(storeSetGoodsWareHouse(wareHouse.data.data));
  }

  const CLIENT_OPTIONS = goodsAllClients.map(goods => goods);
  const WAREHOUSE_OPTIONS = goodsWarehouse.map(goods => goods)

  const filteredClientOptions = CLIENT_OPTIONS.filter((o) => !selectedCustomerItems.includes(o.name));
  const filteredWarehouseOptions = WAREHOUSE_OPTIONS.filter((o) => !selectedWarehouseItems.includes(o.name));

  const fetchColData = async () => {
    const colData = await axios.get("/api/user/item-fields")
    const data = colData.data
    setColTitle(data)
    setAllCol(data)
  }

  const fetchDataByDate = async () => {
    const goodsDataByDate = await axios.get(`api/hanghoas?page=1&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=${numberpage}`)
    dispatch(storeSetGoodsData(goodsDataByDate.data.data));
    const count = goodsDataByDate.data.count;
    setTotalPost(count);

    dispatch(storeSetFilteredGoods(goodsDataByDate.data.data));
    setCurrentPage(1);
  }

  const getParamsCustomerId = () => {
    if (setCustomerIds.length >= 1) {
      const id = setCustomerIds.join();
      return `&filterByCustomers=${id}`
    }
    return ""
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

  const fetchDataByOption = async () => {
    const goodsDataByCustomer = await axios.get(`api/hanghoas?${getStatusParam()}page=${currentPage}${getParamsCustomerId()}${getParamsWarehouseIds()}&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=${numberpage}`)
    const goodsDataCustomer = goodsDataByCustomer.data.data
    const count = goodsDataByCustomer.data.count;
    setTotalPost(count);

    dispatch(storeSetFilteredGoods(goodsDataCustomer));
  }

  const onChangeFilterCustomer = (e) => {
    const goodsByCustomer = CLIENT_OPTIONS.filter(customer => e.includes(customer.name))

    const customerIDs = goodsByCustomer.map(customer => customer.id);

    const setCustomerIds = customerIDs.filter((id, index) => {
      return customerIDs.indexOf(id) === index;
    })
    dispatch(storeSetSetCustomerIds(setCustomerIds));
    setCurrentPage(1);
  }

  const onChangeFilterWarehouse = (e) => {
    const goodsByWareHouse = WAREHOUSE_OPTIONS.filter(goods => e.includes(goods.name))

    const warehouseIDs = goodsByWareHouse.map(goods => goods.id)

    const setWarehouseIds = warehouseIDs.filter((id, index) => {
      return warehouseIDs.indexOf(id) === index
    })
    dispatch(storeSetSetWarehouseIds(setWarehouseIds));
    setCurrentPage(1);
  }

  const dateChange = (e: []) => {
    const date = {
      fromDate: dayjs(e[0]).format("YYYY-MM-DD"),
      toDate: dayjs(e[1]).format("YYYY-MM-DD"),
    }
    dispatch(storeSetTransDate(date));
    setCurrentPage(1);

  };

  useEffect(() => {
    fetchAllCustomer();
    fetchAllWareHouse();
    fetchColData();
    fetchDataByDate();
  }, [])

  useEffect(() => {
    fetchDataByOption();
  }, [setCustomerIds, setWarehouseIds, transDate, numberpage, currentPage, status])


  return (

    <>
      {isLoading && <LoadingScreen message={`Đang chuyển cột`} />}
      <GoodWrapper>
        <TitleBarWrapper>
          <TitleWrapper>
            <PageTitle>Danh Sách Hàng Hóa</PageTitle>
            <Link to="/goods/create-items"><AddButton><i className="fa-solid fa-circle-plus"></i></AddButton></Link>
          </TitleWrapper>
          <RangePicker defaultValue={[dayjs().startOf("M"), dayjs()]} onChange={(e) => {
            dateChange(e)
          }} />
          <SelectOption
            mode="multiple"
            placeholder="Search By Clients"
            value={selectedCustomerItems}
            onChange={(e) => {
              dispatch(storeSetSelectedCustomerItems(e));
              onChangeFilterCustomer(e);
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
          <SelectOption
            mode="multiple"
            placeholder="Search By Warehouse"
            value={selectedWarehouseItems}
            onChange={(e) => {
              dispatch(storeSetSelectedWarehouseItems(e));
              onChangeFilterWarehouse(e);
            }}
            options={filteredWarehouseOptions.map((item) => ({
              key: item.id,
              value: item.name,
              label: item.name,
            }))}
          />
        </TitleBarWrapper>

        <StatusBar
          status={status}
          setStatus={setStatus}
          colTitle={colTitle}
          setColTitle={setColTitle}
          allCol={allCol}
          setAllCol={setAllCol}
        />

        <GoodsTable
          status={status}
          currentPage={currentPage}
          colTitle={colTitle}
          fetchColData={fetchColData}
          filteredGoods={filteredGoods}
          setIsLoading={setIsLoading}
          fetchDataByOption={fetchDataByOption}
        />

        <Footer currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPost={totalPost} />

      </GoodWrapper>
    </>

  )
}

export default Goods
