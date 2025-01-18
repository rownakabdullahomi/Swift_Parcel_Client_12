import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserId = () => {
    const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: userId, isLoading } = useQuery({
    queryKey: ["userId", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      
      return data._id;
    },
  });
//   console.log(userId);
  return [userId, isLoading];
};

export default useUserId;