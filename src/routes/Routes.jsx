import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AllTests from "../pages/AllTests/AllTests";
import TestDetails from "../pages/AllTests/TestDetails";
import OurService from "../pages/OurService/OurService";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddTests from "../pages/Dashboard/AddTests/AddTests";
import ContactUs from "../pages/Home/Contact/ContactUs";
import UserHome from "../pages/Dashboard/UsersComponents/UserHome";
import AddDoctor from "../pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctor from "../pages/Dashboard/ManageDoctor/ManageDoctor";
import UpdateDoctorsInfo from "../pages/Dashboard/AddDoctor/UpdateDoctorsInfo/UpdateDoctorsInfo";
import AddBanner from "../pages/Dashboard/AddBanner/AddBanner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/ourServices",
        element: <OurService></OurService>,
      },
      {
        path: "/allTests",
        element: <AllTests></AllTests>,
      },
      {
        path: "/testDetails",
        element: <TestDetails></TestDetails>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
    ],
  },

  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // users route
      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addATest",
        element: <AddTests></AddTests>,
      },
      {
        path: "addADoctor",
        element: <AddDoctor />,
      },
      {
        path: "addBanner",
        element: <AddBanner />,
      },
      {
        path: "manageDoctors",
        element: <ManageDoctor />,
      },
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "updateDoctorsInfo/:id",
        element: <UpdateDoctorsInfo />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/doctors/${params.id}`),
      },
    ],
  },
]);
