import React from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";

const TIPS = [
    { title: "Why E-Waste Matters", description: "E-waste contains hazardous materials like lead and mercury. Proper disposal prevents environmental contamination." },
    { title: "Prepare for Pickup", description: "Backup data, remove personal info, and separate batteries before requesting a pickup." },
    { title: "Donate or Repair", description: "If devices still work, consider donating or repairing to extend their life." },
    { title: "Recycle Responsibly", description: "Take your e-waste to certified recycling centers to ensure safe processing." }
];

export default function Awareness() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-10 px-4"
        >
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <section className="text-center">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">E-Waste Awareness</h1>
                    <p className="text-green-700">Learn how to manage electronic waste responsibly.</p>
                </section>

                {/* Tips Grid */}
                <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {TIPS.map((tip) => (
                        <motion.div
                            key={tip.title}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-green-800 mb-2">{tip.title}</h3>
                            <p className="text-green-700 text-sm">{tip.description}</p>
                        </motion.div>
                    ))}
                </section>

            </div>
        </motion.div>
    );
}
