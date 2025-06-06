import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBattery() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
    brand:'',
    model:'',
    capacity:'',
    voltage:''
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

   const userData = localStorage.getItem("userData");
  const storedUserData = userData ? JSON.parse(userData) : {};

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/categories/get')
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock_quantity', formData.stock_quantity);
    data.append('category_id', formData.category_id);
    data.append('userID', storedUserData.id);
    data.append('brand', formData.brand);
    data.append('model', formData.model);
    data.append('capacity', formData.capacity);
    data.append('voltage', formData.voltage);

    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
     const response = await axios.post('http://localhost:8000/api/batteries', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
    const existing = localStorage.getItem("products");
    const parsed = existing ? JSON.parse(existing) : [];
      const updatedProducts = [...parsed, response.data.latestAdd];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success('Battery Added Successfully', {
                position: "top-right",
                autoClose: 1000, // Increase time for toast visibility
              });
      setFormData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: '',
        brand:'',
        model:'',
        capacity:'',
        voltage:''
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 1000, // Increase time for toast visibility
      });
      console.error(error);
    }
  };

  const handlePDf = async()=>{ 
      const response = await axios.get('http://localhost:8000/api/downloadPdf', {
      responseType: 'blob', // important!
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a link to download the file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); // or any file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  console.log("response :",response);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Battery</h2>
        <form onSubmit={handleSubmit}>
          {/* Battery Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Battery Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Stock Quantity:</label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Brand :</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Model :</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Capacity :</label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Voltage :</label>
            <input
              type="text"
              name="voltage"
              value={formData.voltage}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category:</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Battery
          </button>
        </form>
      </div>
        <ToastContainer />
    </div>
  );
}

export default AddBattery;
