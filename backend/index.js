import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/dbConfig.js'
import portfolioRoute from './routes/portfolioRoutes.js'
import userRoute from './routes/userRoutes.js'
import middlewareRoute from './routes/middlewareRoute.js'




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/portfolio', portfolioRoute);
app.use('/api/user', userRoute);
app.use('/api/middleware', middlewareRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))