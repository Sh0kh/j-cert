// Sidebar.jsx
import React from "react";
import { FaHome, FaUser, FaFileAlt } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../../img/big-logo.jpg'
import { IoTime  } from "react-icons/io5";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="w-64 h-screen fixed bg-white shadow-lg flex flex-col">
      {/* Логотип */}
      <div className="px-[15px] py-[5px]" >
        <img className="w-full" src={logo} alt="Logo" />
      </div>

      {/* Меню */}
      <ul className="flex-1 px-4 py-6 space-y-2">
        {/* Home */}
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${isActive ? "bg-gray-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <FaHome className="text-xl mr-3" />
          <span className="text-sm">Home</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/admin/user"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${isActive ? "bg-gray-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <FaUser className="text-xl mr-3" />
          <span className="text-sm">User</span>
        </NavLink>

        {/* File */}
        <NavLink
          to="/admin/file"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${isActive ? "bg-gray-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <FaFileAlt className="text-xl mr-3" />
          <span className="text-sm">File</span>
        </NavLink>
        <NavLink
          to="/admin/time"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${isActive ? "bg-gray-100 text-blue-600" : "text-gray-700"
            }`
          }
        >
          <IoTime  className="text-xl mr-3" />
          <span className="text-sm">Test vaqti</span>
        </NavLink>
      </ul>
    </div>
  );
}