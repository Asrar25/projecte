import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import tickGif from '../assets/tick.gif';

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [gstPercent, setGstPercent] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
  });

  const userData = localStorage.getItem("userData");
  const storedUserData = userData ? JSON.parse(userData) : {};

  useEffect(() => {
    if (state?.totalPrice) {
      // Generate random GST % between 5 and 18
      const gst = Math.floor(Math.random() * (18 - 5 + 1)) + 5;
      setGstPercent(gst);

      // Calculate subtotal, GST amount, grand total
      const priceWithTax = parseFloat(state.totalPrice);
      const basePrice = priceWithTax / (1 + gst / 100);
      const gstValue = priceWithTax - basePrice;

      setSubtotal(basePrice.toFixed(2));
      setGstAmount(gstValue.toFixed(2));
      setGrandTotal(priceWithTax.toFixed(2));
    }
  }, [state?.totalPrice]);

  const handleChange = (e) => {
    setAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPurchaseComplete(false);

    try {
      const orderData = {
        productID: state.battery.id,
        price: state.totalPrice,
        source: state.battery.userID,
        destination: storedUserData.id,
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

  const handleDownloadReceipt = async (id, quantity,gstPercent) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/downloadReceipt/${id}/${quantity}/${gstPercent}/${storedUserData.id}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'payment-receipt.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  if (!state?.battery) {
    return <div className="p-6">No product data found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Payment Page</h1>

      {/* Product Info */}
      <div className="bg-white shadow-md p-4 rounded w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold">{state.battery.name}</h2>
        {state?.quantity && <p>Quantity: {state.quantity}</p>}
        {/* <p>Subtotal (before GST): ₹{subtotal}</p> */}
        <p>GST ({gstPercent}%): ₹{gstAmount}</p>
        <p className="font-semibold text-lg">Total (incl. GST): ₹{grandTotal}</p>
      </div>

      {/* Form */}
      {!purchaseComplete && !isProcessing && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-full max-w-md space-y-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
            Pay Now
          </button>
        </form>
      )}

      {/* Loader */}
      {isProcessing && !purchaseComplete && (
        <div className="flex flex-col items-center mt-6">
          <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="mt-4 text-blue-600 font-medium">Processing Payment...</p>
        </div>
      )}

      {/* Success Message */}
      {purchaseComplete && (
        <div className="mt-6 text-center">
          <img src={tickGif} alt="Payment Successful" className="w-24 h-24 mx-auto" />
          <p className="text-green-600 font-semibold mt-4 text-xl">Payment Successful!</p>
          <p className="text-gray-700 mt-2">
            Your order has been forwarded to our supplier. Our team will contact you shortly to confirm the delivery details.
          </p>
          <p className="text-gray-700 mt-1">Thank you for your purchase!</p>

          <button
            onClick={() => handleDownloadReceipt(state.battery.id, state.quantity,gstPercent)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download Receipt
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
