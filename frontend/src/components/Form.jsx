import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


const Form = () => {

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        about: "",
        skills: "",
        experience: "",
        projects: "",
        links: "",
    })
   
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // You might have missed importing 'useNavigate'

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      // Convert skills and links to arrays if they're not already
      const formattedData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()), // Split the skills by commas
        links: formData.links.split(',').map(link => link.trim())   // Split the links by commas
      };

      try {
        const res = await axios.post("http://localhost:5001/api/portfolio/generate", formattedData);
        console.log(res.data)
        navigate("/preview", { state: { markdown: res.data.portfolioContent } }); 
      } catch (err) {
        console.error("Error submitting form:", err); // Log error for debugging
        alert("Something went wrong. Try again!");
      } finally {
        setLoading(false);
      }
    };
    
  return (

    
    
   <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-3xl mt-12 border border-gray-200">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">🚀 Generate Your AI Portfolio</h2>
      <Link to="/">
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          ← Back
        </button>
      </Link>
    </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    {["name", "role", "about", "skills", "experience", "projects", "links"].map((field) => (
      <div key={field}>
        <label className="block text-sm text-gray-600 font-semibold mb-2 capitalize">{field}</label>
        <textarea
          name={field}
          rows={field === "about" || field === "experience" || field === "projects" ? 3 : 1}
          className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
          placeholder={`Enter your ${field}`}
          onChange={handleChange}
          required
        />
      </div>
    ))}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate Portfolio"}
    </button>
  </form>
</div>

  )
}

export default Form;
