import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";



const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { userLogin, setUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then((res) => {
        // console.log(res.user);
        const user = res.user;
        setUser(user);
        toast.success("Login successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        // console.log(error.message);
        toast.error("Login failed!  " + error.message);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const user = res?.user;
      setUser(user);
      toast.success("Google login successful!");
      navigate(location?.state ? location.state : "/");
      
      }
  
    catch (error) {
      toast.error("Google login failed! " + error.message);
    }
  };
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" bg-base-300 flex items-center justify-center p-8">
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
            className="btn btn-outline btn-primary w-full mt-6"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-sm text-gray-400">OR</div>

        {/* Social Login */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center"
          >
            <FcGoogle size={24} />
            Login With Google
          </button>
        </div>

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
