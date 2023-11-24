import { Outlet, useParams } from 'react-router-dom'
import TabNavigation from '../../components/TabNavigation/TabNavigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PageTitle, PageWrapper, TitleBarWrapper } from '../../style/style'
import { LinkParentCustomer, PaymentNumberColor } from './customerItemStyle'
import { useDispatch, useSelector } from 'react-redux'
import { storeSetCustomer } from '../../store/filter-reducer'


const CustomerItem = () => {
  const { id } = useParams()
  const customer = useSelector(state => state.filter.customer)
  const dispatch = useDispatch()

  const getCustomer = async (id) => {
    const data = await axios.get(`/api/khachhangs/${id}`)
    dispatch(storeSetCustomer(data.data))
  }

  const tabNavigationOptionsChild = [
    {
      name: "Danh sách hàng hóa",
      path: `/customers/${id}/items`
    },
  ]

  const tabNavigationOptionsOPtions = [
    {
      name: "Danh sách hàng hóa",
      path: `/customers/${id}/items`,
    },
    {
      name: "Lịch sử ghi nợ",
      path: `/customers/${id}/debt`,
    },
    {
      name: "Lịch sử thanh toán",
      path: `/customers/${id}/payment`,
    },
    {
      name: "Báo cáo",
      path: `/customers/${id}/report`,
    }
  ]

  useEffect(() => {
    getCustomer(id)
  }, [id])

  return (
    <>
      {customer &&
        <PageWrapper>
          <TitleBarWrapper>
            <PageTitle>
              <span>
                {`Khách hàng: ${customer?.name}`}
                {" "}
              </span>
              {!customer.parent &&
                <span>
                  (<PaymentNumberColor color={customer.debt > 0 ? "green" : "red"}>{customer.debt} VNĐ</PaymentNumberColor>)
                </span>}
              {customer.parent &&
                <span style={{
                  fontSize: "18px",
                }}>
                  Thuộc sở hữu của:
                  {" "}
                  <LinkParentCustomer to={`/customers/${customer.parent.id}/items`}>{customer.parent.name}</LinkParentCustomer>
                </span>}
            </PageTitle>
          </TitleBarWrapper>
          <hr />
          <TabNavigation tabNavigationOptions={customer.parent ? tabNavigationOptionsChild : tabNavigationOptionsOPtions} />

          <Outlet />
        </PageWrapper>}
    </>

  )
}

export default CustomerItem
