import React from "react";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">

            {/* Hero Section */}
            <section className="bg-green-200 text-green-900 py-20 text-center rounded-3xl shadow-lg mx-4 md:mx-12 mt-6">
                <h1 className="text-5xl font-extrabold mb-4">E-Waste Collection Platform</h1>
                <p className="text-xl max-w-2xl mx-auto">
                    Manage, recycle, and dispose of electronic waste responsibly.
                </p>
            </section>

            {/* Why Recycle Section */}
            <section className="max-w-6xl mx-auto py-16 px-6 space-y-8">
                <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Why Recycle E-Waste?</h2>
                <p className="text-green-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                    Electronic waste contains harmful chemicals that pollute soil, water, and air.
                    Responsible disposal ensures safe recycling and recovery of valuable materials,
                    protecting the environment and human health.
                </p>

                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-green-50 p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
                        <h3 className="font-semibold text-lg mb-2 text-green-800">Protect the Environment</h3>
                        <p className="text-green-700 text-sm">
                            Recycling e-waste prevents toxic chemicals from harming nature.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
                        <h3 className="font-semibold text-lg mb-2 text-green-800">Recover Valuable Materials</h3>
                        <p className="text-green-700 text-sm">
                            E-waste contains precious metals that can be reused efficiently.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
                        <h3 className="font-semibold text-lg mb-2 text-green-800">Support Sustainability</h3>
                        <p className="text-green-700 text-sm">
                            Responsible recycling helps promote a circular economy for electronics.
                        </p>
                    </div>
                </div>
            </section>

            {/* Hero Banner */}
            <div className="mx-4 md:mx-12 mt-12 rounded-2xl overflow-hidden">
                <HeroBanner />
            </div>
        </div>
    );
}
