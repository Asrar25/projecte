// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BatteryList from './pages/BatteryList';
import AddBattery from './pages/AddBattery';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import './App.css';
import AddCategory from './pages/AddCategory';
import Cart from './pages/Cart';
import Profile from './pages/profile';
import Orders from './pages/Orders';
import BatteryDetails from './pages/BatteryDetails';
import MyProduct from './pages/MyProduct';
import PaymentPage from './pages/PaymentPage';
import MyOrders from './pages/MyOrder';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with Sidebar */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Home />} />
        <Route path="batteries" element={<BatteryList />} />
        <Route path="add-battery" element={<AddBattery />} />
        <Route path="myProduct" element={<MyProduct />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/battery/:id" element={<BatteryDetails />} />
        <Route path="/payment" element={<PaymentPage />} />

      </Route>
    </Routes>
  );
}

export default App;
