import { useEffect, useState } from 'react'
import { ProcessWrapper, TableData, TableHead, TableStyle, TableWrapper } from '../tableStyle'
import axios from 'axios';
import { InputGoodsField, ProcessButtonMove, ProcessButtonSave, ProcessButtonWrapper, ProcessSaveButton, SelectOption, TagChildDisplay, TagDisplay } from './createItemTableStyle';
import { Button, DatePicker, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { ButtonFee, ButtonWrapper, InputBlock, InputFormLabel, LoadingButton, LoadingButtonWrapper, PartnerForm, ProcessTitle, TableFee, TableFeeData } from '../../../pages/CreateItem/createItemStyle';
import CreatedNewItems from '../CreatedNewItems/CreatedNewItems';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

const CreateItemsTable = () => {

    const [goodsKG, setGoodsKG] = useState([])
    const [goodsValue, setGoodsValue] = useState("")
    const [processNumber, setProcessNumber] = useState([""]);
    const [transferFrees, setTransferFrees] = useState(0)
    const [transferCost, setTransferCost] = useState(0)
    const [tags, setTag] = useState([])

    const [goodsAllClients, setGoodsAllClients] = useState([]);
    const [goodsWarehouse, setGoodsWarehouse] = useState([])
    const [partnerData, setPartnerData] = useState([])

    const [selectedCustomerItem, setSelectedCustomerItem] = useState({})
    const [selectedWarehouseItem, setSelectedWarehouseItem] = useState("")
    const [selectedProcessItem, setselectedProcessItem] = useState("")

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCancelModalOpen, setCancelModalOpen] = useState(false)
    const [editModalTitle, setEditModalTitle] = useState("")

    const TODAY = dayjs().format("YYYY-MM-DD");
    const [createdItemsProcess, setCreatedItemsProcess] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    const [goodsItem, setGoodsItem] = useState({
        numBigPkg: 1,
        numPkg: 1,
        payType: 1,
    });

    const [currentProcess, setCurrentProcess] = useState({
        fromDate: TODAY,
        item_id: "",
        note: "",
        ordering: null,
        partner_id: "",
        payType: "1",
        price: null,
        pricePer: null,
        selectedTags: []
    })

    const [processes, setProcesses] = useState([{
        fromDate: TODAY,
        item_id: "",
        note: "",
        ordering: null,
        partner_id: "",
        payType: "1",
        price: null,
        pricePer: null,
        selectedTags: []
    },])

    const CLIENT_OPTIONS = goodsAllClients.map(goods => goods);
    const WAREHOUSE_OPTIONS = goodsWarehouse.map(goods => goods);
    const PROCESS_OPTIONS = partnerData.map(partner => partner);
    const TAG_OPTION = tags.map(tag => tag)

    const filteredClientOptions = CLIENT_OPTIONS.filter((o) => selectedCustomerItem.name !== o.name);
    const filteredWarehouseOptions = WAREHOUSE_OPTIONS.filter((o) => !selectedWarehouseItem !== o.name);
    const filteredProcessOptions = PROCESS_OPTIONS.filter((o) => !selectedProcessItem !== o.fullName)
    const filteredTagsOptions = TAG_OPTION.filter(t => !currentProcess.selectedTags.includes(t.name))

    const fetchAllCustomer = async () => {
        const goodsClientsData = await axios.get("/api/khachhangs/all")
        let check = goodsClientsData.data.data;
        setGoodsAllClients(check)
    }

    const fetchAllWareHouse = async () => {
        const wareHouse = await axios.get("/api/chukhos?page=1&limit=1000")
        setGoodsWarehouse(wareHouse.data.data);
    }

    const fecthAllPartner = async () => {
        const partner = await axios.get("/api/doitacs?page=1&numberPage=10&active=true")
        setPartnerData(partner.data.data)
    }

    const getAllTags = async () => {
        const tagData = await axios.get("/api/tags/all?t=1")
        setTag(tagData.data.data)
    }

    useEffect(() => {
        fetchAllCustomer()
        fetchAllWareHouse()
        fecthAllPartner()
        getAllTags()
    }, [])

    const formatNumber = (value) => {
        return value.replace(/[^\d]/g, "")
    }

    const sumArrFees = (arr) => {
        if (arr.length === 0) return 0;
        if (arr.length === 1) return arr[0]
        return arr[0] + sumArrFees(arr.slice(1))
    }

    const getValueKG = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            const newKGs = [...goodsKG]

            newKGs.push(+e.target.value)
            setGoodsKG(newKGs)
            const totalFees = sumArrFees(newKGs)
            setTransferFrees(totalFees)
            setGoodsValue("")
        }

        if (e.key === "Backspace" && e.target.value === "") {
            const newKGs = [...goodsKG]
            newKGs.pop();
            const totalFees = sumArrFees(newKGs)
            setTransferFrees(totalFees);
            setGoodsKG(newKGs);
        }

    }

    const deleteValue = (i) => {
        const newKGs = goodsKG.filter((item, index) => index !== i)
        const totalFees = sumArrFees(newKGs)
        setTransferFrees(totalFees);
        setGoodsKG(newKGs)
    }

    const changeProcessItem = (e, index) => {

        const selected_parter = partnerData.filter(item => item.fullName === e)[0]

        const filterProcess = processes.map((item, i) => {
            if (index !== i) {
                return item
            }
            return {
                ...item,
                partner_id: selected_parter.id,
                pricePer: +selected_parter.pricePerKg,
                selectedTags: [],
                fromDate: TODAY,
                note: "",
            }
        })


        const newProcessNumber = processNumber.slice();
        const filterProcessNum = newProcessNumber.map((item, i) => {
            if (index !== i) {
                return item
            }
            return e
        })

        setProcesses(filterProcess)

        const newTransferCost = sumArrFees(filterProcess.map(item => +item.pricePer))
        setTransferCost(newTransferCost)

        setProcessNumber(filterProcessNum)
    }

    // Not just push into the end of array but insert in right index
    const addProcessNumber = () => {
        const newProcessNumber = processNumber.slice()
        const newProcesses = [...processes]
        newProcesses.push({
            fromDate: TODAY,
            item_id: "",
            note: "",
            ordering: null,
            partner_id: "",
            payType: "1",
            price: null,
            pricePer: null,
            selectedTags: []
        })


        setProcesses(newProcesses)

        newProcessNumber.push("")
        setProcessNumber(newProcessNumber)
    }

    const deleteProcessNumber = (index) => {
        const newProcessNumber = processNumber.filter((item, i) => {
            return i !== index
        })

        const newProcesses = processes.filter((item, i) => {
            return i !== index
        })

        setProcesses(newProcesses)

        const newProcessObjects = partnerData.filter(item => newProcessNumber.includes(item.fullName))
        const newTransferCost = sumArrFees(newProcessObjects.map(item => +item.pricePerKg))
        setTransferCost(newTransferCost)


        setProcessNumber(newProcessNumber)
    }

    const handleChangeLeft = async (index) => {
        console.log(index)
        const newOrder = processNumber.slice();
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
        setProcessNumber(newOrder)
        console.log(processNumber)
    }

    const handleChangeRight = async (index) => {
        const newOrder = processNumber.slice();
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
        setProcessNumber(newOrder)
    }

    const handleCustomerChange = (e) => {
        const selectedCustomer = goodsAllClients.filter(item => item.id === e)[0]
        const goods = { ...goodsItem };
        goods.customer = selectedCustomer;
        goods.customerId = selectedCustomer.id;
        goods.from = selectedCustomer.transferFrom;
        goods.to = selectedCustomer.transferTo;
        goods.price_unit = selectedCustomer.pricePerKg;
        setGoodsItem(goods);
        setSelectedCustomerItem(selectedCustomer)
    }

    const handleWareHouseChange = (e) => {
        const selectedWareHouse = goodsWarehouse.filter(item => item.name === e)
        const goods = { ...goodsItem }
        goods.warehouseId = selectedWareHouse[0].id;
        setGoodsItem(goods)
        setSelectedWarehouseItem(e)
    }

    const showSaveModal = () => {
        setIsSaveModalOpen(true);
    };
    const handleOkSave = () => {
        setIsSaveModalOpen(false);
        produceItem()
    };
    const handleCancelSave = () => {
        setIsSaveModalOpen(false);
    };

    const showEditModal = (string) => {
        setIsEditModalOpen(true);
        setEditModalTitle(string)
    };
    const handleOkEdit = () => {
        setIsEditModalOpen(false);
        const changeProcesses = processes.map(process => {
            if (process.partner_id === currentProcess.partner_id) {
                return currentProcess
            }
            return process
        })

        const newTransferCost = sumArrFees(changeProcesses.map(item => item.pricePer))
        setTransferCost(newTransferCost)


        setProcesses(changeProcesses)
    };
    const handleCancelEdit = () => {
        setCancelModalOpen(false)
        setIsEditModalOpen(false);
    };

    const handleCancelModal = () => {
        setCancelModalOpen(false)
        resetForm()
    }

    const handleCancelCancelModal = () => {
        setCancelModalOpen(false)
    }


    // Handle Change for Goods Code
    const handleCodeChange = (e) => {
        const goods = { ...goodsItem };
        const newName = e.target.value;
        goods.name = newName;
        setGoodsItem(goods);
    }
    // Handle Change for Transfer Date
    const handleDateChange = (e) => {
        const goods = { ...goodsItem }
        const dateFrom = dayjs(e).format('YYYY-MM-DD');

        goods.fromDate = dateFrom;
        setGoodsItem(goods)
    }

    const handleNoteChange = (e) => {
        const goods = { ...goodsItem }
        goods.note = e.target.value
        setGoodsItem(goods)
    }

    const postItem = async (item) => {
        const response = await axios.post("/api/hanghoas", item);
        return response.data;
    }

    const postProcess = async (process) => {
        const response = await axios.post("/api/vanchuyens", process)
        return response.data;
    }

    const produceItem = async () => {

        setIsLoading(true)

        const itemsPost = goodsKG.map(item => {
            const vars = {
                ...goodsItem,
                price: +item * +goodsItem.price_unit,
                weight: item,
            }
            return vars
        }).map(item => {
            return postItem(item)
        })

        const itemsPostData = await Promise.all(itemsPost).then(values => {
            return values.map(element => ({
                ...element,
                processes: processes.map(progessElement => ({
                    ...progessElement,
                    item_id: element.id,
                })),
            }))
        })

        const processesOfItem = itemsPostData.map(item => item.processes)

        let processesItem = []

        processesOfItem.forEach(process => {
            processesItem = processesItem.concat(process)
        })

        const processesPostData = await Promise.all(processesItem.map(process => {
            return postProcess(process)
        })).then(data => data)

        const itemsProcessesPostData = itemsPostData.map(item => {
            return ({
                ...item,
                processes: processesPostData.filter(process => process.item_id === item.id),
            })
        })

        setCreatedItemsProcess(prev => prev.concat(itemsProcessesPostData))
        resetForm()

        setIsLoading(false)
    }

    const resetForm = () => {
        setGoodsKG([])
        setProcessNumber([""])
        setSelectedCustomerItem({})
        setSelectedWarehouseItem("")
        setselectedProcessItem("")
        setGoodsItem({
            numBigPkg: 1,
            numPkg: 1,
            payType: 1,
        })
        setTransferFrees(0)
        setTransferCost(0)
        setProcesses(([{
            fromDate: TODAY,
            item_id: "",
            note: "",
            ordering: null,
            partner_id: "",
            payType: "1",
            price: null,
            pricePer: null,
            selectedTags: []
        },]))
    }

    // When click save UI create item with goodsKG.
    // When click save button call API with each item.

    // Create array hold all response object call api.
    // When call object call transport of it and save it as array in object


    return (
        <TableWrapper>

            {
                isLoading && <LoadingScreen message="Đang xử lí dữ liệu" />
            }


            <Modal title="Tạo mới đơn hàng" width={600} open={isSaveModalOpen} onOk={() => {
                handleOkSave()
                console.log(`first`, createdItemsProcess)
            }} onCancel={handleCancelSave}>
                <p>Bạn có muốn tạo mới đơn hàng không?</p>
            </Modal>

            <Modal width={600} open={isEditModalOpen} onOk={handleOkEdit} onCancel={handleCancelEdit}>
                <PartnerForm>
                    <InputBlock>
                        <InputFormLabel>
                            Đối tác
                        </InputFormLabel>
                        <ProcessTitle>{editModalTitle}</ProcessTitle>
                    </InputBlock>
                    <InputBlock>
                        <InputFormLabel>
                            Cách trả phí
                        </InputFormLabel>
                        <ButtonWrapper>
                            <ButtonFee>Cân nặng</ButtonFee>
                        </ButtonWrapper>
                    </InputBlock>
                    <InputBlock>
                        <InputFormLabel>
                            Tags
                        </InputFormLabel>
                        <SelectOption
                            mode="multiple"
                            placeholder="Search By Tags"
                            value={currentProcess.selectedTags}
                            onChange={(e) => {
                                setCurrentProcess({
                                    ...currentProcess,
                                    selectedTags: e,
                                })
                            }}
                            options={filteredTagsOptions.map((item) => ({
                                key: item.id,
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </InputBlock>
                    <InputBlock>
                        <InputFormLabel>Chi phí </InputFormLabel>
                        <div>
                            <Input value={currentProcess.pricePer} onChange={(e) => {
                                setCurrentProcess({
                                    ...currentProcess,
                                    pricePer: +e.target.value,
                                })
                            }} />
                        </div>
                    </InputBlock>
                    <InputBlock>
                        <InputFormLabel>Ngày nhận</InputFormLabel>
                        <DatePicker value={dayjs(currentProcess.fromDate)} onChange={(e) => {
                            setCurrentProcess({
                                ...currentProcess,
                                fromDate: dayjs(e).format("YYYY-MM-DD"),
                            })
                        }} />
                    </InputBlock>
                    <InputBlock>
                        <InputFormLabel>Ghi chú</InputFormLabel>
                        <TextArea value={currentProcess.note} onChange={(e) => {
                            setCurrentProcess({
                                ...currentProcess,
                                note: e.target.value,
                            })
                        }} />
                    </InputBlock>
                </PartnerForm>
            </Modal>

            <Modal title="Hủy đơn hàng" width={600} open={isCancelModalOpen} onOk={() => {
                handleCancelModal()
            }} onCancel={handleCancelCancelModal} >
                <p>Bạn có muốn hủy đơn hàng không?</p>

            </Modal>

            <TableStyle>

                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Kho</TableHead>
                        <TableHead>Mã hàng Hóa</TableHead>
                        <TableHead>Ngày phát    </TableHead>
                        <TableHead>KG</TableHead>
                        {processNumber.map((item, i) => {
                            return (
                                <TableHead>
                                    <ProcessButtonWrapper>
                                        <span>Tiến Trình {i + 1}</span>
                                        <i className="fa-solid fa-circle-plus fa-rotate-180" onClick={addProcessNumber}></i>
                                        {i > 0 && <i className="fa-solid fa-circle-xmark" onClick={() => deleteProcessNumber(i)}></i>}
                                        {i === 0 && <i className="fa-solid fa-arrow-right" onClick={() => handleChangeRight(i)}></i>}
                                        {i === processNumber.length - 1 && i > 0 && <i className="fa-solid fa-arrow-left" onClick={() => handleChangeLeft(i)}></i>}
                                        {i > 0 && i < processNumber.length - 1 &&
                                            <ProcessButtonMove>
                                                <i className="fa-solid fa-arrow-left" onClick={() => handleChangeLeft(i)}></i>
                                                <i className="fa-solid fa-arrow-right" onClick={() => handleChangeRight(i)}></i>
                                            </ProcessButtonMove>}
                                    </ProcessButtonWrapper>
                                </TableHead>
                            )
                        })
                        }
                        <TableFee>Cước phí</TableFee>
                        <TableFee>Chi phí</TableFee>
                        <TableFee>Còn lại</TableFee>
                        <TableHead>Ghi chú</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <TableData>
                            <SelectOption
                                mode="single"
                                placeholder="Search By Clients"
                                value={selectedCustomerItem.name}
                                onChange={(e) => {
                                    handleCustomerChange(e);
                                }}
                                style={{
                                    width: '100%',
                                }}
                                options={filteredClientOptions.map((item) => ({
                                    key: item.id,
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </TableData>
                        <TableData>
                            <SelectOption
                                mode="single"
                                placeholder="Search By Warehouse"
                                value={selectedWarehouseItem}
                                onChange={(e) => {
                                    handleWareHouseChange(e);
                                }}
                                options={filteredWarehouseOptions.map((item) => ({
                                    key: item.id,
                                    value: item.name,
                                    label: item.name,
                                }))}
                            />
                        </TableData>
                        <TableData>
                            <Input placeholder='Mã HH' value={goodsItem.name} onChange={(e) => { handleCodeChange(e) }} />
                        </TableData>
                        <TableData>
                            <DatePicker defaultValue={dayjs()} onChange={(e) => {
                                handleDateChange(e)
                            }} />
                        </TableData>
                        <TableData>
                            <InputGoodsField>
                                {goodsKG.length > 0 &&
                                    <TagDisplay>
                                        {goodsKG.map((item, index) => {
                                            return (
                                                <TagChildDisplay>
                                                    <span>{item}</span>
                                                    <span onClick={() => {
                                                        deleteValue(index)
                                                    }}><i className="fa-solid fa-rectangle-xmark"></i></span>
                                                </TagChildDisplay>
                                            )
                                        })
                                        }
                                    </TagDisplay>
                                }
                                <Input placeholder='KG' bordered={false} value={goodsValue} onChange={(e) => {
                                    const numberInput = formatNumber(e.target.value)
                                    setGoodsValue(numberInput)
                                }} onKeyDown={(e) => {
                                    getValueKG(e)
                                }} />
                            </InputGoodsField>
                        </TableData>
                        {processNumber.map((item, index) => {
                            return (
                                <TableData>
                                    <ProcessWrapper>
                                        <SelectOption
                                            mode="search"
                                            placeholder="Choose Process"
                                            value={item}
                                            onChange={(e) => {
                                                setselectedProcessItem(e)
                                                changeProcessItem(e, index)
                                                // Change processes
                                            }}
                                            options={filteredProcessOptions.filter(item => !processNumber.includes(item.fullName)).map((item) => ({
                                                key: item.id,
                                                value: item.fullName,
                                                label: item.fullName,
                                            }))}
                                        />
                                        <i className="fa-solid fa-pen" onClick={() => {
                                            showEditModal(item)
                                            // Change current Process
                                            setCurrentProcess(processes[index])
                                        }}></i>
                                    </ProcessWrapper>
                                </TableData>
                            )
                        })}
                        <TableFeeData>{+selectedCustomerItem.pricePerKg * transferFrees || 0}</TableFeeData>
                        <TableFeeData>{transferFrees * transferCost || 0}</TableFeeData>
                        <TableFeeData>{+selectedCustomerItem.pricePerKg * transferFrees - transferFrees * transferCost || 0}</TableFeeData>
                        <TableData><TextArea value={goodsItem.note} onChange={(e) => {
                            handleNoteChange(e)
                        }} /></TableData>
                        <TableData>
                            <ProcessButtonSave>
                                <button>
                                    <i className="fa-solid fa-trash-can" onClick={() => {
                                        setCancelModalOpen(true)
                                    }}></i>
                                </button>
                                <ProcessSaveButton disabled={
                                    processNumber.includes("") ||
                                    selectedWarehouseItem === "" ||
                                    !selectedCustomerItem.name ||
                                    !goodsItem.name ||
                                    goodsKG.length < 1
                                }>
                                    <i className="fa-solid fa-floppy-disk" onClick={() => {
                                        showSaveModal()
                                    }}></i>
                                </ProcessSaveButton>
                            </ProcessButtonSave>
                        </TableData>
                    </tr>
                    <tr>
                        <td>Tổng</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            Tổng đơn: {goodsKG.length}
                            <br />
                            Tổng KG: {goodsKG.length > 1 && goodsKG.reduce((cur, acc) => +cur + +acc) || 0}
                        </td>
                        {processNumber.map(item => {
                            return (
                                <td></td>
                            )
                        })}
                        <TableFeeData>{+selectedCustomerItem.pricePerKg * transferFrees || 0}</TableFeeData>
                        <TableFeeData>{transferFrees * transferCost || 0}</TableFeeData>
                        <TableFeeData>{+selectedCustomerItem.pricePerKg * transferFrees - transferFrees * transferCost || 0}</TableFeeData>
                    </tr>
                </tbody>

            </TableStyle>

            {createdItemsProcess.length > 0 && <CreatedNewItems
                processNumber={processNumber}
                createdItemsProcess={createdItemsProcess}
                setCreatedItemsProcess={setCreatedItemsProcess} />}
        </TableWrapper>
    )
}

export default CreateItemsTable
