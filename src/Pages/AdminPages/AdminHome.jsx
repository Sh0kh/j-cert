// AdminHome.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFileAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    // Пример данных (можно заменить на реальные данные из API)
    const fileCount = 120; // Количество файлов
    const userCount = 45; // Количество пользователей
    // const navigate = useNavigate()

    // const [userData, setUserData] = useState('')

    // const getUser = async () => {
    //     try {
    //         const response = await axios.get('/sdg/uz', {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //             params: {
    //                 page: 0,
    //                 accountType: "STUDENT",
    //                 size: 5,
    //             },
    //         })
    //         setUserData(response)
    //     } catch (error) {
    //         if (error?.status === 401) {
    //             localStorage.clear();
    //             navigate('/login')
    //         }
    //     }
    // }

    // useEffect(() => {
    //     getUser()
    // }, [])

    return (
        <div className="p-[20px]">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FaFileAlt className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Files</p>
                        <p className="text-xl font-bold text-gray-800">{fileCount}</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaUsers className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Users</p>
                        <p className="text-xl font-bold text-gray-800">{userCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}