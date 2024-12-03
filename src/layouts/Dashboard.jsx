import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex gap-2 uppercase text-white">
      {/*  Side bar */}
      <div className="w-64  min-h-full bg-sky-600">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Famous </h2>
          <h3 className="text-xl tracking-[.4rem] font-semibold ">
            Diagnostic Center
          </h3>
        </div>
        <ul className="menu p-4">
          {user ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allTest">All Test</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">Reservation</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allBanners">All Banners</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">All Users</NavLink>
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/">Contact</NavLink>
          </li>
        </ul>
      </div>

      {/*  Dashboard content */}

      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
