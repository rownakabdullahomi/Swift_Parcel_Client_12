import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();



    return (
        <div>
            AllUsers
        </div>
    );
};

export default AllUsers;