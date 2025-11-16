import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify JWT token and attach user to request
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user object without password
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware to allow only admins
export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
};

// Middleware to allow only pickers
export const verifyPicker = (req, res, next) => {
    if (!req.user || req.user.role !== "picker") {
        return res.status(403).json({ message: "Access denied: Pickers only" });
    }
    next();
};
