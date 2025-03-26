// AdminNavbar.jsx
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function AdminNavbar() {

    const Exit = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <nav className="w-full h-16 bg-white shadow-md flex items-center justify-end px-6">
            <button
                className="flex items-center p-2 rounded-md cursor-pointer bg-[#e8e8e8] hover:bg-red-100 text-red-600"
                onClick={Exit}
            >
                <FaSignOutAlt className="text-lg mr-2" />
                <span className="text-sm">Logout</span>
            </button>
        </nav>
    );
}