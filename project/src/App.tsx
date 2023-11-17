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

const headerOption = [
  { name: "Hàng hóa", link: "/goods" },
  { name: "Tiến trình vận chuyển mới", link: "/process-news" },
  { name: "Tiến trình vận chuyển", link: "/process" },
  { name: "Đối tác", link: "/partners" },
  { name: "Khách hàng", link: "/customers" },
  { name: "Kho", link: "/warehouses" },
  { name: "Setting", link: "setting" },
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
        path: "/customers/:id/items",
        element: <CustomerItem />
      },
      {
        path: "/warehouses",
        element: <Warehouses />
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
      <RouterProvider router={router}>
        <Header headerOption={headerOption} />
      </RouterProvider>
    </Provider>

  );
}

export default App;
