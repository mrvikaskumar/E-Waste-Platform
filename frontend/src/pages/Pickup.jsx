import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";

const WASTE_OPTIONS = ["Laptop", "Phone", "Battery", "Charger"];
const initialForm = { name: "", phone: "", address: "", notes: "", wasteTypes: [] };

export default function Pickup() {
    const [form, setForm] = useState(initialForm);
    const [saved, setSaved] = useState([]);
    const [msg, setMsg] = useState("");

    // Fetch pickups from backend
    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/pickups/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setSaved(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPickups();
    }, []);

    const toggleWaste = (type) => {
        setForm((prev) => ({
            ...prev,
            wasteTypes: prev.wasteTypes.includes(type)
                ? prev.wasteTypes.filter((t) => t !== type)
                : [...prev.wasteTypes, type],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const payload = {
                address: form.address,
                wasteTypes: form.wasteTypes,
                notes: form.notes,
            };

            const res = await fetch(`${API_BASE_URL}/pickups`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save pickup request");

            const data = await res.json();
            setSaved([data, ...saved]);
            setForm(initialForm);
            setMsg("Pickup request saved successfully.");
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            console.error(err);
            setMsg("Error saving pickup request.");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-10 px-4"
        >
            <div className="max-w-4xl mx-auto space-y-10">
                <h1 className="text-3xl font-bold text-green-800 text-center">Request E-Waste Pickup</h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    <textarea
                        placeholder="Pickup Address"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
                        rows={3}
                    />

                    <div>
                        <p className="font-medium mb-2 text-green-800">Select Waste Types</p>
                        <div className="flex gap-2 flex-wrap">
                            {WASTE_OPTIONS.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => toggleWaste(t)}
                                    className={`px-3 py-1 rounded-full border transition ${form.wasteTypes.includes(t)
                                        ? "bg-green-500 text-white"
                                        : "bg-white border-green-200 text-green-700 hover:bg-green-100"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <textarea
                        placeholder="Notes (optional)"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
                        rows={2}
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition shadow-md"
                    >
                        Submit Request
                    </button>
                    {msg && <p className="text-green-600 text-center font-medium mt-2">{msg}</p>}
                </form>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-green-800">Your Pickup Requests</h2>
                    {saved.length === 0 ? (
                        <p className="text-green-700 font-medium text-center py-4 border border-green-200 rounded-xl bg-green-50">
                            No pickups requested yet.
                        </p>
                    ) : (
                        <ul className="space-y-3">
                            {saved.map((s) => (
                                <li
                                    key={s._id}
                                    className="bg-white rounded-2xl p-4 shadow-md border border-green-200 hover:shadow-lg transition"
                                >
                                    <div className="flex justify-between text-green-800 font-medium">
                                        <span>{form.name}</span>
                                        <span className="text-sm text-green-600">
                                            {new Date(s.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="text-green-700 mt-1">{s.address}</div>
                                    <div className="text-green-800 mt-1">
                                        Types: {s.wasteTypes.join(", ")}
                                    </div>
                                    {s.notes && (
                                        <div className="text-green-600 mt-1 font-medium">
                                            Notes: {s.notes}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
