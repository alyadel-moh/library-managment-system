import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Lazy load components for code splitting
const SignupPage = lazy(() => import("../components/SignupPage"));
const Reports = lazy(() => import("../components/reports.tsx"));
const Publisherorders = lazy(() => import("../components/Publisherorders.tsx"));
const ViewOrderhistory = lazy(
  () => import("../components/viewOrderhistory.tsx"),
);
const Homepage = lazy(() => import("../pages/Homepage.tsx"));
const Layout = lazy(() => import("../pages/Layout.tsx"));
const LoginPage = lazy(() => import("../components/LoginPage.tsx"));
const MainpageLayout = lazy(() => import("../pages/MainpageLayout.tsx"));
const Adminpage = lazy(() => import("../pages/Adminpage.tsx"));
const AuthCallback = lazy(() => import("../components/AuthCallback.tsx"));
const GoogleUserPage = lazy(() => import("../pages/googleuserpage.tsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainpageLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "auth/callback", element: <AuthCallback /> },
    ],
  },
  {
    path: "homepage",
    element: <Layout />,
    children: [{ index: true, element: <Homepage /> }],
  },
  {
    path: "Adminpage",
    element: <Layout />,
    children: [{ index: true, element: <Adminpage /> }],
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "googleuserpage",
    element: <Layout />,
    children: [{ index: true, element: <GoogleUserPage /> }],
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
