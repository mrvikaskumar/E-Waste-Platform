// src/pages/admin/AdminPickers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPickers() {
    const [pickers, setPickers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/admin/pickers", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setPickers(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Registered Pickers</h2>
            <ul className="space-y-2">
                {pickers.map(p => (
                    <li key={p._id} className="bg-white p-4 rounded shadow">
                        <div><strong>{p.username}</strong> ({p.email})</div>
                        <div className="text-sm text-gray-600">Joined: {new Date(p.createdAt).toLocaleDateString()}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
