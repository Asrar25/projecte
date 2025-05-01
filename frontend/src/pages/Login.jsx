import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   
    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:8000/api/login', {
            email,
            password,
          });
      
          // Assuming the backend returns a token upon successful login
        //   const { token } = response.data;
      
        //   // Store the token in localStorage or any state management library
        //   localStorage.setItem('authToken', token);
        toast.success('Login Successfully', {
          position: "top-right",
          autoClose: 1000, // Increase time for toast visibility
        });
        
        localStorage.setItem('userEmail', email);
        
        setIsAuthenticated(true);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

        } catch (error) {
          toast.error('Login failed. Please check your credentials and try again.', {
            position: "top-right",
            autoClose: 1000,
          });
        }
      };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
  {/* Left: Login Form */}
  <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-8">
    <div className="max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="#" onClick={handleSignupClick} className="font-medium text-blue-600 hover:text-blue-500">
          Sign up
        </a>
      </p>
    </div>
  </div>

  {/* Right: Image */}
  <div className="md:w-1/2 w-full h-64 md:h-auto">
    <img
      src="/logo.jpg"
      alt="Login illustration"
      className="w-full h-full object-cover"
    />
    
  </div>
  <ToastContainer />
</div>

  );
}

export default Login;
