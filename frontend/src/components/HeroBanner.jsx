import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import heroImage from "../assets/hero-bg.jpg"; // make sure the image is in assets

const HeroBanner = () => {
    const navigate = useNavigate(); // ✅ initialize navigate

    const handleGetStarted = () => {
        navigate("/pickup"); // ✅ redirect to Pickup page
    };

    return (
        <section className="relative w-full h-[80vh] rounded-3xl overflow-hidden shadow-lg mb-10">
            {/* Background Image */}
            <img
                src={heroImage}
                alt="E-Waste Recycling"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-green-100/60" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 text-green-900">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
                    Manage Your E-Waste Responsibly
                </h1>

                <p className="mt-4 text-lg max-w-xl">
                    Recycle, sell, or request doorstep pickup for your old electronic devices.
                    Together we make the planet greener.
                </p>

                <button
                    onClick={handleGetStarted} // ✅ click handler added
                    className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 font-semibold rounded-lg transition-all"
                >
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default HeroBanner;
