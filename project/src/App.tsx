import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Goods from "./pages/Goods/Goods";
import Header from "./layout/Header/Header";
import NewTransportation from "./pages/NewTransportation/NewTransportation";
import Login from "./pages/Login/Login";
import { Provider } from "react-redux";
import { store } from "./rootStore";
import Partners from "./pages/Partners/Partners";
import Process from "./pages/Process/Process";
import Customers from "./pages/Customers/Customers";
import Warehouses from "./pages/Warehouses/Warehouses";
import CreateItem from "./pages/CreateItem/CreateItem";
import GoodsItem from "./pages/GoodsItem/GoodsItem";
import CustomerItem from "./pages/CustomerItem/CustomerItem";
import PartnerItem from "./pages/PartnerItem/PartnerItem";
import PartnerItemProcess from "./pages/PartnerItemProcess/PartnerItemProcesss";
import PartnerPayment from "./pages/PartnerPayment/PartnerPayment";
import CustomerItems from "./pages/CustomerItems/CustomerItems";
import CustomerItemDebt from "./pages/CustomerItemDebt/CustomerItemDebt";
import CustomerPayment from "./pages/CustomerPayment/CustomerPayment";
import CustomerReport from "./pages/CustomerReport/CustomerReport";
import WarehouseItem from "./pages/WarehouseItem/WarehouseItem";
import WarehouseItems from "./pages/WarehouseItems/WarehouseItems";
import WarehouseDebt from "./pages/WarehouseDebt/WarehouseDebt";
import WarehousePayment from "./pages/WarehousePayment/WarehousePayment";
import SettingExchange from "./pages/SettingExchangeRate/SettingExchange";
import UserInfo from "./pages/UserInfo/UserInfo";

const headerOption = [
  { name: "Hàng hóa", link: "/goods" },
  { name: "Tiến trình vận chuyển mới", link: "/process-news" },
  { name: "Tiến trình vận chuyển", link: "/process" },
  { name: "Đối tác", link: "/partners" },
  { name: "Khách hàng", link: "/customers" },
  { name: "Kho", link: "/warehouses" },
  { name: "Setting", link: "/setting" },
];

const RootRouter = () => {
  return (
    <>
      <Header headerOption={headerOption} />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouter />,
    children: [
      {
        path: "/goods",
        element: <Goods />,
      },
      {
        path: "/goods/:id",
        element: <GoodsItem />
      },
      {
        path: "/goods/create-items",
        element: <CreateItem />
      },
      {
        path: "/process-news",
        element: <NewTransportation />,
      },
      {
        path: "/process",
        element: <Process />
      },
      {
        path: "/partners",
        element: <Partners />
      },
      {
        path: "/partners/:id",
        element: <PartnerItem />,
        children: [
          {
            path: "/partners/:id/progress",
            element: <PartnerItemProcess />
          },
          {
            path: "/partners/:id/payment",
            element: <PartnerPayment />
          },
        ]
      },
      {
        path: "/customers",
        element: <Customers />
      },
      {
        path: "/customers/:id",
        element: <CustomerItem />,
        children: [
          {
            path: "/customers/:id/items",
            element: <CustomerItems />
          },
          {
            path: "/customers/:id/payment",
            element: <CustomerPayment />
          },
          {
            path: "/customers/:id/debt",
            element: <CustomerItemDebt />
          },
          {
            path: "/customers/:id/report",
            element: <CustomerReport />
          },
        ]
      },
      {
        path: "/warehouses",
        element: <Warehouses />,
      },
      {
        path: "/warehouses/:id",
        element: <WarehouseItem />,
        children: [
          {
            path: "/warehouses/:id/items",
            element: <WarehouseItems />
          },
          {
            path: "/warehouses/:id/payment",
            element: <WarehousePayment />
          },
          {
            path: "/warehouses/:id/debt",
            element: <WarehouseDebt />
          },
        ]
      },
      {
        path: "/setting",
        element: <SettingExchange />,
      },
      {
        path: "/user/info-user",
        element: <UserInfo />
      }

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  );
}

export default App;
