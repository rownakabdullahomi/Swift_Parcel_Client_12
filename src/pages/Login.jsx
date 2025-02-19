import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/shared/SocialLogin";
import { TbFidgetSpinner } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import LoginGif from "../assets/LoginGif.gif";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const from = location?.state?.from?.pathname || "/";
  
  if (user) return <Navigate to={from} replace={true} />;

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await userLogin(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDefaultLogin = (role) => {
    const credentials = {
      user: { email: "test@test.com", password: "123456aA@" },
      delivery: { email: "delivery@test.com", password: "123456aA@" },
      admin: { email: "admin@admin.com", password: "123456aA@" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="lg:max-h-screen flex items-center justify-center p-6">
      <Helmet>
        <title>Login | SwiftParcel</title>
      </Helmet>
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-around gap-10 bg-base-100 rounded-xl shadow-lg p-8 overflow-hidden">
        <div className="flex flex-col justify-center items-center">
          <img src={LoginGif} alt="Login" className="lg:max-h-[400px] w-auto object-contain" />
          <button onClick={() => navigate("/")} className="btn btn-outline btn-warning mt-5 w-full transform hover:scale-105 transition duration-300 hover:!text-white">
            <FaHome size={18} /> Back to Home
          </button>
        </div>

        <div className="w-full max-w-md bg-base-200 border border-gray-500 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-3xl font-bold text-center">Welcome !</h2>
          <p className="text-sm text-center">Please login to your account.</p>

          <div className="flex justify-center gap-3 ">
            <div className="badge badge-primary cursor-pointer p-3 !text-white" onClick={() => handleDefaultLogin("user")}>User</div>
            <div className="badge badge-info cursor-pointer p-3 !text-white" onClick={() => handleDefaultLogin("delivery")}>Delivery Man</div>
            <div className="badge badge-secondary cursor-pointer p-3 !text-white" onClick={() => handleDefaultLogin("admin")}>Admin</div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full mt-1" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full mt-1" required />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={handleShowPassword}>
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-outline w-full mt-6">
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Login"}
            </button>
          </form>

          <div className="divider text-sm text-gray-400">OR</div>
          <SocialLogin />

          <p className="text-center text-sm text-gray-600">
            Don’t have an account? <Link to="/signup" className="text-secondary font-medium">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
