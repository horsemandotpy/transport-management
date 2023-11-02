import { useState } from 'react'
import { MenuButtonWrapper, MenuFilter, MenuWrapper } from './columnFilterStyle'
import axios from 'axios'

const ColumnFilter = ({ allCol, setColTitle, setAllCol }) => {
    const [dropDown, setDropDown] = useState(false)

    const fetchAllFilterCol = async () => {
        await axios.post("/api/user/item-fields", allCol);
        const data = await axios.get("/api/user/item-fields");
        const colData = data.data
        setAllCol(colData);
    }

    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }

    const handleChangeFilter = (e) => {
        const filterChange = allCol.filter(col => filterOption(e.target.value, col))

        setAllCol(filterChange)

        if (e.target.value === "") {
            const fetchCol = async () => {
                const data = await axios.get("/api/user/item-fields");
                const colData = data.data;
                setAllCol(colData);
            }
            // Problem in delete state.
            fetchCol();
            console.log(allCol)
        }
    }

    return (
        <> <span
            onClick={() => {
                setDropDown(prev => !prev)

            }}
        >Cột dữ liệu</span>
            {dropDown && <MenuWrapper>
                <input onChange={(e) => { handleChangeFilter(e) }} />
                <MenuFilter>
                    {allCol?.map((column) => {
                        return (
                            <label key={column.name}>
                                <input type="checkbox" onChange={(e) => {

                                    const newCol = allCol.map(col => {
                                        if (col.id === parseInt(e.target.id)) {
                                            return {
                                                ...col,
                                                selected: e.target.checked
                                            }
                                        }
                                        return col;
                                    })
                                    setAllCol(newCol);


                                }} key={column.id} name={column.name} id={column.id} defaultChecked={column.selected ? true : false} />
                                {column.label}
                            </label>)
                    })}
                </MenuFilter>
                <MenuButtonWrapper>
                    <button onClick={() => { setDropDown(prev => !prev) }} >Cancel</button>
                    <button className='save' onClick={() => {
                        setColTitle(allCol)
                        fetchAllFilterCol()
                        setDropDown(prev => !prev)
                    }}>Save</button>
                </MenuButtonWrapper>
            </MenuWrapper>}</>
    )
}

export default ColumnFilter
