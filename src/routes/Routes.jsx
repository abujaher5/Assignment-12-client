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
    ],
  },
]);
