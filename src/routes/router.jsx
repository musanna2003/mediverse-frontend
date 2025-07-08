import { createBrowserRouter} from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Shop from "../pages/Shop";
import SellerDashboard from "../Layout/Dashbord";
import Dashboard from "../Layout/Dashbord";
import AddProduct from "../pages/AddProduct";
import Dash from "../pages/Dash";

const router = createBrowserRouter([
    {
        path : "/",
        Component : Root,
        errorElement: <ErrorPage></ErrorPage>,
        children : [
            {
                index : true,
                Component : Home,
            },
            {
                path : "/shop",
                Component : Shop,
            },
            {
                path : "/login",
                Component : Login
            },
            {
                path : "/register",
                Component : Register,
            },

        ]
    },
    {
        path : '/dashboard',
        element : <Dashboard></Dashboard>,
        children : [
            {
                index : true,
                element : <Dash></Dash>
            },
            {
                path : "/dashboard/addproduct",
                element : <AddProduct></AddProduct>
            },
            {

            }
        ]
    }
]);

export default router;