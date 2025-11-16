import express from "express";
import Pickup from "../models/Pickup.js";
import User from "../models/User.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only: get all pickups
router.get("/pickups", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const pickups = await Pickup.find()
            .sort({ createdAt: -1 })
            .populate("user", "username email role")
            .populate("picker", "username email role");
        res.json(pickups);
    } catch (err) {
        console.error("Pickups fetch error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
