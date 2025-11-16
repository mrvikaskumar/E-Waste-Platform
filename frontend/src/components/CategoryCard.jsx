import React from "react";

export default function CategoryCard({ title, description, icon, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 cursor-pointer hover:scale-105 hover:shadow-xl transition-transform"
        >
            {icon && <div className="text-4xl mb-4">{icon}</div>}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
