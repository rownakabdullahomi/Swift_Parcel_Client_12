/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const UserRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'User') return children
    return <Navigate to='/' replace='true' />
  
};

export default UserRoute;