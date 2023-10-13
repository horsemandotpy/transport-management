import React, { useState, useEffect } from 'react'
import { GoodWrapper, SelectClient, TitleBarWrapper, TitleWrapper } from './goodsStyle'
import { PageTitle } from '../../style/style'
import { DatePicker, Select } from 'antd';
import GoodsTable from '../../components/Tables/GoodsTable/GoodsTable';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
import axios from 'axios'


const Goods = () => {
  const [placement, setPlacement] = useState('topLeft');
  const [transDate, setTransDate] = useState({
    fromDate: "2023-10-11",
    toDate: "2023-10-12"
  })
  const [colTitle, setColTitle] = useState([])
  const [goodsData, setGoodsData] = useState([])
  const [goodsAllClients, setGoodsAllClients] = useState([])
  const [goodsWarehouse, setGoodsWareHouse] = useState([])

  const [selectedCustomerItems, setSelectedCustomerItems] = useState([]);
  const [selectedWarehouseItems, setSelectedWarehouseItems] = useState([]);

  const [filteredGoods, setFilteredGoods] = useState(goodsData)
  const [setCustomerIds, setSetCustomerIds] = useState([]);
  const [setWarehouseIds, setSetWarehouseIds] = useState([])

  const fetchAllCustomer = async () => {
    const goodsClientsData = await axios.get("/api/khachhangs/all")
    let check = goodsClientsData.data.data;
    setGoodsAllClients(check);
  }

  const fetchAllWareHouse = async () => {
    const wareHouse = await axios.get("/api/chukhos?page=1&limit=1000")
    setGoodsWareHouse(wareHouse.data.data);
  }

  const CLIENT_OPTIONS = goodsAllClients.map(good => good);
  const WAREHOUSE_OPTIONS = goodsWarehouse.map(goods => goods)

  const filteredClientOptions = CLIENT_OPTIONS.filter((o) => !selectedCustomerItems.includes(o.name));
  const filteredWarehouseOptions = WAREHOUSE_OPTIONS.filter((o) => !selectedWarehouseItems.includes(o.name));

  const fetchColData = async () => {
    const ColData = await axios.get("/api/user/item-fields")
    setColTitle(ColData.data)
  }

  const fetchDataByDate = async () => {
    const goodsDataByDate = await axios.get(`api/hanghoas?page=1&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=20`)
    setGoodsData(goodsDataByDate.data.data);
    setFilteredGoods(goodsDataByDate.data.data);
  }
  const getParamsCustomerId = () => {
    if (setWarehouseIds.length >= 1) {
      return `filterByWarehouses=${setWarehouseIds.join()}`
    }
    return ""
  }

  const getParamsWarehouseIds = () => {
    if (setCustomerIds.length >= 1) {
      return `filterByCustomers=${setCustomerIds.join()}`
    }
    return ""
  }

  const fetchDataByOption = async () => {
    const goodsDataByCustomer = await axios.get(`api/hanghoas?page=1&${getParamsCustomerId()}&${getParamsWarehouseIds()}&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=20`)
    const goodsDataCustomer = goodsDataByCustomer.data.data
    setFilteredGoods(goodsDataCustomer);
  }

  const onChangeFilterCustomer = (e) => {
    const goodsByCustomer = CLIENT_OPTIONS.filter(customer => e.includes(customer.name))

    const customerIDs = goodsByCustomer.map(customer => customer.id);

    const setCustomerIds = customerIDs.filter((id, index) => {
      return customerIDs.indexOf(id) === index;
    })
    setSetCustomerIds(setCustomerIds);
  }

  const onChangeFilterWarehouse = (e) => {
    const goodsByWareHouse = WAREHOUSE_OPTIONS.filter(goods => e.includes(goods.name))

    const warehouseIDs = goodsByWareHouse.map(goods => goods.id)

    const setWarehouseIds = warehouseIDs.filter((id, index) => {
      return warehouseIDs.indexOf(id) === index
    })
    setSetWarehouseIds(setWarehouseIds);
  }

  const dateChange = (e: []) => {
    const date = {
      fromDate: dayjs(e[0]).format("YYYY-MM-DD"),
      toDate: dayjs(e[1]).format("YYYY-MM-DD"),
    }
    setTransDate(date);
  };

  useEffect(() => {
    fetchAllCustomer();
    fetchAllWareHouse();
    fetchColData();
    fetchDataByDate();
  }, [])

  useEffect(() => {
    fetchDataByOption();
  }, [setCustomerIds, setWarehouseIds, transDate])


  return (
    <GoodWrapper>
      <TitleBarWrapper>
        <TitleWrapper>
          <PageTitle>Danh sach hang hoa</PageTitle>
        </TitleWrapper>
        <RangePicker placement={placement} onChange={(e) => {
          dateChange(e)
        }} />
        <SelectClient
          mode="multiple"
          placeholder="Search By Clients"
          value={selectedCustomerItems}
          onChange={(e) => {
            setSelectedCustomerItems(e);
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
        <SelectClient
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

      <GoodsTable transDate={transDate}
        colTitle={colTitle}
        goodsData={goodsData}
        setColTitle={setColTitle}
        setGoodsData={setGoodsData}
        fetchColData={fetchColData}
        filteredGoods={filteredGoods}

      />

    </GoodWrapper>
  )
}

export default Goods
