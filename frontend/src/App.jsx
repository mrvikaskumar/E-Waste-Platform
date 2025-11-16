import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pickup from "./pages/Pickup";
import Awareness from "./pages/Awareness";
import Contact from "./pages/Contact";
import Statistics from "./pages/Statistics";
import Login from "./pages/login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import PickerDashboard from "./pages/PickerDashboard";
import PickerPickups from "./pages/PickerPickups";
import PickupDetails from "./pages/PickDetails";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/UsersPage";
import PickersPage from "./pages/PickersPage";
import PickupsPage from "./pages/PickupsPage";
import ContactsPage from "./pages/ContactsPage";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const handleStorage = () => setRole(localStorage.getItem("role"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      {role && <Navbar roleProp={role} />}
      <Routes>
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        {role === "user" && <>
          <Route path="/" element={<Home />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>}

        {/* Picker Routes */}
        {role === "picker" && <>
          <Route path="/picker-dashboard" element={<PickerDashboard />} />
          <Route path="/picker/pickups" element={<PickerPickups />} />
          <Route path="/picker/pickups/:id" element={<PickupDetails />} />
          <Route path="*" element={<Navigate to="/picker-dashboard" />} />
        </>}

        {/* Admin Routes */}
        {role === "admin" && <>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/pickers" element={<PickersPage />} />
          <Route path="/admin/pickups" element={<PickupsPage />} />
          <Route path="/admin/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/admin-dashboard" />} />
        </>}

        {/* Default Redirect */}
        {!role && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
