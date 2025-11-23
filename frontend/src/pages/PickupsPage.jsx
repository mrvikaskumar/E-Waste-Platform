import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function PickupsPage() {
    const [pickups, setPickups] = useState([]);

    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const token = localStorage.getItem("token"); // admin token
                const res = await axios.get(`${API_BASE_URL}/admin/pickups`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPickups(res.data);
            } catch (err) {
                console.error("AxiosError", err);
            }
        };
        fetchPickups();
    }, []);

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">All Pickups</h1>
            <div className="max-w-6xl mx-auto overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
                    <thead className="bg-green-700 text-white">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Picker</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Waste Types</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickups.map((p, idx) => (
                            <tr key={p._id} className="text-green-800 border-b hover:bg-green-100 transition">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{p.user?.username || "N/A"}</td>
                                <td className="px-4 py-2">{p.picker?.username || "Unassigned"}</td>
                                <td className="px-4 py-2">{p.address}</td>
                                <td className="px-4 py-2">{p.wasteTypes.join(", ")}</td>
                                <td className="px-4 py-2">{p.status || "Pending"}</td>
                                <td className="px-4 py-2">{new Date(p.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
