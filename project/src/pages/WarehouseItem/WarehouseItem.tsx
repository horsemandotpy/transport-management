import { Outlet, useParams } from 'react-router-dom'
import { PageTitle, PageWrapper, TitleBarWrapper, TitleWrapper } from '../../style/style'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { storeSetWarehouse } from '../../store/filter-reducer'
import TabNavigation from '../../components/TabNavigation/TabNavigation'

const WarehouseItem = () => {
    const { id } = useParams()
    const warehouse = useSelector(state => state.filter.warehouse)
    const dispatch = useDispatch()

    const getWarehouse = async (id) => {
        const data = await axios.get(`/api/chukhos/${id}`)
        dispatch(storeSetWarehouse(data.data))
    }

    const warehouseTabOptions = [
        {
            path: `items`,
            name: "Danh sách hàng hóa",
        },
        {
            path: `debt`,
            name: "Lịch sử ghi nợ",
        },
        {
            path: `payment`,
            name: "Lịch sử thanh toán",
        },

    ]

    useEffect(() => {
        getWarehouse(id)
    }, [])

    return (
        <PageWrapper>
            <TitleBarWrapper>
                <TitleWrapper>
                    <PageTitle>
                        Chủ kho: {warehouse.name} <span>({warehouse.debt} NDT)</span>
                    </PageTitle>
                </TitleWrapper>
            </TitleBarWrapper>
            <TabNavigation tabNavigationOptions={warehouseTabOptions} />
            <Outlet />
        </PageWrapper>
    )
}

export default WarehouseItem
