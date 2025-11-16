import express from "express";
import Pickup from "../models/Pickup.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all pickups (admin only)
router.get("/pickups", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const pickups = await Pickup.find()
            .populate("user picker", "username email role")
            .sort({ createdAt: -1 });
        res.json(pickups);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all contacts (admin only)
router.get("/contacts", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all users (role = "user")
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all pickers (role = "picker")
router.get("/pickers", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const pickers = await User.find({ role: "picker" }).sort({ createdAt: -1 });
        res.json(pickers);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
