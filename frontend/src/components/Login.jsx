import React, { useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContext.jsx';
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://resume-builder-backend-three.vercel.app/api/user/login', formData);
     // console.log('Login successful:', res.data);
      toast.success('Login successful');
      
      login(res.data.token); 
      document.getElementById('my_modal_3').close(); // Close modal on success
     // navigate("/form");
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      toast.error("Login Failed")
    }
  };

  return (
    <>
  <button
        className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        Login
  </button>
  <div className=' '>
  <dialog id="my_modal_3" className="modal fixed inset-0 flex items-center justify-center z-50 bg-black/50">
  <div className="modal-box bg-black text-white p-8 rounded-lg max-w-md w-full mx-auto">
    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
    <button
        type="button"
        onClick={() => document.getElementById('my_modal_3').close()}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
    </button>

    <form onSubmit={handleSubmit} className="space-y-4 ">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full bg-transparent border-b border-gray-400 py-2 placeholder-gray-400 focus:outline-none"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full bg-transparent border-b border-gray-400 py-2 placeholder-gray-400 focus:outline-none"
        value={formData.password}
        onChange={handleChange}
      />
      <div className="flex justify-between pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
       
      </div>
    </form>
  </div>
</dialog>
</div>

    </>
  );
};

export default Login;
