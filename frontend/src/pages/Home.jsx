import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [categories, setCategories] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/get')
      .then(response => setCategories(response.data.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost:8000/api/batteries/get')
      .then(response => setBatteries(response.data))
      .catch(error => console.error('Error fetching batteries:', error));
  }, []);

  const filteredBatteries = selectedCategoryId
    ? batteries.filter(battery => battery.category_id === selectedCategoryId)
    : batteries;

  const handleBuyClick = (batteryId) => {

    // Get email from localStorage
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail) {
      // Send email with userEmail
      sendEmail(userEmail, batteryId);
    } else {
      console.log('No user email found in localStorage');
    }
  };

  const sendEmail = (userEmail, batteryId) => {
    // Your email sending logic here (e.g., via an API call or email service like PHPMailer)
    axios.post('http://localhost:8000/api/send-email', {
      email: userEmail,
      batteryId: batteryId,
    })
    .then(response => {
      console.log('Email sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
  };

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Battery Store</h1>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`px-4 py-2 rounded-md ${selectedCategoryId === null ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} shadow`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`px-4 py-2 rounded-md ${selectedCategoryId === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} shadow`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Batteries Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Batteries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBatteries.map((battery) => (
            <div key={battery.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={`http://localhost:8000/${battery.image}`}
                alt={battery.name}
                className="w-full h-50 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{battery.name}</h3>
              <p className="text-blue-600 font-bold mt-2">₹{battery.price}</p>
              <p className="text-sm text-gray-500">Stock: {battery.stock_quantity}</p>
              <button
                onClick={() => handleBuyClick(battery.name)}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
