import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../../api/utils";
import { useRef } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, updateUserProfile } = useAuth();
  const imageInputRef = useRef(null); // Create a ref for the image input field
  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      return data;
    },
  });

  // console.log(user);
  // console.log(currentUser);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = imageInputRef.current.files[0]; // Access the image file via the ref
  
      // Build the update object for Firebase and database
      let firebaseUpdate = {};
      let updateData = {};
  
       // Check if the name has changed
       if (name && name !== currentUser?.name) {
        firebaseUpdate.displayName = name;
        updateData.name = name;
      }
      else{
        firebaseUpdate.displayName = currentUser.name;
      }
  
    // Check if a new image is provided
    if (image) {
      const photoURL = await imageUpload(image);
      if (photoURL && photoURL !== currentUser?.photoURL) {
        firebaseUpdate.photoURL = photoURL;
        updateData.photoURL = photoURL;
      }
    }
    else{
      firebaseUpdate.photoURL = currentUser.photoURL;
    }
  
    // If no fields are updated, show a message and return
    if (Object.keys(updateData).length === 0) {
      Swal.fire("No Changes", "No fields were updated.", "info");
      return;
    }
  
    try {
      // Update Firebase user profile
      if (Object.keys(firebaseUpdate).length > 0) {
        await updateUserProfile(firebaseUpdate.displayName, firebaseUpdate.photoURL);
        console.log("Firebase profile updated successfully.");
      }

      // Update database profile
      const res = await axiosSecure.patch(
        `/user/update/profile/${currentUser.email}`,
        updateData
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        // Clear the image input field
        if (imageInputRef.current) {
          imageInputRef.current.value = ""; // Clear the file input
        }
        Swal.fire("Success", "Profile updated successfully!", "success");
      } else {
        Swal.fire("No Changes", "No updates were made to the profile.", "info");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Failed to update profile. Try again later.", "error");
    }
  };
  
  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      <form
        className="flex flex-col items-center"
        onSubmit={handleUpdateProfile}
      >
        {/* Profile Picture */}
        <div className="mb-4">
          <img
            src={currentUser?.photoURL || ""}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        <div className="mb-4">
          <input type="file" name="image" accept="image/*" className="mb-2" ref={imageInputRef}/>
        </div>

        {/* User Information */}
        <div className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              defaultValue={currentUser?.name || ""}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 cursor-none">
              Email:
            </label>
            <input
              type="email"
              name="email"
              defaultValue={currentUser?.email || ""}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 cursor-none">
              Phone:
            </label>
            <input
              type="email"
              name="phone"
              defaultValue={currentUser?.phone || ""}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div> */}

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
