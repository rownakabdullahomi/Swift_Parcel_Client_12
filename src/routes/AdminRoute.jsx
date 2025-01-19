/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useRole from "../hooks/useRole"

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'Admin') return children
    return <Navigate to='/' replace='true' />
  }
 
  export default AdminRoute