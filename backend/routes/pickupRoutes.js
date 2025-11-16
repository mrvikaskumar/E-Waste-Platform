import express from "express";
import {
    createPickup,
    getPickerPickups,
    getUserPickups,
    acceptPickup,
    rejectPickup,
} from "../controllers/pickupController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// USER ROUTES
router.post("/", verifyToken, createPickup);
router.get("/user", verifyToken, getUserPickups);

// PICKER ROUTES
router.get("/picker", verifyToken, getPickerPickups);
router.put("/accept/:id", verifyToken, acceptPickup);
router.put("/reject/:id", verifyToken, rejectPickup);

export default router;
