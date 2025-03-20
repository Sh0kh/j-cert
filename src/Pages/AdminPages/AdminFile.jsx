// AdminFile.jsx
import React, { useState } from "react";

export default function AdminFile() {
    // Пример данных (можно заменить на реальные данные из API)
    const [files, setFiles] = useState([
        { id: 1, name: "Document.pdf", size: "2.5 MB", uploadedAt: "2023-10-01" },
        { id: 2, name: "Image.png", size: "1.2 MB", uploadedAt: "2023-10-02" },
        { id: 3, name: "Spreadsheet.xlsx", size: "3.8 MB", uploadedAt: "2023-10-03" },
    ]);

    // Удаление файла
    const handleDelete = (id) => {
        setFiles(files.filter((file) => file.id !== id));
    };

    return (
        <div className="p-[20px] ">
            {/* Заголовок и кнопка "Создать файл" */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Files</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create File
                </button>
            </div>

            {/* Таблица файлов */}
            <div className="overflow-x-auto bg-white p-[20px] shadow-md rounded-lg">
                <table className="w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Size
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Uploaded At
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {files.map((file) => (
                            <tr key={file.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">{file.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.name}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.size}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.uploadedAt}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                                    {/* Кнопка редактирования */}
                                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                        Edit
                                    </button>
                                    {/* Кнопка удаления */}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(file.id)}
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