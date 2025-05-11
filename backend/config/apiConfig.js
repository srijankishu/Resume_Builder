// backend/config/apiConfig.js
import dotenv from 'dotenv';
dotenv.config();

// Exporting the Gemini API key from environment variables
export const geminiAPIKey = process.env.GEMINI_API_KEY;

// Constructing the Gemini API URL with correct version
export const geminiAPIUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
