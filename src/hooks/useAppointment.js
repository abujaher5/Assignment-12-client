import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAppointment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: appointments = [], refetch, isLoading } = useQuery({
    queryKey: ["appointments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/appointments?email=${user.email}`
      );
      return res.data;
    },
  });

  return [appointments, refetch, isLoading];
};

export default useAppointment;
