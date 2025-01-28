import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.Routes.js';
import recordRoutes from './routes/record.routes.js';

dotenv.config();

const app = express();

// Set up CORS middleware
const allowedOrigins = [
  'http://localhost:3000', // Frontend URL for development
  'http://localhost:5173', // Update this with the correct frontend URL if needed
];

app.use(
  cors({
    origin: allowedOrigins, // Allow both origins
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
  })
);

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data (needed for form submissions)

// Connect to Database
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/records', recordRoutes);  // Add the record routes

// Serve static files (if necessary)
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
