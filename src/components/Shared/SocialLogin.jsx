import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { googleLogin } = useAuth();

  
  // Handle Google Signin
  const handleGoogleLogin = async () => {
    try {
      //User Registration using google
      const data = await googleLogin();
      //   4. Save new user to db
      const userInfo = {
        name: data.user.displayName,
        email: data.user.email,
        userType: "User",
        photoURL: data.user.photoURL,
      };
      // console.log(data.user);
      // console.log(userInfo);
      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        toast.success(`"Google Login Successful!" as ${userInfo.name}!`);
      } else {
        toast.success("Google Login Successful!");
      }
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Google login failed! " + err?.message);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center"
      >
        <FcGoogle size={24} />
        Continue With Google
      </button>
    </div>
  );
};

export default SocialLogin;
