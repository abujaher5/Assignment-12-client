import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDoctor from "../../hooks/useDoctor";

const DoctorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isDoctor, isDoctorLoading] = useDoctor();
  const location = useLocation();

  if (loading || isDoctorLoading) {
    return <progress className="progress w-52"></progress>;
  }
  if (user && isDoctor) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default DoctorRoute;
