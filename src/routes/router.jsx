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
import OfferAdvertiseManager from "../pages/Dashboard/OfferAdvertiseManager";
import ManageBannerAds from "../pages/Dashboard/ManageBannerAds";
import ManageCategories from "../pages/Dashboard/ManageCategories";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import SellerDashboard from "../pages/Dashboard/SellerDashboard";
import RoleBasedRoute from "./privet_route/RoleBasedRoute";
import About from "../pages/root/About";

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
                path : "/about",
                element : <About></About>,
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
                element : <UserRoute><Profile/></UserRoute>
            },
            {
                path : "/cart",
                element : <UserRoute><CartPage/></UserRoute>
            },
            {
                path : "/vendor-registration",
                element : <UserRoute><BecomeSeller></BecomeSeller></UserRoute>
            },
            {
                path : "/checkout",
                element : <UserRoute><CheckoutPage></CheckoutPage></UserRoute>
            },
            {
                path : "/invoice",
                element : <UserRoute><InvoicePage></InvoicePage></UserRoute>
            },

        ]
    },
    {
        path : '/dashboard',
        element : <UserRoute><Dashboard></Dashboard></UserRoute>,
        errorElement: <ErrorPage></ErrorPage>,
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
                loader : ({params}) => fetch(`https://ph-assignment-12-backend.vercel.app/products/${params.id}`),
                element: <RoleBasedRoute allowedRoles={['seller','admin']} showWarning><EditProduct /></RoleBasedRoute>
            },
            {
                path : "/dashboard/manage-medicines",
                element : <RoleBasedRoute allowedRoles={['seller','admin']} showWarning><ManageMedicines></ManageMedicines></RoleBasedRoute>
            },
            {
                path : "/dashboard/manage-users",
                element : <RoleBasedRoute allowedRoles={['admin']} showWarning><ManageUsers></ManageUsers></RoleBasedRoute>
            },
            {
                path : "/dashboard/seller-list",
                element : <RoleBasedRoute allowedRoles={['admin']} showWarning><SellerList></SellerList></RoleBasedRoute>
            },
            {
                path : "/dashboard/seller-req",
                element : <RoleBasedRoute allowedRoles={['admin']} showWarning><SellerReq></SellerReq></RoleBasedRoute>
            },
            {
                path : "/dashboard/payment-management",
                element : <RoleBasedRoute allowedRoles={['admin']} showWarning><AdminPayments></AdminPayments></RoleBasedRoute>
            },
            {
                path : "/dashboard/sales-report",
                element :<RoleBasedRoute allowedRoles={['admin']} showWarning><AdminSalesReport></AdminSalesReport></RoleBasedRoute>
            },
            {
                path : "/dashboard/seller-payment",
                element : <RoleBasedRoute allowedRoles={['admin','seller']} showWarning><SellerPaymentHistory></SellerPaymentHistory></RoleBasedRoute>
            },
            {
                path : "/dashboard/user-payments",
                element :<RoleBasedRoute allowedRoles={['admin','user']} showWarning><UserPaymentHistory></UserPaymentHistory></RoleBasedRoute>
            },
            {
                path : "/dashboard/offer-req",
                element :<RoleBasedRoute allowedRoles={['admin','seller']} showWarning><OfferAdvertiseManager></OfferAdvertiseManager></RoleBasedRoute>
            },
            {
                path : "/dashboard/offer-req-admin",
                element :<RoleBasedRoute allowedRoles={['admin']} showWarning><ManageBannerAds></ManageBannerAds></RoleBasedRoute>
            },
            {
                path : "/dashboard/category",
                element :<RoleBasedRoute allowedRoles={['admin']} showWarning><ManageCategories></ManageCategories></RoleBasedRoute>
            },
            
        ]
    }
]);

export default router;