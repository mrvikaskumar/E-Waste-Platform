import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function PickersPage() {
    const [pickers, setPickers] = useState([]);

    useEffect(() => {
        const fetchPickers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("${API_BASE_URL}/admin/pickers", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPickers(res.data);
            } catch (err) {
                console.error("AxiosError", err);
            }
        };
        fetchPickers();
    }, []);

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">All Pickers</h1>
            <div className="max-w-5xl mx-auto overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
                    <thead className="bg-green-700 text-white">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Registered At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickers.map((p, idx) => (
                            <tr key={p._id} className="text-green-800 border-b hover:bg-green-100 transition">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{p.username}</td>
                                <td className="px-4 py-2">{p.email}</td>
                                <td className="px-4 py-2">{p.role}</td>
                                <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
