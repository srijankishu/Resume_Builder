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
You are an expert portfolio writer and personal branding specialist.

Generate a professional portfolio in MARKDOWN format.

Requirements:

- Return ONLY markdown.
- Do not wrap the response in code blocks.
- Create a professional portfolio suitable for recruiters.
- Use proper markdown headings.
- Make the portfolio visually structured.
- Generate realistic experience and project descriptions when details are limited.
- Convert skills into categorized bullet points.
- Make links clickable using markdown syntax.
- Use a confident and professional tone.

Portfolio Structure:

# Full Name

## Professional Title

## About Me

Write a professional summary of 4-6 lines.

## Skills

Categorize skills like:

### Programming Languages
- Skill

### Frameworks & Libraries
- Skill

### Databases
- Skill

### Tools & Technologies
- Skill

## Experience

For each experience generate:

### Role Name

- Achievement 1
- Achievement 2
- Achievement 3

## Projects

For each project generate:

### Project Name

Brief description.

**Technologies Used:**
- Technology 1
- Technology 2

**Key Features:**
- Feature 1
- Feature 2
- Feature 3

## Links

Display all links as clickable markdown links.

## Why Hire Me

Generate a short recruiter-focused section highlighting strengths and impact.

User Information:

Name: ${name}

Role: ${role}

About: ${about}

Skills: ${formattedSkills}

Experience: ${experience}

Projects: ${projects}

Links: ${formattedLinks}
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
    console.log(portfolioContent);

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
