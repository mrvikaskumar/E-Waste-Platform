import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function UserDashboard() {
    const [user, setUser] = useState(null);
    const [pickups, setPickups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const resUser = await axios.get("${API_BASE_URL}/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(resUser.data);

                const resPickups = await axios.get("${API_BASE_URL}/pickups/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPickups(resPickups.data);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* User Info */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-green-200 mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-4">Welcome, {user?.username}</h1>
                    <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Role:</strong> {user?.role}</p>
                </div>

                {/* Pickup Requests */}
                <div>
                    <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-4h6v4m2 0a2 2 0 01-2 2H9a2 2 0 01-2-2v-4h10v4z" />
                        </svg>
                        Your Pickup Requests
                    </h2>

                    {pickups.length === 0 ? (
                        <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-2xl flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m2-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                            <span>No pickups requested yet.</span>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {pickups.map(p => (
                                <li key={p._id} className="bg-white p-4 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition duration-200">
                                    <p><strong>Address:</strong> {p.address}</p>
                                    <p><strong>Waste Types:</strong> {p.wasteTypes.join(", ")}</p>
                                    <p><strong>Status:</strong> <span className={`font-semibold ${p.status === "Completed" ? "text-green-600" : "text-orange-500"}`}>{p.status}</span></p>
                                    <p className="text-sm text-green-500 mt-1">Requested on: {new Date(p.createdAt).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
