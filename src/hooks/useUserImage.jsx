import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserImage = () => {
    const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: userImageURL, isLoading } = useQuery({
    queryKey: ["userImageURL", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      
      return data.photoURL;
    },
  });
//   console.log(userId);
  return [userImageURL, isLoading];
};

export default useUserImage;