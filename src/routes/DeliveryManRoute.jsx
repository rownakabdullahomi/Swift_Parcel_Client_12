/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useRole from "../hooks/useRole"

const DeliveryManRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'DeliveryMan') return children
    return <Navigate to='/' replace='true' />
  }
 
  export default DeliveryManRoute