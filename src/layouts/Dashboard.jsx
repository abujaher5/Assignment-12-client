import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";

const Dashboard = () => {
  const isAdmin = true;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  // dropdown toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((close) => !close);
  };

  const navLinks = (
    <>
      {user && isAdmin ? (
        <>
          <li>
            <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allUsers">All Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addATest">Add Test</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addADoctor">Add Doctor</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageTests">Manage Tests</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manageDoctors">Manage Doctors</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageBanners">Manage Banners</NavLink>
          </li>
          <div className="divider"></div>

          {/*  common nav links for user and admin  */}

          <li>
            <NavLink to="/"> Bact To Home</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/dashboard/userHome">User Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation">Reservation</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">Payment History</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/addReview">Add Review</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myListings">My Listing</NavLink>
          </li>

          <div className="divider"></div>

          {/*  common nav links for user and admin  */}

          <li>
            <NavLink to="/"> Bact To Home</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex flex-col md:flex-row lg:flex-row h-screen text-white">
      {/*  Side bar */}
      <div className="w-64 h-screen bg-sky-600 hidden md:block lg:block ">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Famous </h2>
          <h3 className="text-xl tracking-[.4rem] font-semibold ">
            Diagnostic Center
          </h3>
        </div>
        <ul className="menu p-4">
          {
            // user && isAdmin ? (
            //   <>
            //     <li>
            //       <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/allUsers">All Users</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/addATest">Add A Test</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/addADoctor">Add A Doctor</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/allBanners">All Banners</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/manageDoctors">Manage Doctors</NavLink>
            //     </li>
            //   </>
            // ) : (
            //   <>
            //     <li>
            //       <NavLink to="/dashboard/userHome">User Home</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/reservation">Reservation</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/paymentHistory">
            //         Payment History
            //       </NavLink>
            //     </li>
            //     {/* <li>
            //       <NavLink to="/dashboard/cart">My Cart ({cart.length})</NavLink>
            //     </li> */}
            //     <li>
            //       <NavLink to="/dashboard/addReview">Add Review</NavLink>
            //     </li>
            //     <li>
            //       <NavLink to="/dashboard/myBooking">My Booking</NavLink>
            //     </li>
            //   </>
            // )

            navLinks
          }

          {/* <div className="divider"></div> */}

          {/*  common nav links for user and admin  */}

          {/* <li className="text-black">
            <NavLink to="/"> Bact To Home</NavLink>
          </li> */}
        </ul>
      </div>

      {/* for small device dropdown navbar */}
      <div className="text-black bg-sky-600 lg:hidden md:hidden">
        <div className="dropdown ">
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDropdown}
            className="btn btn-ghost  lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow uppercase  "
            >
              {navLinks}
            </ul>
          )}
        </div>
      </div>

      {/*  Dashboard content */}

      <div className="flex-1 overflow-auto bg-gray-400 dark:bg-white p-8  ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
