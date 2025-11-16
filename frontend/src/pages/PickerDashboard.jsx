import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PickerDashboard() {
    const [picker, setPicker] = useState(null);
    const [pickups, setPickups] = useState([]);
    const navigate = useNavigate();

    // Dummy pickups for demo
    const dummyPickups = [
        { _id: 1, user: { username: "John Doe" }, address: "123 Street", wasteTypes: ["Plastic"], status: "Accepted", updatedAt: new Date() },
        { _id: 2, user: { username: "Jane Smith" }, address: "456 Avenue", wasteTypes: ["Metal"], status: "Rejected", updatedAt: new Date() },
        { _id: 3, user: { username: "Bob Lee" }, address: "789 Road", wasteTypes: ["E-waste"], status: "Pending", updatedAt: new Date() },
        { _id: 4, user: { username: "Alice Green" }, address: "101 Blvd", wasteTypes: ["Paper"], status: "Accepted", updatedAt: new Date() }
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const resPicker = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPicker(resPicker.data);

                // For demo, using dummy data
                setPickups(dummyPickups);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    // Stats calculation
    const totalAccepted = pickups.filter(p => p.status === "Accepted").length;
    const totalRejected = pickups.filter(p => p.status === "Rejected").length;
    const totalPending = pickups.filter(p => p.status === "Pending").length;
    const totalPickups = pickups.length;

    const pieData = {
        labels: ["Accepted", "Rejected", "Pending"],
        datasets: [
            {
                data: [totalAccepted, totalRejected, totalPending],
                backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Profile Card */}
                <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200 flex flex-col md:flex-row md:justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-green-800 mb-2">{picker?.username || "Picker Name"}</h1>
                        <p className="text-green-700 mb-1"><strong>Email:</strong> {picker?.email || "picker@example.com"}</p>
                        <p className="text-green-700 mb-1"><strong>Phone:</strong> +91 9876543210</p>
                        <p className="text-green-700 mb-1"><strong>Address:</strong> 123 Demo Street, City</p>
                        <p className="text-green-700"><strong>Join Date:</strong> Jan 1, 2023</p>
                    </div>

                    {/* Stats Boxes */}
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <div className="bg-green-100 text-green-800 px-6 py-4 rounded-xl text-center shadow-md">
                            <p className="text-lg font-semibold">Accepted</p>
                            <p className="text-2xl font-bold">{totalAccepted}</p>
                        </div>
                        <div className="bg-red-100 text-red-800 px-6 py-4 rounded-xl text-center shadow-md">
                            <p className="text-lg font-semibold">Rejected</p>
                            <p className="text-2xl font-bold">{totalRejected}</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 px-6 py-4 rounded-xl text-center shadow-md">
                            <p className="text-lg font-semibold">Pending</p>
                            <p className="text-2xl font-bold">{totalPending}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-6 py-4 rounded-xl text-center shadow-md">
                            <p className="text-lg font-semibold">Total</p>
                            <p className="text-2xl font-bold">{totalPickups}</p>
                        </div>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Pickup Status Distribution</h2>
                    <Pie data={pieData} />
                </div>

                {/* Pickups Table */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Pickups Details</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse text-left">
                            <thead>
                                <tr className="bg-green-100 text-green-800">
                                    <th className="px-4 py-2">User</th>
                                    <th className="px-4 py-2">Address</th>
                                    <th className="px-4 py-2">Types</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pickups.map(p => (
                                    <tr key={p._id} className="border-b border-green-200 hover:bg-green-50 transition">
                                        <td className="px-4 py-2">{p.user.username}</td>
                                        <td className="px-4 py-2">{p.address}</td>
                                        <td className="px-4 py-2">{p.wasteTypes.join(", ")}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-sm font-medium
                        ${p.status === "Accepted" ? "bg-green-200 text-green-800" :
                                                    p.status === "Rejected" ? "bg-red-200 text-red-800" :
                                                        "bg-yellow-200 text-yellow-800"}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{new Date(p.updatedAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
