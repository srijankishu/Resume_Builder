import { useNavigate,Link } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/Login";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import { useEffect,useState,useContext } from "react";


const Home = () => {
  const navigate = useNavigate();

 const { isLoggedIn, logout } = useContext(AuthContext);


  
  

  const handleStartClick = () => {
    navigate("/form"); 
  };

  

  return (
   
  <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-blue-500 to-teal-500 p-6 flex justify-center items-center text-white">
  <div className="flex flex-col md:flex-row items-center md:items-start gap-12 max-w-6xl w-full">
    
    {/* Left Section: Heading and Button */}
    <div className="flex-1 text-center md:text-left ">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Resume Builder</h1>
      <p className="text-lg mb-8">
        Build your personal resume website using AI! Simply provide some details, and let AI create a beautiful portfolio for you.
      </p>

      <img src="https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F4093531%2Fcover_image%2Fregular_1708x683%2Fimage_0__2_-7d79d545a0c4d4ebb4e69ea2508dc62e.png" alt="" 
      className="rounded-lg w-full max-w-md mx-auto md:mx-0"
      />
      {isLoggedIn ? (
            <>
              
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md mt-4 "
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex mt-5">
              <Login />
            </div>
          )}
     
    </div>
       
    {/* Right Section: Signup */}
    <div className="flex-1 w-full">
     {isLoggedIn?
      <div className="bg-white/10 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">You're Logged In!</h2>
      <p className="mb-4 text-white/80">
        Ready to build your personalized AI-generated resume? Click below to get started.
      </p>
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20220314/pngtree-blue-background-simple-office-glasses-mobile-phone-creative-pictures-resume-work-image_1048168.jpg"
        alt="Portfolio Illustration"
        className="w-full max-w-sm mx-auto mb-4 rounded-lg"
      />
      <button
        onClick={handleStartClick}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-xl font-semibold w-full transition"
      >
        Start Building
      </button>
    </div>
        :<Signup />} 
    </div>
  </div>
</div>

  
  
  );
};

export default Home;
