import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <progress className="progress w-52"></progress>;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
  }

  if (role === "Doctor") {
    return <Navigate to={"/dashboard/doctorProfile"} replace></Navigate>;
  }

  if (role === "Admin") {
    return <Navigate to={"/dashboard/adminHome"} replace></Navigate>;
  }

  return children;
};

export default UserRoute;
