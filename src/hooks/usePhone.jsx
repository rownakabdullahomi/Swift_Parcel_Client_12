import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePhone = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: userPhone, isLoading } = useQuery({
      queryKey: ['phone', user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
        const { data } = await axiosSecure(`/user/role/${user?.email}`)
        return data.phone
      },
    })
    return [userPhone, isLoading]
};

export default usePhone;