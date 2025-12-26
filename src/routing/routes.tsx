import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import SignupPage from "../components/SignupPage";
import Customerdashboard from "../components/Customerdashboard";
import ViewProfile from "../components/viewProfile.tsx";
import ModifyForm from "../components/modifyForm.tsx";
import ChangePassword from "../components/changePassword.tsx";
import Bookpage from "../components/Bookpage.tsx";
import Adminpage from "../components/Adminpage.tsx";
import ModifyBook from "../components/modifyBook.tsx";
import ModifyBookForm from "../components/modifyBookForm.tsx";
import ViewBooks from "../components/viewbooks.tsx";
import Reports from "../components/reports.tsx";
import Publisherorders from "../components/Publisherorders.tsx";
import ViewCart from "../components/viewCart.tsx";
import Checkoutform from "../components/Checkoutform.tsx";
import ViewOrderhistory from "../components/vieworderhistory.tsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/customer/dashboard", element: <Customerdashboard /> },
  { path: "/admin/dashboard", element: <Adminpage /> },
  { path: "/profile", element: <ViewProfile /> },
  { path: "/addbook", element: <Bookpage /> },
  { path: "/modifybook", element: <ModifyBook /> },
  {
    path: "/modify/username",
    element: <ModifyForm fieldName="username" fieldLabel="UserName" />,
  },
  {
    path: "/modify/password",
    element: <ChangePassword />,
  },
  {
    path: "/modify/firstName",
    element: <ModifyForm fieldName="firstName" fieldLabel="First Name" />,
  },
  {
    path: "/modify/lastName",
    element: <ModifyForm fieldName="lastname" fieldLabel="Last Name" />,
  },
  {
    path: "/modify/email",
    element: (
      <ModifyForm
        fieldName="emailAddress"
        fieldLabel="Email Address"
        fieldType="email"
      />
    ),
  },
  {
    path: "/modify/phoneNumber",
    element: <ModifyForm fieldName="phoneNumber" fieldLabel="Phone Number" />,
  },
  {
    path: "/modify/shippingAddress",
    element: (
      <ModifyForm fieldName="shippingAddress" fieldLabel="Shipping Address" />
    ),
  },
  {
    path: "/modify/book/title",
    element: <ModifyBookForm fieldName="title" fieldLabel="Book Title" />,
  },
  {
    path: "/modify/book/publicationYear",
    element: (
      <ModifyBookForm
        fieldName="publicationYear"
        fieldLabel="Publication Year"
        fieldType="number"
      />
    ),
  },
  {
    path: "/modify/book/categoryId",
    element: (
      <ModifyBookForm
        fieldName="categoryId"
        fieldLabel="Category ID"
        fieldType="number"
      />
    ),
  },
  {
    path: "/modify/book/publisherId",
    element: (
      <ModifyBookForm
        fieldName="publisherId"
        fieldLabel="Publisher ID"
        fieldType="number"
      />
    ),
  },
  {
    path: "/modify/book/sellingPrice",
    element: (
      <ModifyBookForm
        fieldName="sellingPrice"
        fieldLabel="Selling Price"
        fieldType="number"
      />
    ),
  },
  {
    path: "/modify/book/threshold",
    element: (
      <ModifyBookForm
        fieldName="threshold"
        fieldLabel="Threshold"
        fieldType="number"
      />
    ),
  },
  {
    path: "/modify/book/authorIds",
    element: <ModifyBookForm fieldName="authorIds" fieldLabel="Author IDs" />,
  },
  {
    path: "/modify/book/isbn",
    element: <ModifyBookForm fieldName="isbn" fieldLabel="ISBN" />,
  },
  {
    path: "/modify/book/stockQuantity",
    element: (
      <ModifyBookForm
        fieldName="stockQuantity"
        fieldLabel="Stock Quantity"
        fieldType="number"
      />
    ),
  },
  {
    path: "/viewbooks",
    element: <ViewBooks />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/viewcart",
    element: <ViewCart />,
  },
  {
    path: "/pendingorders",
    element: <Publisherorders />,
  },
  {
    path: "/checkout",
    element: <Checkoutform />,
  },
  {
    path: "/orderhistory",
    element: <ViewOrderhistory />,
  },
]);

export default router;
