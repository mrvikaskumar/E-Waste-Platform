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
// 🔄 CORS Configuration for Localhost and Production (Final Fix)
// =========================================================

// Allowed origins list, including the Vercel RegEx pattern:
const allowedOrigins = [
    'http://localhost:5173',
    'https://e-waste-platform.vercel.app', // Main production URL
    /https:\/\/(.*)\.vercel\.app$/,      // CRITICAL: Allows all Vercel preview/subdomains
];

const corsOptions = {
    // This custom function handles both strings and the RegEx pattern
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        // Check if the origin matches any of the patterns in the allowed list
        const isAllowed = allowedOrigins.some(pattern => {
            if (typeof pattern === 'string') {
                return pattern === origin; // Check for exact match
            } else {
                return pattern.test(origin); // Check if RegEx matches
            }
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: Origin ${origin} not in allowed list.`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // IMPORTANT for sending cookies/tokens
    optionsSuccessStatus: 200 // Handles the preflight OPTIONS request correctly
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