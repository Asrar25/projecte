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
  const [sourceOrders, setSourceOrders] = useState([]);
  const [destinationOrders, setDestinationOrders] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const products = localStorage.getItem("products");
  const storedProducts = products ? JSON.parse(products) : [];

  const userData = localStorage.getItem("userData");
  const storedUserData = products ? JSON.parse(userData) : [];

  useEffect(() => {
      axios
        .get(`http://localhost:8000/api/orders/get/${storedUserData.id}`)
        .then((response) => {
            console.log("response.data.destinationOrders :",response.data.destinationOrders);
          setSourceOrders(response.data.sourceOrders || []);
          setDestinationOrders(response.data.destinationOrders || []);
        })
        .catch((error) => console.error("Error fetching orders:", error));
  }, []);


  const getProductDetails = (productId) => {
  return storedProducts.find(p => p.id === productId);
};

const getUserAddress = (userId) => {
  if (userId == storedUserData.id) {
    return storedUserData.address; // Current user
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
       <section className="p-6">
  <h2 className="text-xl font-semibold mb-4">Purchased Products</h2>
  {sourceOrders.length === 0 ? (
    <p>No sent orders</p>
  ) : (
    <ul className="space-y-4">
      {sourceOrders.map((order) => {
        const product = getProductDetails(order.product_id);
        const toAddress = getUserAddress(order.destination);
        return (
          <li key={order.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{product?.name || "Unknown Product"}</h3>
            <p>Price: ₹{order.price}</p>
            <p>To: {toAddress}</p>
          </li>
        );
      })}
    </ul>
  )}
</section>

<section className="p-6">
  <h2 className="text-xl font-semibold mb-4">Supplied Products</h2>
  {destinationOrders.length === 0 ? (
    <p>No received orders</p>
  ) : (
   <ul className="space-y-4">
  {destinationOrders.map((order) => {
    const product = getProductDetails(order.product_id);
    const fromAddress = getUserAddress(order.source);
    return (
      <li key={order.id} className="bg-white p-4 shadow rounded flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{product?.name || "Unknown Product"}</h3>
          <p>Price: ₹{order.price}</p>
          <p>From: {fromAddress}</p>
        </div>

        {product?.image && (
          <img
            src={`http://localhost:8000/${product.image}`}
            alt={product.name}
            className="mt-4 sm:mt-0 sm:ml-4 w-28 h-28 object-cover rounded"
          />
        )}
      </li>
    );
  })}
</ul>
  )}
</section>
      </div>
    </div>
  );
}

export default Home;
