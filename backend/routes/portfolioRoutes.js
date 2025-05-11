// backend/routes/portfolioRoutes.js
import express from 'express';
import { generatePortfolioFromGemini } from '../controllers/portfolioController.js';

const router = express.Router();

// Define your route for generating portfolios
router.post('/generate', generatePortfolioFromGemini);

export default router;


