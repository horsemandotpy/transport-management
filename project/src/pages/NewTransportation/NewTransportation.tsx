import { PageTitle, PageWrapper, SelectOption, TitleBarWrapper, TitleWrapper } from '../../style/style'
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
import axios from 'axios';
import { storeSetSelectedWarehouseItems, storeSetFilteredGoods, storeSetGoodsAllClients, storeSetGoodsData, storeSetGoodsWareHouse, storeSetSelectedCustomerItems, storeSetSetCustomerIds, storeSetSetWarehouseIds, storeSetTransDate } from '../../store/filter-reducer';
import Footer from '../../layout/Footer/Footer';
import { useEffect, useState } from 'react';
import NewTransportationTable from '../../components/Tables/NewTransportationTable/NewTransportationTable';
import StatusBarProcessNew from '../../components/StatusBar/StatusBarProcessNew';
import { NewTransportationStatusBarWrapper } from './newTransportationStyle';

const NewTransportation = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);
  const [status, setStatus] = useState("all");
  const [transportRoute, setTransportRoute] = useState([])

  const dispatch = useDispatch();
  const transDate = useSelector(state => state.filter.transDate);
  const goodsAllClients = useSelector((state) => state.filter.goodsAllClients);
  const goodsWarehouse = useSelector(state => state.filter.goodsWarehouse)
  const filteredGoods = useSelector(state => state.filter.filteredGoods)

  const selectedCustomerItems = useSelector(state => state.filter.selectedCustomerItems)
  const selectedWarehouseItems = useSelector(state => state.filter.selectedWarehouseItems)

  const setCustomerIds = useSelector(state => state.filter.setCustomerIds)
  const setWarehouseIds = useSelector(state => state.filter.setWarehouseIds)

  const CLIENT_OPTIONS = goodsAllClients.map(good => good);
  const WAREHOUSE_OPTIONS = goodsWarehouse.map(goods => goods)

  const filteredClientOptions = CLIENT_OPTIONS.filter((o) => !selectedCustomerItems.includes(o.name));
  const filteredWarehouseOptions = WAREHOUSE_OPTIONS.filter((o) => !selectedWarehouseItems.includes(o.name));

  const numberpage = useSelector(state => state.filter.numberpage);

  const fetchDataByDate = async () => {
    const goodsDataByDate = await axios.get(`api/hanghoas?page=1&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=${numberpage}&transferStatus=all`)
    dispatch(storeSetGoodsData(goodsDataByDate.data.data));
    const count = goodsDataByDate.data.count;
    setTotalPost(count);

    const objectIds = goodsDataByDate.data.data.map(goods => goods.id)

    const newRoutes = []

    objectIds.forEach(id => {
      newRoutes.push(getTransport(id));
    })

    Promise.all(newRoutes).then(values => {
      setTransportRoute(values)
    })

    dispatch(storeSetFilteredGoods(goodsDataByDate.data.data));
    setCurrentPage(1);
  }

  const fetchDataByOption = async () => {
    const goodsDataByCustomer = await axios.get(`api/hanghoas?page=${currentPage}&${getParamsCustomerId()}&${getParamsWarehouseIds()}&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=${numberpage}${getStatusParam()}`)
    const goodsDataCustomer = goodsDataByCustomer.data.data
    const count = goodsDataByCustomer.data.count;
    setTotalPost(count);

    const objectIds = goodsDataByCustomer.data.data.map(goods => goods.id)

    const newRoutes = []

    objectIds.forEach(id => {
      newRoutes.push(getTransport(id));
    })

    Promise.all(newRoutes).then(values => {
      setTransportRoute(values)
    })

    dispatch(storeSetFilteredGoods(goodsDataCustomer));
  }

  const getTransport = async (id) => {
    const response = await axios.get(`api/vanchuyens?page=1&numberpage=20&fromDate=&toDate=&item_id=${id}`)
    return response.data;
  }

  const dateChange = (e: []) => {
    const date = {
      fromDate: dayjs(e[0]).format("YYYY-MM-DD"),
      toDate: dayjs(e[1]).format("YYYY-MM-DD"),
    }
    dispatch(storeSetTransDate(date));
    setCurrentPage(1);
  };

  const getParamsCustomerId = () => {
    if (setCustomerIds.length >= 1) {
      return `filterByCustomers=${setCustomerIds.join()}`
    }
    return ""
  }

  const getParamsWarehouseIds = () => {
    if (setWarehouseIds.length >= 1) {
      return `filterByWarehouses=${setWarehouseIds.join()}`
    }
    return ""
  }

  const getStatusParam = () => {
    if (status.length >= 1) {
      return `&transferStatus=${status}`
    }
    return "";
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

  useEffect(() => {
    fetchDataByDate();
  }, [])

  useEffect(() => {
    fetchDataByOption()
  }, [setCustomerIds, setWarehouseIds, status, transDate, numberpage, currentPage])


  return (
    <PageWrapper>
      <TitleBarWrapper>
        <TitleWrapper>
          <PageTitle>Tiến trình vận chuyển mới</PageTitle>
        </TitleWrapper>
        <RangePicker value={dayjs()} onChange={(e) => {
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


      <NewTransportationStatusBarWrapper>
        <StatusBarProcessNew status={status} setStatus={setStatus} />
      </NewTransportationStatusBarWrapper>

      <NewTransportationTable filteredGoods={filteredGoods} transportRoute={transportRoute} />

      <Footer currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPost={totalPost} />

    </PageWrapper>
  )
}

export default NewTransportation
