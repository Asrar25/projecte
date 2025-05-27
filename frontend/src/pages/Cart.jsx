import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [battery, setBattery] = useState([]);
  
 const navigate = useNavigate();
  
  const products = localStorage.getItem("products");
  const storedProducts = products ? JSON.parse(products) : [];

  const userData = localStorage.getItem("userData");
  const storedUserData = products ? JSON.parse(userData) : [];
  
  // Fetch cart data from backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cart/get/${storedUserData.id}`); // Replace with your actual API URL
        setCartItems(response.data.data); // Assuming API returns an array of cart items
         const userProducts = storedProducts.filter(product => product.id == response.data.data.product_id);
        setBattery(userProducts);
      } catch (err) {
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleBuyNow = ()=>{
    navigate('/payment');
  };

  const handleQtyChange = async (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id == id ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updatedItems);
  };
   const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
   
  console.log("Cart :",cartItems);

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col md:flex-row bg-cover bg-center">
      <div className="flex-1 ml-20 md:ml-64 transition-all duration-300 flex flex-col min-h-screen justify-center items-center">
        <div className="w-full max-w-xl p-6 rounded-lg shadow-lg bg-white bg-opacity-90">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading cart...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map(({ id, product_id, quantity, price }) => (
              <div
                key={id}
                className="flex justify-between items-center bg-white p-4 rounded border border-gray-300 mb-3"
              >
                <div>
                   {storedProducts.find(product => product.id == product_id)?.name}
                  <p className="text-sm text-gray-500">₹{price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQtyChange(id, e.target.value)}
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                  <p className="text-sm font-medium text-gray-700">₹{quantity * price}</p>
                </div>
              </div>
            ))
          )}

          <div className="text-right font-bold text-lg text-gray-800 mt-2">
            Total: ₹{totalPrice}
          </div>

          <form className="mt-6 space-y-3">
            <button
            // onClick={() =>
            //     navigate("/payment", {
            //       state: {
            //         battery,
            //         totalPrice,
            //       },
            //     })
            //   }
               type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium">
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
