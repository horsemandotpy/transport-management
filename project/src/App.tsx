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
import { useEffect } from "react";

const RootRouter = () => {
  return (
    <>
      <Header />
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
        path: "/customers",
        element: <Customers />
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
        <Header />
      </RouterProvider>
    </Provider>

  );
}

export default App;
