import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [sent, setSent] = useState(false);
    const [messages, setMessages] = useState([]);
    const [role, setRole] = useState(localStorage.getItem("role")); // get user role

    // Fetch previous messages from backend (only for admin)
    useEffect(() => {
        const fetchMessages = async () => {
            if (role === "admin") {
                try {
                    const res = await fetch(`${API_BASE_URL}/contacts`);
                    const data = await res.json();
                    setMessages(data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchMessages();
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error("Failed to send message");

            const data = await res.json();

            // Only admin sees the messages immediately
            if (role === "admin") {
                setMessages([data, ...messages]);
            }

            setForm(initialForm);
            setSent(true);
            setTimeout(() => setSent(false), 3000);
        } catch (err) {
            console.error(err);
            alert("Error sending message.");
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-10">

                <h1 className="text-4xl font-bold text-green-800 text-center">Get in Touch</h1>
                <p className="text-center text-green-700">We would love to hear from you! Send us a message below.</p>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-green-500"
                    />
                    <textarea
                        placeholder="Your Message"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-green-500"
                        rows={5}
                    />
                    <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all shadow-md">
                        Send Message
                    </button>
                    {sent && <p className="text-green-600 text-center font-medium mt-2">Your message was sent successfully!</p>}
                </form>

                {/* Previous Messages (Only for admin) */}
                {role === "admin" && messages.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-green-800">Previous Messages</h2>
                        <ul className="space-y-3">
                            {messages.map((m) => (
                                <li key={m._id} className="bg-white rounded-xl shadow-md p-4 border border-green-200 hover:shadow-lg transition">
                                    <div className="flex justify-between items-center text-green-800 font-medium">
                                        <span>{m.name}</span>
                                        <span className="text-sm text-green-600">{new Date(m.created).toLocaleString()}</span>
                                    </div>
                                    <div className="text-green-700 mt-1 text-sm">{m.email}</div>
                                    <p className="text-green-800 mt-2">{m.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
