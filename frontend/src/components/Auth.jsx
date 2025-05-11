// components/auth.jsx
import axios from 'axios';

export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
 // console.log(token);
  if (!token) throw new Error('No token found');

  const res = await axios.get('http://localhost:5001/api/middleware/protected-route', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
