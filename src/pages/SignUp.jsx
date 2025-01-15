import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../api/utils";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/shared/SocialLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { userRegister, updateUserProfile, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const userType = form.userType.value;
    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    // Validate password
    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      return regex.test(password);
    };

    if (!validatePassword(password)) {
      toast.error(
        "Password must have at least one uppercase letter, one lowercase letter, and at least 6 characters."
      );
      return;
    }

    //1. send image to imgbb
    const photoURL = await imageUpload(image);

    try {
      //2. User Registration
      const result = await userRegister(email, password);

      //3. Save username & profile photo
      await updateUserProfile(name, photoURL);
      console.log(result);

      //   4. Save new user to db
      const userInfo = {
        name,
        email,
        userType,
        photoURL,
      };

      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        toast.success(`Registration Successful as ${userType}!`);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration Failed! " + err?.message);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     //User Registration using google
  //     const data = await googleLogin();
  //     //   4. Save new user to db
  //     const userInfo = {
  //       name: data.user.displayName,
  //       email: data.user.email,
  //       userType: "User",
  //       photoURL: data.user.photoURL,
  //     };
  //     // console.log(data.user);
  //     // console.log(userInfo);
  //     const res = await axiosPublic.post("/users", userInfo);
  //     if (res.data.insertedId) {
  //       toast.success(`"Google Login Successful!" as ${userInfo.name}!`);
  //     }
  //     else{
  //       toast.success("Google Login Successful!");
  //     }
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Google login failed! " + err?.message);
  //   }
  // };

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

            {/* Image Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Select Image
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
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

            {/* User Type Dropdown */}
            <div>
              <label
                htmlFor="userType"
                className="block text-sm font-medium mb-1"
              >
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                className="select select-bordered w-full mt-1 mb-1 focus:ring-2 focus:ring-secondary focus:outline-none transition-all duration-300 ease-in-out bg-base-100 hover:bg-base-200 focus:bg-base-300"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="User">User</option>
                <option value="DeliveryMan">Delivery Man</option>
                <option value="Admin">Admin</option>
              </select>
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
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-sm text-gray-400">OR</div>

        {/* Social Register */}
        <SocialLogin></SocialLogin>

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
