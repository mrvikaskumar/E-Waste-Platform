import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("${API_BASE_URL}/auth/register", {
                username,
                email,
                password,
                role
            });

            alert("Registered successfully! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.error("REGISTER AXIOS ERROR:", err.response?.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
                    Register
                </h1>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border rounded-xl"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-xl"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-xl"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border rounded-xl"
                    >
                        <option value="user">User</option>
                        <option value="picker">Picker</option>

                    </select>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white rounded-xl"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center mt-4 text-green-700">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-green-600 underline"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
