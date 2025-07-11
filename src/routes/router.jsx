import { createBrowserRouter} from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/root/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Shop from "../pages/root/Shop";
import Dashboard from "../Layout/Dashbord";
import AddProduct from "../pages/Dashboard/AddProduct";
import Dash from "../pages/Dashboard/Dash";
import UserRoute from "./privet_route/UserRoute";
import BecomeSeller from "../pages/root/BecomeSeller";
import ManageMedicines from "../pages/Dashboard/ManageMedicines";
import EditProduct from "../pages/Dashboard/EditProduct";

const router = createBrowserRouter([
    {
        path : "/",
        Component : Root,
        errorElement: <ErrorPage></ErrorPage>,
        children : [
            {
                index : true,
                element : <Home></Home>
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
            {
                path : "/vendor-registration",
                element : <UserRoute><BecomeSeller></BecomeSeller></UserRoute>
            },

        ]
    },
    {
        path : '/dashboard',
        element : <Dashboard></Dashboard>,
        children : [
            {
                index : true,
                element : <UserRoute><Dash></Dash></UserRoute>
            },
            {
                path : "/dashboard/addproduct",
                element : <AddProduct></AddProduct>
            },
            {
                path :"/dashboard/edit/:id",
                loader : ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <EditProduct />
            },
            {
                path : "/dashboard/manage-medicines",
                element : <ManageMedicines></ManageMedicines>
            },
            
        ]
    }
]);

export default router;