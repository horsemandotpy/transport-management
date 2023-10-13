import { LoginTable, LoginTableWrapper, MenuTransferWrapper, ClickArrow } from './goodTableStyle'


const GoodsTable = ({ colTitle, fetchColData, filteredGoods }) => {


    const PostData = async (url: string, body: []) => {
        const response = await axios.post(url, body)
        return (response.config.data)
    }

    const handleChangeLeft = async (index) => {
        const newOrder = colTitle.slice();
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
        await PostData("/api/user/item-fields", newOrder);
        await fetchColData();
    }

    const handleChangeRight = async (index) => {
        const newOrder = colTitle.slice();
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
        await PostData("/api/user/item-fields", newOrder);
        await fetchColData();
    }

    return (

        <LoginTableWrapper>
            <LoginTable>
                <thead>
                    <tr>
                        <th>STT</th>
                        {colTitle.map((item, index) => {
                            return (
                                <MenuTransferWrapper key={item.id}>{item.colName}
                                    <div>
                                        {index !== 0 && <ClickArrow onClick={() => handleChangeLeft(index)}><i className="fa-solid fa-arrow-left"></i></ClickArrow>}
                                        {index !== colTitle.length - 1 && <ClickArrow onClick={() => handleChangeRight(index)}><i className="fa-solid fa-arrow-right"></i></ClickArrow>}
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
                                <td>{index}</td>
                                {colTitle.map((colElement) => {
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
            </LoginTable>
        </LoginTableWrapper>
    )
}

export default GoodsTable
