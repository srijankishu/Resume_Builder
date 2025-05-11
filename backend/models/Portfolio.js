import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      about: {
        type: String,
        required: true,
      },
      skills: {
        type: [String],
      },
      experience: {
        type: String,
      },
      projects: {
        type: String,
      },
      links: {
        type: [String],
      },
      portfolioContent: {  
        type: String,
      },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;

