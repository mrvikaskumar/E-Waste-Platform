import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PickupDetails() {
    const { id } = useParams(); // pickup id from URL
    const navigate = useNavigate();
    const [pickup, setPickup] = useState(null);

    useEffect(() => {
        // Dummy data (same as PickerPickups)
        const dummyPickups = [
            { _id: "1", user: { username: "John Doe", email: "john@example.com" }, address: "123 Street", wasteTypes: ["Plastic"], status: "Accepted", updatedAt: new Date() },
            { _id: "2", user: { username: "Jane Smith", email: "jane@example.com" }, address: "456 Avenue", wasteTypes: ["Metal"], status: "Rejected", updatedAt: new Date() },
            { _id: "3", user: { username: "Bob Lee", email: "bob@example.com" }, address: "789 Road", wasteTypes: ["E-waste"], status: "Pending", updatedAt: new Date() },
            { _id: "4", user: { username: "Alice Green", email: "alice@example.com" }, address: "101 Blvd", wasteTypes: ["Paper"], status: "Accepted", updatedAt: new Date() }
        ];

        const found = dummyPickups.find(p => p._id === id);
        if (!found) {
            alert("Pickup not found");
            navigate("/picker-pickups");
            return;
        }
        setPickup(found);
    }, [id, navigate]);

    if (!pickup) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-green-200">
                <h1 className="text-3xl font-bold text-green-800 mb-6">Pickup Details</h1>
                <p className="mb-2"><strong>User Name:</strong> {pickup.user.username}</p>
                <p className="mb-2"><strong>User Email:</strong> {pickup.user.email}</p>
                <p className="mb-2"><strong>Address:</strong> {pickup.address}</p>
                <p className="mb-2"><strong>Waste Types:</strong> {pickup.wasteTypes.join(", ")}</p>
                <p className="mb-2"><strong>Status:</strong> {pickup.status}</p>
                <p className="mb-2"><strong>Last Updated:</strong> {new Date(pickup.updatedAt).toLocaleString()}</p>
                <button
                    className="mt-4 py-2 px-4 bg-green-500 text-white rounded-xl hover:bg-green-600"
                    onClick={() => navigate("/picker-pickups")}
                >
                    Back
                </button>
            </div>
        </div>
    );
}
