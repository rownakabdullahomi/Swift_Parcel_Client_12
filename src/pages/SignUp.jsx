

import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";


const SignUp = () => {
  const navigate = useNavigate();

  const { userRegister, setUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const photo = formData.get("photo");
    const email = formData.get("email");
    const password = formData.get("password");

   
    const validatePassword = (password) => {
      // Check if password meets the criteria
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      return regex.test(password);
    };

    // Validate password
    if (!validatePassword(password)) {
      toast.error(
        "Password must have at least one uppercase letter, one lowercase letter, and at least 6 characters."
      );
      return;
    }

    userRegister(email, password)
      .then((res) => {
        // console.log(res.user);
        const user = res.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo });
        toast.success("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Registration Failed! " + error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const user = res.user;
        setUser(user);
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.message);
        toast.error("Google login failed! " + error.message);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" bg-base-300 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-base-200 rounded-xl border-2 border-gray-700 shadow-md p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center ">Create Your Account</h2>
        <p className="text-sm text-center text-gray-500">
          Join us to enjoy all the features!
        </p>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium ">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-secondary"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-sm font-medium ">Photo URL</label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your Photo URL"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-secondary"
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium ">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-secondary"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-secondary"
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

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-secondary btn-outline w-full mt-6"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-sm text-gray-400">OR</div>

        {/* Social Register */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center"
          >
            <FcGoogle size={24} />
            Register With Google
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
