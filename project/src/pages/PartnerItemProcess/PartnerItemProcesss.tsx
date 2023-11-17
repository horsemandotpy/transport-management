import React, { useEffect, useState } from 'react'
import { PageTitle, PageWrapper, SelectOption, TitleBarWrapper, TitleWrapper } from '../../style/style'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../layout/Footer/Footer';
import { storeSetGoodsAllClients, storeSetTransDate } from '../../store/filter-reducer';
import axios from 'axios';
import { Checkbox, DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
import StatusBarProcess from '../../components/StatusBar/StatusBarProcess';
import { ProcessStatusBarWrapper } from './partnerItemProcessStyle';
import { useParams } from 'react-router-dom';
import PartnerItemProcessTable from '../../components/Tables/PartnerItemProcessTable/PartnerItemProcessTable';
const { RangePicker } = DatePicker;


// Asking about global state stuff
// Asking about the render of process.
// Asking about the state render of process


const PartnerItemProcess = () => {
    const { id } = useParams();

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

    const [selectedCustomerItems, setSelectedCustomerItems] = useState([])
    const [selectedTagsItems, setSelectedTagsItems] = useState([])

    const [setCustomerIds, setSetCustomerIds] = useState([])
    const [setTagsIds, setSetTagsIds] = useState([])

    const numberpage = useSelector(state => state.filter.numberpage);

    const fetchAllCustomer = async () => {
        const goodsClientsData = await axios.get("/api/khachhangs/all")
        let check = goodsClientsData.data.data;
        dispatch(storeSetGoodsAllClients(check));
    }


    const getAllTags = async () => {
        const tagData = await axios.get("/api/tags/all?t=1")
        setTag(tagData.data.data)
    }

    const CLIENT_OPTIONS = goodsAllClients.map(good => good);
    const TAG_OPTION = tags.map(tag => tag)

    const filteredClientOptions = CLIENT_OPTIONS.filter((o) => !selectedCustomerItems.includes(o.name));
    const filteredTagsOptions = TAG_OPTION.filter(t => !selectedTagsItems.includes(t.name))


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
        const response = await axios.get(`/api/vanchuyens?page=${currentPage}&numberpage=${numberpage}${getParamsTagsId()}&${getParamsCustomerId()}&${getDeliveryDate()}&fromDate=${transDate.fromDate}&toDate=${transDate.toDate}${getStatus()}&partner_id=${id}`)
        const count = response.data.count;
        setTotalPost(count);

        setFilteredProcess(response.data.data);
    }

    useEffect(() => {
        getProcessByOption()
    }, [numberpage, transDate, setCustomerIds, setTagsIds, currentPage, showdDeliveryDate, status])

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
                <RangePicker defaultValue={
                    [dayjs(), dayjs()]
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
                    placeholder="Search By Tags"
                    value={selectedTagsItems}
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

            <PartnerItemProcessTable getProcessByOption={getProcessByOption} tags={tags} filteredProcess={filteredProcess} currentPage={currentPage} />

            <Footer currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPost={totalPost} />

        </PageWrapper>
    )
}

export default PartnerItemProcess
