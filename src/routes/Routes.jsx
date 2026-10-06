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
import ManageBanners from "../pages/Dashboard/ManageBanner/ManageBanners";
import UpdateBannersInfo from "../pages/Dashboard/AddBanner/UpdateBannersInfo/UpdateBannersInfo";
import MyListings from "../pages/Dashboard/UsersComponents/MyListings/MyListings";
import AddReview from "../pages/Dashboard/UsersComponents/AddReview/AddReview";
import ManageTests from "../pages/Dashboard/ManageTest/ManageTests";
import UpdateTest from "../pages/Dashboard/AddTests/UpdateTest/UpdateTest";
import AddTechnology from "../pages/Dashboard/AddTechnology/AddTechnology";
import ManageTechnologies from "../pages/Dashboard/ManageTechnologies/ManageTechnologies";
import UpdateTechnologiesInfo from "../pages/Dashboard/AddTechnology/UpdateTechnologiesInfo/UpdateTechnologiesInfo";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import MyAppointment from "../pages/Dashboard/UsersComponents/MyAppointment/MyAppointment";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
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
        path: "/testDetails/:id",
        element: <TestDetails></TestDetails>,
        loader: ({ params }) =>
          fetch(`${API_URL}/tests/${params.id}`),
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),

    children: [
      // General users route
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "myAppointment",
        element: <MyAppointment />,
      },
      {
        path: "userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "myListings",
        element: <MyListings />,
      },
      {
        path: "addReview",
        element: <AddReview />,
      },

      // Admin Only routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "addATest",
        element: (
          <AdminRoute>
            <AddTests />
          </AdminRoute>
        ),
      },
      {
        path: "addADoctor",
        element: (
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "addBanner",
        element: (
          <AdminRoute>
            <AddBanner />
          </AdminRoute>
        ),
      },
      {
        path: "manageTests",
        element: (
          <AdminRoute>
            <ManageTests />
          </AdminRoute>
        ),
      },
      {
        path: "manageDoctors",
        element: (
          <AdminRoute>
            <ManageDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "manageBanners",
        element: (
          <AdminRoute>
            <ManageBanners />
          </AdminRoute>
        ),
      },
      {
        path: "manageTechnologies",
        element: (
          <AdminRoute>
            <ManageTechnologies />
          </AdminRoute>
        ),
      },

      {
        path: "updateTestInfo/:id",
        element: (
          <AdminRoute>
            <UpdateTest />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`${API_URL}/tests/${params.id}`),
      },
      {
        path: "updateDoctorInfo/:id",
        element: <UpdateDoctorsInfo />,
        loader: ({ params }) =>
          fetch(`${API_URL}/doctors/${params.id}`),
      },
      {
        path: "updateBannerInfo/:id",
        element: <UpdateBannersInfo />,
        loader: ({ params }) =>
          fetch(`${API_URL}/banners/${params.id}`),
      },
      {
        path: "updateTechnologiesInfo/:id",
        element: <UpdateTechnologiesInfo />,
        loader: ({ params }) =>
          fetch(`${API_URL}/technologies/${params.id}`),
      },

      {
        path: "addTechnology",
        element: (
          <AdminRoute>
            <AddTechnology />
          </AdminRoute>
        ),
      },
    ],
  },
]);
