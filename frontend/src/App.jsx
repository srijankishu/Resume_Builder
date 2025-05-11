
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Form from './components/Form';
import PortfolioPreview from './components/PortfolioPreview';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';



function App() {


  return (
    <>
      <Toaster/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/preview" 
          element={
          <ProtectedRoute>
            <PortfolioPreview/>
          </ProtectedRoute>
          }/>
        <Route  path="/form"
          element={
            <ProtectedRoute>
              <Form/>
            </ProtectedRoute>
          }/> 
        <Route path="/login" element={<Login/>}/> 
        
      </Routes>
    </Router>
    </>
  )
}

export default App
