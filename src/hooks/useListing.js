import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useListing = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // tan stack query
  const { data: listing = [], refetch } = useQuery({
    queryKey: ["listing", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myListings?email=${user.email}`);
      const result = res.data;
      return result;
    },
  });

  return [listing, refetch];
};

export default useListing;
