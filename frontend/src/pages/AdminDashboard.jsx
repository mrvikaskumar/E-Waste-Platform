import React from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Admin Dashboard</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link to="/admin/users" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">Users</h2>
                    <p className="text-green-600">View all registered users</p>
                </Link>
                <Link to="/admin/pickers" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">Pickers</h2>
                    <p className="text-green-600">View all registered pickers</p>
                </Link>
                <Link to="/admin/pickups" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">Pickups</h2>
                    <p className="text-green-600">View all pickup requests</p>
                </Link>
                <Link to="/admin/contacts" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">Contacts</h2>
                    <p className="text-green-600">View all contact messages</p>
                </Link>
            </div>
        </div>
    );
}
