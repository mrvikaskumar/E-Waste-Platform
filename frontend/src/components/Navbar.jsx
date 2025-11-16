import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ roleProp }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = roleProp || localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">E-Waste Platform</Link>

                {/* Picker Navbar */}
                {token && role === "picker" && (
                    <div className="flex gap-6 text-lg">
                        <Link to="/picker-dashboard" className="hover:text-yellow-300">Profile</Link>
                        <Link to="/picker/pickups" className="hover:text-yellow-300">Pickups</Link>
                        <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
                    </div>
                )}

                {/* Admin Navbar */}
                {token && role === "admin" && (
                    <div className="flex gap-6 text-lg">
                        <Link to="/admin/users" className="hover:text-yellow-300">Users</Link>
                        <Link to="/admin/pickers" className="hover:text-yellow-300">Pickers</Link>
                        <Link to="/admin/pickups" className="hover:text-yellow-300">Pickups</Link>
                        <Link to="/admin/contacts" className="hover:text-yellow-300">Messages</Link>
                        <Link to="/admin-dashboard" className="hover:text-yellow-300">Dashboard</Link>
                        <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
                    </div>
                )}

                {/* User Navbar */}
                {token && role === "user" && (
                    <div className="flex gap-6 text-lg">
                        <Link to="/" className="hover:text-yellow-300">Home</Link>
                        <Link to="/pickup" className="hover:text-yellow-300">Pickup</Link>
                        <Link to="/awareness" className="hover:text-yellow-300">Awareness</Link>
                        <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
                        <Link to="/user-dashboard" className="hover:text-yellow-300">Profile</Link>
                        <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
                    </div>
                )}

                {/* Guest Navbar */}
                {!token && (
                    <div className="flex gap-6 text-lg">
                        <Link to="/" className="hover:text-yellow-300">Home</Link>
                        <Link to="/login" className="hover:text-yellow-300">Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
