import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/users/update/${user.id}`, user);
      alert('Profile updated successfully');

      // Update localStorage if needed
      localStorage.setItem('userData', JSON.stringify(response.data.data));
    } catch (error) {
      console.error('Update failed:', error);
      alert('Error updating profile');
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const storedUserData = userData ? JSON.parse(userData) : {};
    setUser(storedUserData);
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col md:flex-row">
      <div className="flex-1 ml-20 md:ml-64 transition-all duration-300 flex flex-col min-h-screen justify-center items-center">
        <div className="w-full max-w-xl p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              required
              name="name"
              value={user.name || ""}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              required
              name="email"
              value={user.email || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              required
              name="mobileNo"
              value={user.mobileNo || ""}
              onChange={handleChange}
            />
            <textarea
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              rows="3"
              required
              name="address"
              value={user.address || ""}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
