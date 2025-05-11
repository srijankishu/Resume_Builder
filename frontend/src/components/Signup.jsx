import React, { useState } from 'react'
import axios from 'axios'
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Signup = () => {
   
   const navigate = useNavigate();
  const [formData,setformData] = useState({
   fullname: '',  
   email:'',
   password:'',
   role: 'user' 
  })

const handleChange = (e) => {
  setformData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
 
const handleSubmit = async(e)=>{
  e.preventDefault();
    try{
      const res = await axios.post("https://resume-builder-backend-f2prj0j0t-srijan-s-projects-7fb3208a.vercel.app/api/user/signup", formData);
      //console.log("Signup success:", res.data);
      toast.success('Signup successful');
    }catch(error){
      console.error('Error during signup:', error.response?.data || error.message);
      toast.error("Signup Failed")
    }
} 


  
  return (
  <div className="bg-white/10 backdrop-blur-md p-8 shadow-lg w-full max-w-md rounded-lg">
   <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
  <h2 className="text-3xl font-bold text-center text-white border-b-2 mx-auto">Sign Up</h2>

<input
  type="text"
  name="fullname"  // ✅ crucial
  placeholder="Name"
  className="bg-transparent border-b border-white/50 focus:border-white text-white placeholder-white outline-none py-2 transition duration-200"
  value={formData.fullname} // ✅ controlled input
  onChange={handleChange}
/>

<input
  type="email"
  name="email" // ✅
  placeholder="Email"
  className="bg-transparent border-b border-white/50 focus:border-white text-white placeholder-white outline-none py-2 transition duration-200"
  value={formData.email} // ✅
  onChange={handleChange}
/>

<input
  type="password"
  name="password" // ✅
  placeholder="Password"
  className="bg-transparent border-b border-white/50 focus:border-white text-white placeholder-white outline-none py-2 transition duration-200"
  value={formData.password} // ✅
  onChange={handleChange}
/>

    <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
        Submit
    </button>

    <p className="text-sm text-center text-white/80">
      Already have an account?{" "}
    </p>
  </form>
</div>

  )
}

export default Signup;
