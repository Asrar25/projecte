import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import tickGif from '../assets/tick.gif'; // ✅ Your tick gif

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
  });

const userData = localStorage.getItem("userData");
const storedUserData = userData ? JSON.parse(userData) : {};

  const handleChange = (e) => {
    setAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Start SVG loader
//     setIsProcessing(true);
//     setPurchaseComplete(false);

//     // Simulate 5-second payment process
//     setTimeout(() => {
//       setIsProcessing(false);
//       setPurchaseComplete(true);
//     //   setTimeout(() => {
//     //     alert('Purchase Done!');
//     //     navigate('/dashboard');
//     //   }, 2000); // Optional: wait 2s before redirecting
//     }, 5000);
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  setIsProcessing(true);
  setPurchaseComplete(false);

  try {
      const orderData = {
        productID: state.battery.id,
        price: state.totalPrice,
        source: state.battery.userID, // seller
        destination: storedUserData.id, // buyer
      };
      await axios.post('http://localhost:8000/api/orders/add', orderData);
      setIsProcessing(false);
      setPurchaseComplete(true);
  } catch (error) {
    console.error('Order submission failed:', error);
    alert('Failed to submit order');
    setIsProcessing(false);
  }
};

console.log("battery :",state.battery);


  if (!state?.battery) {
    return <div className="p-6">No product data found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Payment Page</h1>

      {/* Product Info */}
      <div className="bg-white shadow-md p-4 rounded w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold">{state.battery.name}</h2>
        {state?.quantity &&<p>Quantity: {state.quantity}</p>}
        <p>Total: ₹{state.totalPrice}</p>
      </div>

      {/* Address Form */}
      {!purchaseComplete && !isProcessing && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-full max-w-md space-y-4">
          {/* <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
          <input type="text" name="name" required placeholder="Name" value={address.name} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="street" required placeholder="Street" value={address.street} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="city" required placeholder="City" value={address.city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="zip" required placeholder="ZIP Code" value={address.zip} onChange={handleChange} className="w-full border p-2 rounded" /> */}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
            Pay Now
          </button>
        </form>
      )}

      {/* SVG Loader */}
      {isProcessing && !purchaseComplete && (
        <div className="flex flex-col items-center mt-6">
          <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="mt-4 text-blue-600 font-medium">Processing Payment...</p>
        </div>
      )}

      {/* Tick GIF */}
    {purchaseComplete && (
  <div className="mt-6 text-center">
    <img src={tickGif} alt="Payment Successful" className="w-24 h-24 mx-auto" />
    <p className="text-green-600 font-semibold mt-4 text-xl">Payment Successful!</p>
    <p className="text-gray-700 mt-2">
      Your order has been forwarded to our supplier. Our team will contact you shortly to confirm the delivery details.
    </p>
    <p className="text-gray-700 mt-1">
      Thank you for your purchase!
    </p>
  </div>
)}

    </div>
  );
}

export default PaymentPage;
