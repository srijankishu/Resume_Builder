// backend/controllers/portfolioController.js
import axios from 'axios';
import Portfolio from '../models/Portfolio.js';  // Import the Portfolio model
import { geminiAPIUrl } from '../config/apiConfig.js';

// Function to generate portfolio and save it to the database
export const generatePortfolioFromGemini = async (req, res) => {
  try {
    const { name, role, about, skills, experience, projects, links } = req.body;

    //console.log("Incoming request body:", req.body); // Debug log

    // Ensure skills and links are arrays or treat them as strings
    const formattedSkills = Array.isArray(skills) ? skills.join(', ') : skills;
    const formattedLinks = Array.isArray(links) ? links.join(', ') : links;

    // Construct the prompt
    const prompt = `
      You are an expert in generating markdown-based personal portfolios.

      Generate a clean, modern, and professional markdown portfolio using the following details:

      

      Name: ${name}
      Role: ${role}
      About: ${about}
      Skills: ${formattedSkills}
      Experience: ${experience}
      Projects: ${projects}
      Links: ${formattedLinks}

      Output in markdown format only. Use section headings, bullet points, and clean formatting.
    `;

    // Request to Gemini API
    const response = await axios.post(geminiAPIUrl, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const portfolioContent =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No content generated';

    // Save to MongoDB
    const portfolio = new Portfolio({
      name,
      role,
      about,
      skills,
      experience,
      projects,
      links,
      portfolioContent, // Add this field to your schema if not added yet
    });

    await portfolio.save();

    res.status(201).json({
      success: true,
      portfolio,
      portfolioContent,
      message: 'Portfolio generated and saved successfully!',
    });
  } catch (error) {
    console.error('Error generating portfolio:', error.message, error.response?.data);
    res.status(500).json({
      success: false,
      message: 'Error generating portfolio. Please try again.',
    });
  }
};
