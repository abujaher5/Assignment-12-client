import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "User", isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || "User";
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
