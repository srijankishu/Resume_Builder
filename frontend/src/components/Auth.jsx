// components/auth.jsx
import axios from 'axios';

export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) throw new Error('No token found');

  const res = await axios.get('https://resume-builder-dzse.onrender.com/api/middleware/protected-route', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
