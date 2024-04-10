import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import AuthPages from "@/pages/AuthPage";
import DetailPage from "@/pages/DetailPage";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import HomePage from "@/pages/HomePage";
import ThreadList from "@/features/threads/ThreadList";
import Write from "@/features/write/Write";
import LeaderboardPage from "@/pages/LeaderboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "/", element: <ThreadList /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
      { path: "/write", element: <PrivateRoute><Write /></PrivateRoute> },
      { path: "/threads/*", element: <ThreadList /> },
      { path: "/threads/:id", element: <PrivateRoute><DetailPage /></PrivateRoute>, },
    ]
  },
  {
    path: "/",
    element: <AuthPages />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> }
    ]
  }

]);

export default router;