// Sidebar.jsx
import React, { useState } from "react";
import { FaHome, FaUser, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("home");

  const handleItemClick = (item) => {
    setActive(item);
  };

  return (
    <div className="w-72 h-screen bg-white shadow-lg flex flex-col">
      {/* Логотип */}
      <div className="text-2xl font-bold text-center py-6 bg-gray-100 text-gray-800">
        MyApp
      </div>

      {/* Меню */}
      <ul className="flex-1 px-4 py-6 space-y-2">
        {/* Home */}
        <NavLink to={'/admin'}>
          <li
            className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${active === "home" ? "bg-gray-100 text-blue-600" : "text-gray-700"
              }`}
            onClick={() => handleItemClick("home")}
          >
            <FaHome className="text-xl mr-3" />
            <span className="text-sm">Home</span>
          </li>
        </NavLink>

        {/* Profile */}
        <NavLink to={'/admin/user'}>
          <li
            className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${active === "profile" ? "bg-gray-100 text-blue-600" : "text-gray-700"
              }`}
            onClick={() => handleItemClick("profile")}
          >
            <FaUser className="text-xl mr-3" />
            <span className="text-sm">User</span>
          </li>
        </NavLink>

        {/* File */}
        <NavLink to={'/admin/file'}>
          <li
            className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${active === "file" ? "bg-gray-100 text-blue-600" : "text-gray-700"
              }`}
            onClick={() => handleItemClick("file")}
          >
            <FaFileAlt className="text-xl mr-3" />
            <span className="text-sm">File</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}