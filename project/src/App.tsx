import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Goods from "./pages/Goods/Goods";
import Header from "./layout/Header/Header";
import NewTransportation from "./pages/NewTransportation/NewTransportation";
import Login from "./pages/Login/Login";


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
        path: "",
        element: <Goods />,
      },
      {
        path: "/news",
        element: <NewTransportation />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

export default App;
