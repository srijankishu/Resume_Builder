import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '../src/AuthContext/AuthContext.jsx';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <AuthProvider>
    <App />
  </AuthProvider>
)
