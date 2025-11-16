// src/components/RoleRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, allowed = [] }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return <Navigate to="/login" replace />;
    if (!allowed.includes(role)) return <Navigate to="/" replace />; // redirect to home if unauthorized
    return children;
}
