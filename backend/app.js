// app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =========================================================
// 🔄 CORS Configuration for Localhost and Production
// =========================================================

// Allowed origins:
// 1. http://localhost:5173 - Your frontend dev server
// 2. The deployed URL (for production)
const allowedOrigins = [
    'http://localhost:5173',
    // You should add your deployed frontend URL here when available, 
    // e.g., 'https://e-waste-frontend-app.vercel.app'
];

const corsOptions = {
    // This allows localhost requests to your deployed Vercel API, 
    // AND handles the preflight OPTIONS request correctly.
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl) 
        // AND origins in our allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // IMPORTANT for sending cookies/tokens
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions)); // <-- Apply the customized configuration
app.use(express.json());
// =========================================================

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
    res.send("E-Waste Backend Running!");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));