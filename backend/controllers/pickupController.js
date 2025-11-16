import Pickup from "../models/Pickup.js";

// Create a pickup (USER)
export const createPickup = async (req, res) => {
    try {
        const { address, wasteTypes, notes } = req.body;

        if (!address || !wasteTypes || wasteTypes.length === 0) {
            return res.status(400).json({ message: "Address and waste types are required" });
        }

        const newPickup = new Pickup({
            user: req.user._id, // logged-in user
            address,
            wasteTypes,
            notes,
        });

        const savedPickup = await newPickup.save();
        res.status(201).json(savedPickup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get pickups of logged-in user
export const getUserPickups = async (req, res) => {
    try {
        const pickups = await Pickup.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(pickups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Picker routes
export const getPickerPickups = async (req, res) => {
    try {
        const pickups = await Pickup.find({ picker: req.user._id }).sort({ createdAt: -1 });
        res.json(pickups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const acceptPickup = async (req, res) => {
    try {
        const pickup = await Pickup.findById(req.params.id);
        if (!pickup) return res.status(404).json({ message: "Pickup not found" });

        pickup.status = "Accepted";
        pickup.picker = req.user._id;
        await pickup.save();
        res.json(pickup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const rejectPickup = async (req, res) => {
    try {
        const pickup = await Pickup.findById(req.params.id);
        if (!pickup) return res.status(404).json({ message: "Pickup not found" });

        pickup.status = "Rejected";
        await pickup.save();
        res.json(pickup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
