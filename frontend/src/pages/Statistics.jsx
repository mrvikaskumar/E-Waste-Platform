import React from "react";
import { motion } from "framer-motion";

export default function Statistics() {
    const stats = [
        { label: "Pickups Today", value: 12 },
        { label: "Total Pickups", value: 134 },
        { label: "Messages Received", value: 45 },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 py-10 space-y-6">
            <h1 className="text-3xl font-bold">Statistics</h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                        <h2 className="text-3xl font-bold">{s.value}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">{s.label}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
