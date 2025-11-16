import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who requested
        picker: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // assigned picker
        address: { type: String, required: true },
        wasteTypes: { type: [String], required: true },
        notes: { type: String },
        status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Pickup", pickupSchema);
