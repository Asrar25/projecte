// src/pages/AddCategory.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/categories', { name });
       toast.success('Category Added Successfully', {
                     position: "top-right",
                     autoClose: 1000, // Increase time for toast visibility
                   });
      setName('');
    } catch (error) {
      toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 1000, // Increase time for toast visibility
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Category</h2>
        {message && (
          <div className="mb-4 text-sm text-green-600">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </form>
      </div>
        <ToastContainer />
    </div>
  );
}

export default AddCategory;
