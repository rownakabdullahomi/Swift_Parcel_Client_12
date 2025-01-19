import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/shared/SocialLogin";
import { TbFidgetSpinner } from "react-icons/tb";
// import LoadingSpinner from "../components/shared/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { userLogin, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const from = location?.state?.from?.pathname || "/";
  // if (loading) return <LoadingSpinner></LoadingSpinner>
  if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      await userLogin(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" bg-base-300 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-base-200 border border-gray-500 rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center ">Welcome !</h2>
        <p className="text-sm text-center">Please login to your account.</p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-primary"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary btn-outline w-full mt-6"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-sm text-gray-400">OR</div>

        {/* Social Login */}
        <SocialLogin></SocialLogin>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-secondary font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
