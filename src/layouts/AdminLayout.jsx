import { Outlet } from "react-router-dom";
import Seidebar from "../Components/Sidebar/Sidebar";
import AdminNavbar from "../Components/AdminNavbar/AdminNavbar";

export default function AdminLayout() {
    return (
        <div className="flex w-[100%]  overflow-hidden min-h-screen bg-[#F5F5F5]">
            <Seidebar />
            <div className="w-full ml-64">
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    )
}