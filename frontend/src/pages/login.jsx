import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config"; // <-- IMPORT ADDED

export default function Login({ setRole }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });

            const { token, user } = res.data;

            console.log("Logged in user:", user); // debug user object

            // Save credentials in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);

            // Update parent role state
            setRole(user.role);

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin-dashboard");
            } else if (user.role === "picker") {
                navigate("/picker-dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error("LOGIN AXIOS ERROR:", err);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Login</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white rounded-xl"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4 text-green-700">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-green-600 underline"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
