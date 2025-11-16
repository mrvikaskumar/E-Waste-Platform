// src/pages/admin/AdminStats.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AdminStats() {
    const [byType, setByType] = useState({});
    const [byLocation, setByLocation] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setByType(res.data.byType || {});
                setByLocation(res.data.byLocation || {});
            })
            .catch(console.error);
    }, []);

    const pieData = {
        labels: Object.keys(byType),
        datasets: [{ data: Object.values(byType), label: 'By type' }]
    };

    const barData = {
        labels: Object.keys(byLocation),
        datasets: [{ label: 'Pickups', data: Object.values(byLocation) }]
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Pickups by Type</h3>
                    <Pie data={pieData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Pickups by Location</h3>
                    <Bar data={barData} />
                </div>
            </div>
        </div>
    );
}
