import { createBrowserRouter} from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";

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
                path : "/login",
                Component : Login
            },
            {
                path : "/register",
                Component : Register,
            },

        ]
    }
]);

export default router;