import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function PickerPickups() {
    const [pickups, setPickups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const dummyPickups = [
            { _id: "1", user: { username: "John Doe" }, address: "123 Street", wasteTypes: ["Plastic"], status: "Accepted", updatedAt: new Date() },
            { _id: "2", user: { username: "Jane Smith" }, address: "456 Avenue", wasteTypes: ["Metal"], status: "Rejected", updatedAt: new Date() },
            { _id: "3", user: { username: "Bob Lee" }, address: "789 Road", wasteTypes: ["E-waste"], status: "Pending", updatedAt: new Date() },
            { _id: "4", user: { username: "Alice Green" }, address: "101 Blvd", wasteTypes: ["Paper"], status: "Accepted", updatedAt: new Date() }
        ];
        setPickups(dummyPickups);
    }, []);

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Your Pickups</h1>
                <ul className="space-y-4">
                    {pickups.map(p => (
                        <li
                            key={p._id}
                            className="bg-white p-6 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition cursor-pointer"
                            onClick={() => navigate(`/picker-pickups/${p._id}`)}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium text-green-800"><strong>User:</strong> {p.user.username}</p>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${p.status === "Accepted" ? "bg-green-100 text-green-800" :
                                        p.status === "Rejected" ? "bg-red-100 text-red-600" :
                                            "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {p.status}
                                </span>
                            </div>
                            <p className="text-green-700 mt-1"><strong>Address:</strong> {p.address}</p>
                            <p className="text-green-800 mt-1"><strong>Types:</strong> {p.wasteTypes.join(", ")}</p>
                            <p className="text-sm text-green-500 mt-1">{new Date(p.updatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
