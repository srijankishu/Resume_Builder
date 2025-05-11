import express from 'express'
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/protected-route',protect, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route', user: req.user });
});

export default router;