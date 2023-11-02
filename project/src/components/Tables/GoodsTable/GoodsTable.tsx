import axios from 'axios'
import { MenuTransferWrapper, ClickArrow, TableWrapper, TableStyle } from '../tableStyle'
import { useSelector } from 'react-redux'


const GoodsTable = ({ colTitle, fetchColData, filteredGoods, currentPage }) => {

    const numberpage = useSelector(state => state.filter.numberpage)

    const PostData = async (url: string, body: []) => {
        const response = await axios.post(url, body)
        return (response.config.data)
    }

    const handleChangeLeft = async (index) => {
        const newOrder = colTitle.filter(item => item.selected).slice();
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
        await PostData("/api/user/item-fields", newOrder);
        await fetchColData();
    }

    const handleChangeRight = async (index) => {
        const newOrder = colTitle.filter(item => item.selected).slice();
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
        await PostData("/api/user/item-fields", newOrder);
        await fetchColData();
    }

    return (

        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <th>STT</th>
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
                            <tr key={item.id}>
                                <td>{+numberpage * (currentPage - 1) + index + 1}</td>
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
                                    return (
                                        <td key={colElement.id}>{itemLabel || ""}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default GoodsTable
