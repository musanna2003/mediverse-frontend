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
import Profile from "../pages/Profile";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import SellerList from "../pages/Dashboard/SellerList";
import SellerReq from "../pages/Dashboard/SellerReq";
import CartPage from "../pages/root/CartPage";
import CheckoutPage from "../pages/root/CheckoutPage";
import InvoicePage from "../pages/root/InvoicePage";
import AdminPayments from "../pages/Dashboard/AdminPayments";
import AdminSalesReport from "../pages/Dashboard/AdminSalesReport";
import SellerPaymentHistory from "../pages/Dashboard/SellerPaymentHistory";
import UserPaymentHistory from "../pages/Dashboard/UserPaymentHistory";

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
                path : "/profile",
                Component : Profile,
            },
            {
                path : "/cart",
                Component : CartPage,
            },
            {
                path : "/vendor-registration",
                element : <UserRoute><BecomeSeller></BecomeSeller></UserRoute>
            },
            {
                path : "/checkout",
                element : <CheckoutPage></CheckoutPage>
            },
            {
                path : "/invoice",
                element : <InvoicePage></InvoicePage>
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
            {
                path : "/dashboard/manage-users",
                element : <ManageUsers></ManageUsers>
            },
            {
                path : "/dashboard/seller-list",
                element : <SellerList></SellerList>
            },
            {
                path : "/dashboard/seller-req",
                element : <SellerReq></SellerReq>
            },
            {
                path : "/dashboard/payment-management",
                element : <AdminPayments></AdminPayments>
            },
            {
                path : "/dashboard/sales-report",
                element : <AdminSalesReport></AdminSalesReport>
            },
            {
                path : "/dashboard/seller-payment",
                element : <SellerPaymentHistory></SellerPaymentHistory>
            },
            {
                path : "/dashboard/user-payments",
                element : <UserPaymentHistory></UserPaymentHistory>
            },
            
        ]
    }
]);

export default router;