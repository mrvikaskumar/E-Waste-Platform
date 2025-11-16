// src/pages/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setUsers(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
            <ul className="space-y-2">
                {users.map(u => (
                    <li key={u._id} className="bg-white p-4 rounded shadow">
                        <div><strong>{u.username}</strong> ({u.email})</div>
                        <div className="text-sm text-gray-600">Role: {u.role}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
