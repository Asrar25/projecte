// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function BatteryDetails() {
//   const { id } = useParams();
//   const [battery, setBattery] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/batteries/get/${id}`)
//       .then(response => {
//         setBattery(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching battery details:', error);
//       });
//   }, [id]);

//   if (!battery) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{battery.name}</h1>
//       <img
//         src={`http://localhost:8000/${battery.image}`}
//         alt={battery.name}
//         className="w-full max-w-md mb-6"
//       />
//       <p className="text-xl text-gray-700">Price: ₹{battery.price}</p>
//       <p className="text-md text-gray-500">Stock: {battery.stock_quantity}</p>
//       <p className="mt-4">{battery.description || 'No description available.'}</p>
//     </div>
//   );
// }

// export default BatteryDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BatteryDetails() {
  const { id } = useParams();
  const [battery, setBattery] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const userData = localStorage.getItem("userData");

  const storedUserData = userData ? JSON.parse(userData) : {};

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/batteries/get/${id}`)
      .then((response) => {
        setBattery(response.data);
      })
      .catch((error) => {
        console.error("Error fetching battery details:", error);
      });
  }, [id]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: battery.id,
          quantity,
          price: totalPrice,
          userID: storedUserData?.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();
      alert(data.message);
      navigate("/dashboard"); // Navigate to home page on success
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!battery)
    return <div className="p-6 text-center text-lg">Loading...</div>;

  const totalPrice = battery.price * quantity;

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col md:flex-row bg-cover bg-center">
      {/* Breadcrumbs */}
      <div className=" mx-20 text-sm text-gray-600">
        <span className="hover:underline cursor-pointer">Home</span> &gt;
        <span className="ml-2 hover:underline cursor-pointer">
          Batteries
        </span>{" "}
        &gt;
        <span className="ml-2 font-medium text-gray-800">{battery.name}</span>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-10 w-full">
        {/* Product Image */}
        <img
          src={`http://localhost:8000/${battery.image}`}
          alt={battery.name}
          className="w-[450px] h-[450px]  rounded-lg shadow-lg"
        />

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{battery.name}</h1>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="text-yellow-500 text-lg">★★★★☆</div>
            <span className="text-sm text-gray-600">(120 reviews)</span>
          </div>

          <p className="text-2xl font-semibold text-green-700">
            ₹{battery.price}
          </p>
          {/* <p className={`text-md font-medium ${battery.stock_quantity > 0 ? 'text-blue-600' : 'text-red-600'}`}>
        Stock: {battery.stock_quantity > 0 ? battery.stock_quantity : 'Out of Stock'}
      </p> */}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={decrement}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={increment}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded"
            >
              +
            </button>
          </div>

          <p className="text-xl font-semibold text-gray-800 mt-2">
            Total Price: ₹{totalPrice}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    battery,
                    quantity,
                    totalPrice,
                  },
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto"
            >
              Buy Now for ₹{totalPrice}
            </button>
            <button
              onClick={addToCart}
              className="border border-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <button className="text-red-600 hover:text-red-700 underline w-full sm:w-auto">
              ❤️ Add to Wishlist
            </button>
          </div>

          {/* Delivery Info */}
          {/* <div className="text-sm text-gray-600 mt-4">
        🚚 <strong>Free Delivery:</strong> Get it by <span className="font-medium">Tomorrow</span> |
        🛡️ <strong>Warranty:</strong> 1 Year
      </div> */}

          {/* Key Features */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Key Features:
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>High-performance lithium-ion battery</li>
              <li>Long-lasting and fast-charging</li>
              <li>Eco-friendly design</li>
              <li>1-year replacement warranty</li>
            </ul>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Description:
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {battery.description || "No description available."}
            </p>
          </div>

          {/* Specifications */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Specifications:
            </h3>
            <table className="w-full text-sm text-gray-700 border">
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-4 font-medium">Brand</td>
                  <td className="py-2 px-4">{battery.brand}</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-4 font-medium">Model</td>
                  <td className="py-2 px-4">{battery.model}</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-4 font-medium">Capacity</td>
                  <td className="py-2 px-4">{battery.capacity}</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-4 font-medium">Voltage</td>
                  <td className="py-2 px-4">{battery.voltage}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatteryDetails;
