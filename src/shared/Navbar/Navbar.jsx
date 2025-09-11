import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // dropdown toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((close) => !close);
  };

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/aboutUs">About Us</Link>
      </li>
      <li>
        <Link to="/contactUs">Contact Us</Link>
      </li>
      <li>
        <Link to="/ourServices">Our Services</Link>
      </li>
      <li>
        <Link to="/allTests">All Tests</Link>
      </li>
      {user ? (
        <li>
          <Link to="/dashboard/allUsers">Dashboard</Link>
        </li>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div className="maw-w-7xl mx-auto ">
      <div className="max-w-7xl mx-auto flex justify-between bg-blue-500 ">
        <div className="">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              onClick={toggleDropdown}
              className="btn btn-ghost lg:hidden z-10"
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

        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal text-xl px-1 font-semibold text-white uppercase  ">
            {navLinks}
          </ul>
        </div>

        <div className="">
          <ul className="menu menu-horizontal px-1 uppercase">
            {user ? (
              <>
                <li className="menu   menu-horizontal px-1">
                  <button className="uppercase" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="menu menu-horizontal px-1">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {user && (
              <div className="avatar">
                <div className="w-12 rounded-full border-2 ">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
