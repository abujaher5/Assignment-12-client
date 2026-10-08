import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDoctorAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: appointments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["doctorAppointments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/appointments/doctor?email=${user.email}`,
      );
      return res.data;
    },
  });

  return [appointments, refetch, isLoading];
};

export default useDoctorAppointments;
