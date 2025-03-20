// AdminUser.jsx
import React, { useState } from "react";

export default function AdminUser() {
    // Пример данных (можно заменить на реальные данные из API)
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Sam Wilson", email: "sam@example.com" },
    ]);

    // Удаление пользователя
    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="p-[20px]">
            {/* Заголовок и кнопка "Создать пользователя" */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create User
                </button>
            </div>

            {/* Таблица пользователей */}
            <div className="overflow-x-auto bg-[white] p-[20px] shadow-md rounded-lg">
                <table className="w-full bg-white  rounded-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Email
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{user.name}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                                    {/* Кнопка редактирования */}
                                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                        Edit
                                    </button>
                                    {/* Кнопка удаления */}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}