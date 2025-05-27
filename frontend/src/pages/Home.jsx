// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Home() {
//   const [categories, setCategories] = useState([]);
//   const [batteries, setBatteries] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/categories/get')
//       .then(response => setCategories(response.data.data))
//       .catch(error => console.error('Error fetching categories:', error));

//     axios.get('http://localhost:8000/api/batteries/get')
//       .then(response => setBatteries(response.data))
//       .catch(error => console.error('Error fetching batteries:', error));
//   }, []);

//   const filteredBatteries = selectedCategoryId
//     ? batteries.filter(battery => battery.category_id === selectedCategoryId)
//     : batteries;

//   const handleBuyClick = (batteryId) => {

//     // Get email from localStorage
//     const userEmail = localStorage.getItem('userEmail');

//     if (userEmail) {
//       // Send email with userEmail
//       sendEmail(userEmail, batteryId);
//     } else {
//       console.log('No user email found in localStorage');
//     }
//   };

//   const sendEmail = (userEmail, batteryId) => {
//     // Your email sending logic here (e.g., via an API call or email service like PHPMailer)
//     axios.post('http://localhost:8000/api/send-email', {
//       email: userEmail,
//       batteryId: batteryId,
//     })
//     .then(response => {
//       console.log('Email sent successfully:', response);
//     })
//     .catch(error => {
//       console.error('Error sending email:', error);
//     });
//   };

//   return (
//     <div className="bg-gray-200 min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Battery Store</h1>

//       {/* Categories Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4">Categories</h2>
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => setSelectedCategoryId(null)}
//             className={`px-4 py-2 rounded-md ${selectedCategoryId === null ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} shadow`}
//           >
//             All
//           </button>
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setSelectedCategoryId(category.id)}
//               className={`px-4 py-2 rounded-md ${selectedCategoryId === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} shadow`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Batteries Section */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Batteries</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredBatteries.map((battery) => (
//             <div key={battery.id} className="bg-white rounded-lg shadow-md p-4">
//               <img
//                 src={`http://localhost:8000/${battery.image}`}
//                 alt={battery.name}
//                 className="w-full h-50 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-semibold">{battery.name}</h3>
//               <p className="text-blue-600 font-bold mt-2">₹{battery.price}</p>
//               <p className="text-sm text-gray-500">Stock: {battery.stock_quantity}</p>
//               <button
//                 onClick={() => handleBuyClick(battery.name)}
//                 className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//               >
//                 Buy
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Home() {
//   const [categories, setCategories] = useState([]);
//   const [batteries, setBatteries] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/categories/get')
//       .then(response => setCategories(response.data.data))
//       .catch(error => console.error('Error fetching categories:', error));

//     axios.get('http://localhost:8000/api/batteries/get')
//       .then(response => setBatteries(response.data))
//       .catch(error => console.error('Error fetching batteries:', error));
//   }, []);

//   const filteredBatteries = selectedCategoryId
//     ? batteries.filter(battery => battery.category_id === selectedCategoryId)
//     : batteries;

//   const handleBuyClick = (batteryId) => {
//     const userEmail = localStorage.getItem('userEmail');
//     if (userEmail) {
//       sendEmail(userEmail, batteryId);
//     } else {
//       console.log('No user email found in localStorage');
//     }
//   };

//   const sendEmail = (userEmail, batteryId) => {
//     axios.post('http://localhost:8000/api/send-email', {
//       email: userEmail,
//       batteryId: batteryId,
//     })
//       .then(response => {
//         console.log('Email sent successfully:', response);
//       })
//       .catch(error => {
//         console.error('Error sending email:', error);
//       });
//   };

//   return (
//     <div
//       className="bg-cover bg-center min-h-screen"
//       style={{ backgroundImage: `url('/images/ecommerce-bg.jpg')` }}
//     >
//       {/* Banner */}
//       <div className="bg-black bg-opacity-60 text-white text-center py-12">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Battery Store</h1>
//         <p className="text-lg mb-6">Find the best batteries for your needs at unbeatable prices</p>
//         <button className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded text-white font-semibold shadow-lg">
//           Shop Now
//         </button>
//       </div>

//       <div className="bg-white bg-opacity-90 p-6">
//         {/* Categories */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => setSelectedCategoryId(null)}
//               className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
//                 selectedCategoryId === null
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-800 border-gray-300'
//               }`}
//             >
//               All
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategoryId(category.id)}
//                 className={`px-4 py-2 rounded-full border transition hover:scale-105 ${
//                   selectedCategoryId === category.id
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-white text-gray-800 border-gray-300'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* Batteries */}
//         <section>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Batteries</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredBatteries.map((battery) => (
//               <div
//                 key={battery.id}
//                 className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 duration-300 p-4"
//               >
//                 <img
//                   src={`http://localhost:8000/${battery.image}`}
//                   alt={battery.name}
//                   className="w-full h-48 object-cover rounded-md mb-4"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800">{battery.name}</h3>
//                 <p className="text-blue-700 font-bold mt-1 text-lg">₹{battery.price}</p>
//                 <p className="text-sm text-gray-500">Stock: {battery.stock_quantity}</p>
//                 <button
//                   onClick={() => handleBuyClick(battery.name)}
//                   className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Extra Button for UI */}
//         <div className="text-center mt-12">
//           <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition">
//             View Offers & Discounts
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Make sure Sidebar.jsx is in the same folder or adjust path

function Home() {
  const [categories, setCategories] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/get")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // axios
    //   .get("http://localhost:8000/api/batteries/get")
    //   .then((response) => setBatteries(response.data))
    //   .catch((error) => console.error("Error fetching batteries:", error));
      const products = localStorage.getItem("products");
      const storedProducts = products ? JSON.parse(products) : [];
    
      const userData = localStorage.getItem("userData");
      const storedUserData = userData ? JSON.parse(userData) : {};
    
      const userId = storedUserData.id; // or use storedUserData[0].id if userData is an array
    
      // Filter products for this user
      const userProducts = storedProducts.filter(product => product.userID != userId);
    
      setBatteries(userProducts);
  }, []);

  const filteredBatteries = selectedCategoryId
    ? batteries.filter((battery) => battery.category_id === selectedCategoryId)
    : batteries;

  const handleBuyClick = (batteryId) => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      sendEmail(userEmail, batteryId);
    } else {
      console.log("No user email found in localStorage");
    }
  };

  const sendEmail = (userEmail, batteryId) => {
    axios
      .post("http://localhost:8000/api/send-email", {
        email: userEmail,
        batteryId: batteryId,
      })
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col md:flex-row">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-20 md:ml-64 transition-all duration-300 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow-md sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Battery Store</h1>
          <div className="flex gap-4 items-center">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-black"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 4h-2v2h2v-2zm2 0v2h11v14h-16v-14h1v-2h-3v2h1v16h18v-16h-13z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            {/* Profile Icon */}
            <Link to="/profile">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-black"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2a6 6 0 016 6c0 2.21-1.2 4.15-3 5.2V15h3v2H6v-2h3v-1.8a6.001 6.001 0 016-11.2z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Welcome Banner with Background Image */}
        <section
          className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
          {/* overlay */}
          <div className="relative text-center text-white px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to Battery Store
            </h2>
            <p className="text-lg md:text-xl">
              Find the best batteries for your needs with great prices and
              quality assurance.
            </p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="p-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategoryId(null)}
              className={`px-4 py-2 rounded-md ${
                selectedCategoryId === null
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              } shadow hover:scale-105 transition-transform duration-300`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategoryId === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                } shadow hover:scale-105 transition-transform duration-300`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Batteries Section */}
        <section className="p-6 pt-0 flex-grow">
          <h2 className="text-xl font-semibold mb-4">Batteries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBatteries.map((battery) => (
              // <div key={battery.id} className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform duration-300">
              //   <img
              //     src={`http://localhost:8000/${battery.image}`}
              //     alt={battery.name}
              //     className="w-full h-48 object-cover rounded-md mb-4"
              //   />
              //   <h3 className="text-lg font-semibold">{battery.name}</h3>
              //   <p className="text-blue-600 font-bold mt-2">₹{battery.price}</p>
              //   <p className="text-sm text-gray-500">Stock: {battery.stock_quantity}</p>
              //   <button
              //     onClick={() => handleBuyClick(battery.name)}
              //     className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              //   >
              //     Buy
              //   </button>
              // </div>

              <Link to={`/battery/${battery.id}`} key={battery.id}>
                <div className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 duration-300 p-4">
                  <img
                    src={`http://localhost:8000/${battery.image}`}
                    alt={battery.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {battery.name}
                  </h3>
                  <p className="text-blue-700 font-bold mt-1 text-lg">
                    ₹{battery.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {battery.stock_quantity}
                  </p>
                  <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-6 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; 2025 Battery Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a className="hover:text-white">
                Privacy Policy
              </a>
              <a className="hover:text-white">
                Terms of Service
              </a>
              <a className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
