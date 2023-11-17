import axios from 'axios'
import { MenuTransferWrapper, ClickArrow, TableWrapper, TableStyle } from '../tableStyle'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { DropdownCheckboxAction, DropdownWrapper, FirstTH, IndexBox, IndexButtonWrapper, TableRowItem } from './goodTableStyle'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'


const GoodsTable = ({ colTitle,
    fetchColData, filteredGoods,
    currentPage, setIsLoading,
    fetchDataByOption,
    status
}) => {

    const [dropDown, setDropDown] = useState(false)
    const [selectedGoodsId, setSelectedGoodsId] = useState([])

    const numberpage = useSelector(state => state.filter.numberpage)

    const PostData = async (url: string, body: []) => {
        const response = await axios.post(url, body)
        return (response.config.data)
    }

    const handleChangeLeft = async (index) => {
        setIsLoading(true)
        const newOrder = colTitle.filter(item => item.selected).slice();
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
        await PostData("/api/user/item-fields", newOrder);
        await fetchColData();
        setIsLoading(false)
    }

    const handleChangeRight = async (index) => {
        setIsLoading(true)
        const newOrder = colTitle.filter(item => item.selected).slice();
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
        await PostData("/api/user/item-fields", newOrder);
        await fetchColData();
        setIsLoading(false)
    }

    const handleDeleteGoods = async (id = "") => {
        setIsLoading(true)
        if (selectedGoodsId.length === 0) {
            await axios.post("/api/hanghoas/delete", { id: [id] })
        } else {
            await axios.post("/api/hanghoas/delete", { id: selectedGoodsId })
        }
        fetchDataByOption()
        setSelectedGoodsId([])
        setIsLoading(false)
    }

    const handleStopGoods = async (id = "") => {
        setIsLoading(true)
        if (selectedGoodsId.length === 0) {
            await axios.post(`/api/hanghoas/${id}/-3`)
        } else {
            await axios.post(`/api/hanghoas/cancel/process`, selectedGoodsId)
        }
        fetchDataByOption()
        setSelectedGoodsId([])
        setIsLoading(false)
    }

    const handleCheckBox = (id: string) => {
        const newSelectedGoodsId = [...selectedGoodsId]
        if (selectedGoodsId.includes(id)) {
            setSelectedGoodsId(newSelectedGoodsId.filter(i => i !== id))
        } else {
            newSelectedGoodsId.push(id)
            setSelectedGoodsId(newSelectedGoodsId)
        }
    }

    const selectedAll = () => {
        if (selectedGoodsId.length < filteredGoods.length) {
            const allGoodsIds = filteredGoods.map(goods => goods.id)
            setSelectedGoodsId(allGoodsIds)
        }
        if (selectedGoodsId.length === filteredGoods.length) {
            setSelectedGoodsId([])
        }
    }

    // Remember when you are scratching and when you are polishing

    return (
        <TableWrapper onClick={() => {
            if (dropDown) {
                setDropDown(false)
            }
        }}>
            <TableStyle>
                <thead>
                    <tr>
                        {status.length > 0 && <th>
                            <IndexBox>
                                <input type="checkbox" id={`${numberpage}`} onChange={() => {
                                    selectedAll()
                                }} checked={selectedGoodsId.length === filteredGoods.length} />
                                {selectedGoodsId.length > 0 && <DropdownWrapper onClick={() => {
                                    setDropDown(prev => !prev)
                                }}>
                                    <i className="fa-solid fa-caret-down"></i>
                                    {dropDown && <DropdownCheckboxAction>
                                        <div onClick={() => {
                                            handleStopGoods()
                                        }}>Hủy đơn hàng</div>
                                        <div onClick={() => {
                                            handleDeleteGoods()
                                        }}>Xóa đơn hàng</div>
                                    </DropdownCheckboxAction>}
                                </DropdownWrapper>}
                            </IndexBox>
                        </th>}
                        <FirstTH>
                            <span>STT</span>
                        </FirstTH>
                        {colTitle.filter(item => item.selected).map((item, index) => {
                            return (
                                <MenuTransferWrapper key={item.id}>{item.label}
                                    <div>
                                        {index !== 0 && <ClickArrow onClick={() => handleChangeLeft(index)}><i className="fa-solid fa-arrow-left"></i></ClickArrow>}
                                        {index !== colTitle.filter(item => item.selected).length - 1 && <ClickArrow onClick={() => handleChangeRight(index)}><i className="fa-solid fa-arrow-right"></i></ClickArrow>}
                                    </div>
                                </MenuTransferWrapper>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filteredGoods?.map((item, index) => {
                        return (
                            <TableRowItem key={item.id}>
                                {status.length > 0 && <td>
                                    <IndexBox>
                                        <input type="checkbox" value={item.id} onChange={(e) => {
                                            handleCheckBox(e.target.value)
                                        }} checked={selectedGoodsId.includes(item.id)} />
                                    </IndexBox>
                                </td>}
                                <td>
                                    <div>
                                        {+numberpage * (currentPage - 1) + index + 1}
                                    </div>
                                    <IndexButtonWrapper>
                                        <i className="fa-solid fa-trash-can"
                                            onClick={() => {
                                                handleDeleteGoods(item.id)
                                            }}
                                        ></i>
                                        {item.status !== "-3" && <i className="fa-solid fa-ban"
                                            onClick={() => {
                                                handleStopGoods(item.id)
                                            }}></i>}
                                    </IndexButtonWrapper>
                                </td>
                                {colTitle.filter(item => item.selected).map((colElement) => {
                                    // let itemLabel: string = JSON.stringify(item[`${colElement.name}`]?.name) || item[`${colElement.name}`]  || "";
                                    let itemLabel;

                                    if (JSON.stringify(item[`${colElement.name}`]?.name)) {
                                        itemLabel = item[`${colElement.name}`]?.name;
                                    } else if (item[`${colElement.name}`]) {
                                        itemLabel = item[`${colElement.name}`];
                                    } else {
                                        itemLabel = "";
                                    }

                                    let itemData = < td key={colElement.id} > {itemLabel}</td>

                                    if (`${colElement.name}` === "customer") {
                                        itemData = < td key={colElement.id} ><Link to={`/customers/${item.customer.id}/items`}>{itemLabel}</Link></td>
                                    }

                                    if (`${colElement.name}` === "name") {
                                        itemData = < td key={colElement.id} ><Link to={`/goods/${item.id}`}>{itemLabel}</Link></td>
                                    }

                                    if (`${colElement.name}` === "partner") {
                                        itemData = < td key={colElement.id} ><Link to={`/partners/${item.partner.id}`}>{itemLabel}</Link></td>
                                    }

                                    if (`${colElement.name}` === "warehouse") {
                                        itemData = < td key={colElement.id} ><Link to={`/warehouses/${item.warehouse.id}`}>{itemLabel}</Link></td>
                                    }

                                    if (`${colElement.name}` === "startDate") {
                                        itemData = <td>{dayjs(item[`fromDate`]).format("YYYY-MM-DD")}</td>
                                    }


                                    return (
                                        itemData
                                    )
                                })}
                            </TableRowItem>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper >
    )
}

export default GoodsTable
