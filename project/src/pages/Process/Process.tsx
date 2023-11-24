import React, { useEffect, useState } from 'react'
import { PageTitle, PageWrapper, SelectOption, TitleBarWrapper, TitleWrapper } from '../../style/style'
import StatusBar from '../../components/StatusBar/StatusBar'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../layout/Footer/Footer';
import { storeSetGoodsAllClients, storeSetTransDate } from '../../store/filter-reducer';
import axios from 'axios';
import { Checkbox, DatePicker, Input } from 'antd';
import ProcessTable from '../../components/Tables/ProcessTable/ProcessTable';
import dayjs from 'dayjs';
import StatusBarProcessNew from '../../components/StatusBar/StatusBarProcessNew';
import { ProcessStatusBarWrapper } from './processStyle';
import StatusBarProcess from '../../components/StatusBar/StatusBarProcess';
const { RangePicker } = DatePicker;


// Asking about global state stuff
// Asking about the render of process.
// Asking about the state render of process


const Process = () => {

  const [processData, setProcessData] = useState([])
  const [filteredProcess, setFilteredProcess] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0)
  const [tags, setTag] = useState([])
  const [status, setStatus] = useState([])

  const [showdDeliveryDate, setShowDeliveryDate] = useState(false)


  const dispatch = useDispatch();
  const transDate = useSelector(state => state.filter.transDate);
  const goodsAllClients = useSelector((state) => state.filter.goodsAllClients);
  const [goodsPartners, setGoodPartners] = useState([])

  const [selectedCustomerItems, setSelectedCustomerItems] = useState([])
  const [selectedPartnersItems, setSelectedPartnersItems] = useState([])
  const [selectedTagsItems, setSelectedTagsItems] = useState([])

  const [setCustomerIds, setSetCustomerIds] = useState([])
  const [setPartnersIds, setSetPartnersIds] = useState([])
  const [setTagsIds, setSetTagsIds] = useState([])

  const numberpage = useSelector(state => state.filter.numberpage);

  const fetchAllCustomer = async () => {
    const goodsClientsData = await axios.get("/api/khachhangs/all")
    let check = goodsClientsData.data.data;
    dispatch(storeSetGoodsAllClients(check));
  }

  const fetchAllPartners = async () => {
    const partners = await axios.get("/api/doitacs?page=1&numberPage=10&active=true")
    setGoodPartners(partners.data.data);
  }

  const getAllTags = async () => {
    const tagData = await axios.get("api/tags/all?t=1")
    setTag(tagData.data.data)
  }

  const CLIENT_OPTIONS = goodsAllClients.map(good => good);
  const Partners_OPTIONS = goodsPartners.map(goods => goods);
  const TAG_OPTION = tags.map(tag => tag)

  const filteredClientOptions = CLIENT_OPTIONS.filter((o) => !selectedCustomerItems.includes(o.name));
  const filteredPartnersOptions = Partners_OPTIONS.filter((o) => !selectedPartnersItems.includes(o.name));
  const filteredTagsOptions = TAG_OPTION.filter(t => !selectedTagsItems.includes(t.name))

  const getParamsPartnersIds = () => {
    if (setPartnersIds.length >= 1) {
      return `filterByPartners=${setPartnersIds.join()}`
    }
    return ""
  }

  const getDeliveryDate = () => {
    if (showdDeliveryDate) {
      return `&byDeliveryDate=1`
    }
    return ""
  }

  const getParamsCustomerId = () => {
    if (setCustomerIds.length >= 1) {
      return `filterByCustomers=${setCustomerIds.join()}`
    }
    return ""
  }

  const getParamsTagsId = () => {
    if (setTagsIds.length >= 1) {
      return `&filterByTags=${setTagsIds.join()}`
    }
    return ""
  }

  const getStatus = () => {
    if (status.length > 0) {
      return `&status=${status.join()}`
    }
    return ""
  }

  const getProcessByDate = async () => {
    const processData = await axios.get(`api/vanchuyens?page=1&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}%2023:59:59&numberpage=${numberpage}`)
    const count = processData.data.count;
    setProcessData(processData.data)
    setFilteredProcess(processData.data)
    setTotalPost(count);

    setCurrentPage(1);
  }

  useEffect(() => {
    fetchAllCustomer()
    fetchAllPartners()
    getAllTags()
  }, [])

  const onChangeFilterCustomer = (e) => {
    const goodsByCustomer = CLIENT_OPTIONS.filter(customer => e.includes(customer.name))

    const customerIDs = goodsByCustomer.map(customer => customer.id);

    const setCustomerIds = customerIDs.filter((id, index) => {
      return customerIDs.indexOf(id) === index;
    })
    setSetCustomerIds(setCustomerIds)
    setCurrentPage(1);
  }

  const onChangeFilterPartners = (e) => {
    const goodsByPartners = Partners_OPTIONS.filter(goods => e.includes(goods.name))

    const PartnersIDs = goodsByPartners.map(goods => goods.id)

    const setPartnersIds = PartnersIDs.filter((id, index) => {
      return PartnersIDs.indexOf(id) === index
    })
    setSetPartnersIds(setPartnersIds);
    setCurrentPage(1);
  }

  const onChangeFilterTags = (e) => {
    const goodsByTags = TAG_OPTION.filter(goods => e.includes(goods.name))

    const TagsIDs = goodsByTags.map(goods => goods.id)

    const setTagsIds = TagsIDs.filter((id, index) => {
      return TagsIDs.indexOf(id) === index
    })
    setSetTagsIds(setTagsIds);
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

  const getProcessByOption = async () => {
    const response = await axios.get(`/api/vanchuyens?page=${currentPage}&numberpage=${numberpage}${getParamsTagsId()}&${getParamsCustomerId()}&${getParamsPartnersIds()}${getDeliveryDate()}&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}${getStatus()}`)
    const count = response.data.count;
    setTotalPost(count);

    setFilteredProcess(response.data.data);
  }

  useEffect(() => {
    getProcessByOption()
  }, [numberpage, transDate, setCustomerIds, setPartnersIds, setTagsIds, currentPage, showdDeliveryDate, status])

  return (
    <PageWrapper>
      <TitleBarWrapper>
        <TitleWrapper style={{
          width: "40%"
        }}>
          <PageTitle>
            Tiến trình vận chuyển
          </PageTitle>
        </TitleWrapper>
        <RangePicker
          style={{
            flexBasis: '20%',
            marginRight: "1rem"
          }}
          defaultValue={
            [dayjs().startOf("M"), dayjs()]
          } onChange={(e) => {
            dateChange(e)
          }} />
        <SelectOption
          mode="multiple"
          placeholder="Search By Clients"
          value={selectedCustomerItems}
          onChange={(e) => {
            setSelectedCustomerItems(e)
            onChangeFilterCustomer(e)
          }}

          style={{
            flexBasis: '13%',
          }}
          options={filteredClientOptions.map((item) => ({
            key: item.id,
            value: item.name,
            label: item.name,
          }))}
        />
        <SelectOption
          mode="multiple"
          style={{
            flexBasis: '13%',
          }}
          placeholder="Search By Partners"
          value={selectedPartnersItems}
          onChange={(e) => {
            setSelectedPartnersItems(e)
            onChangeFilterPartners(e)
          }}
          options={filteredPartnersOptions.map((item) => ({
            key: item.id,
            value: item.name,
            label: item.name,
          }))}
        />
        <SelectOption
          mode="multiple"
          placeholder="Search By Tags"
          value={selectedTagsItems}
          style={{
            flexBasis: '13%',
          }}
          onChange={(e) => {
            setSelectedTagsItems(e)
            onChangeFilterTags(e)
          }}
          options={filteredTagsOptions.map((item) => ({
            key: item.id,
            value: item.name,
            label: item.name,
          }))}
        />
      </TitleBarWrapper>


      <ProcessStatusBarWrapper>
        <div>
          <StatusBarProcess status={status} setStatus={setStatus} />
        </div>
        <div>
          <Checkbox onClick={() => { setShowDeliveryDate(prev => !prev) }} />
          <span> Ngày phát</span>
        </div>
      </ProcessStatusBarWrapper>

      <ProcessTable getProcessByOption={getProcessByOption} filteredTagsOptions={filteredTagsOptions} filteredProcess={filteredProcess} currentPage={currentPage} />

      <Footer currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPost={totalPost} />

    </PageWrapper>
  )
}

export default Process
