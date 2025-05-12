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

     Generate a clean, modern, and professional markdown portfolio using the following user input. 
     Use a confident yet humble tone, targeting technical recruiters and hiring managers. Do not ask for additional information or suggest improvements—generate everything from what's given.

     Automatically create project and experience descriptions if they're not provided.

     Use this structure:
     1. Name & Role
     2. About Me
     3. Skills
     4. Experience
     5. Projects
     6. Links

     Use markdown format with proper headings (##), bullet points for skills and tasks, and make links clickable using [Label](URL) format.

     If a project has only a title, generate a 2-3 sentence summary based on common conventions. For experiences with limited detail, infer realistic achievements and tasks for the role.

     ---
     Name: ${name}
     Role: ${role}
     About: ${about}
     Skills: ${formattedSkills}
     Experience: ${experience}
     Projects: ${projects}
     Links: ${formattedLinks}
     ---
     Output in markdown only.`;

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
