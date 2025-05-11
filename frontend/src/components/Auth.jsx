// components/auth.jsx
import axios from 'axios';

export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
 // console.log(token);
  if (!token) throw new Error('No token found');

  const res = await axios.get('https://resume-builder-backend-f2prj0j0t-srijan-s-projects-7fb3208a.vercel.app/api/middleware/protected-route', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
