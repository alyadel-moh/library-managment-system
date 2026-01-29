import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../components/SignupPage";
import Reports from "../components/reports.tsx";
import Publisherorders from "../components/Publisherorders.tsx";
import ViewOrderhistory from "../components/viewOrderhistory.tsx";
import Homepage from "../pages/Homepage.tsx";
import Layout from "../pages/Layout.tsx";
import LoginPage from "../components/LoginPage.tsx";
import MainpageLayout from "../pages/MainpageLayout.tsx";
import Adminpage from "../pages/Adminpage.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainpageLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    path: "homepage",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
    ],
  },
  {
    path: "Adminpage",
    element: <Layout />,
    children: [
      { index: true, element: <Adminpage /> },
    ],
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/pendingorders",
    element: <Publisherorders />,
  },
  {
    path: "/orderhistory",
    element: <ViewOrderhistory />,
  },
]);

export default router;
