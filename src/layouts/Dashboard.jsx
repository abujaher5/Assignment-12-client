import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
  console.log(users);

  return (
    <div className="flex gap-2  text-white">
      {/*  Side bar */}
      <div className="w-64  h-screen bg-sky-600">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Famous </h2>
          <h3 className="text-xl tracking-[.4rem] font-semibold ">
            Diagnostic Center
          </h3>
        </div>
        <ul className="menu p-4">
          {user && isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addATest">Add A Test</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allBanners">All Banners</NavLink>
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
                <NavLink to="/dashboard/paymentHistory">
                  Payment History
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/dashboard/cart">My Cart ({cart.length})</NavLink>
              </li> */}
              <li>
                <NavLink to="/dashboard/addReview">Add Review</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBooking">My Booking</NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>

          {/*  common nav links for user and admin  */}

          <li>
            <NavLink to="/"> Bact To Home</NavLink>
          </li>
        </ul>
      </div>

      {/*  Dashboard content */}

      <div className="flex-1 bg-gray-400 dark:bg-white p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
