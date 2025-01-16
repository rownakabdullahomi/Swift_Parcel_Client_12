import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    photoURL: ''
  });
  const [profileImage, setProfileImage] = useState(null); // Stores uploaded image file

  useEffect(() => {
    // Fetch user information from the database
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/profile'); // Replace with your API endpoint
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await axios.patch('/api/users/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserInfo(response.data);
      Swal.fire('Success', 'Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire('Error', 'Failed to update profile. Try again later.', 'error');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      <form className="flex flex-col items-center" onSubmit={handleUpdateProfile}>
        {/* Profile Picture */}
        <div className="mb-4">
          <img
            src={userInfo.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
        </div>

        {/* User Information */}
        <div className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={userInfo.name || ''}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={userInfo.email || ''}
              className="w-full p-2 border rounded"
            />
          </div>

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
