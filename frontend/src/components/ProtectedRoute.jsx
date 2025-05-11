import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) return   <div className="flex items-center justify-center h-screen text-2xl text-gray-700">
        <div className="animate-pulse text-center">
          <p className="font-semibold text-indigo-600">Please Log In</p>
          <p className="text-gray-500 mt-2">You need to log in to access this content.</p>
        </div>
      </div> // Or a spinner

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
