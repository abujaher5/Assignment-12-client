import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const home =
    role === "Admin"
      ? "/dashboard/adminHome"
      : role === "Doctor"
        ? "/dashboard/doctorHome"
        : "/dashboard/userHome";

  return <Navigate to={home} replace />;
};

export default DashboardHome;
