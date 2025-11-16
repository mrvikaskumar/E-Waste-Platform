import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/admin/contacts", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContacts(res.data);
            } catch (err) {
                console.error("AxiosError", err);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Contact Messages</h1>
            <div className="max-w-5xl mx-auto space-y-4">
                {contacts.map((c, idx) => (
                    <div key={c._id} className="bg-white p-4 rounded-2xl shadow-md border border-green-200">
                        <div className="flex justify-between mb-2">
                            <p className="font-medium text-green-800">{c.name}</p>
                            <span className="text-sm text-green-500">{new Date(c.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-green-700"><strong>Email:</strong> {c.email}</p>
                        <p className="text-green-800 mt-1">{c.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
