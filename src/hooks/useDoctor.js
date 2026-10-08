import useRole from "./useRole";

const useDoctor = () => {
  const [role, isRoleLoading] = useRole();
  return [role === "Doctor", isRoleLoading];
};

export default useDoctor;
