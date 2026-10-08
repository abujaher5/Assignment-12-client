import useRole from "./useRole";

const useAdmin = () => {
  const [role, isRoleLoading] = useRole();
  return [role === "Admin", isRoleLoading];
};

export default useAdmin;
