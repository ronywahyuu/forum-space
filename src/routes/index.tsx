import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import AuthPages from "@/pages/AuthPage";
import DetailPage from "@/pages/DetailPage";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthPages />,
    },
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/write",
        element: <PrivateRoute><div>Write Page</div></PrivateRoute>,
    },
    {
        path: "/posts/:id",
        element: <PrivateRoute><DetailPage /></PrivateRoute>,
    }

]);

export default router;