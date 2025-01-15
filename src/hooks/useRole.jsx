
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

const useRole = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth()
  const { data: userType, isLoading } = useQuery({
    queryKey: ['userType', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`)
      return data.userType
    },
  })
//   console.log(userType)
  return [userType, isLoading]
}

export default useRole