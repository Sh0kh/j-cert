import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import AdminFileDelete from "../../Components/AdminComponents/AdminFile/AdminFileDelete";
import ReactLoading from "react-loading";


export default function AdminFile() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [loading, setLoading] = useState(true)

    // Состояния для пагинации
    const [currentPage, setCurrentPage] = useState(0); // Текущая страница
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц

    // Функция для получения данных с сервера
    const fetchData = async (page = 0) => {
        try {
            const response = await axios.get(`/sdg/uz/get/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    page: page,
                    size: 10,
                },
            });

            const responseData = response?.data?.object;
            setData(responseData?.content || []); // Устанавливаем данные
            setTotalPages(responseData?.totalPages || 0); // Устанавливаем общее количество страниц
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    };

    // При монтировании компонента загружаем данные
    useEffect(() => {
        fetchData(currentPage);
    }, []);

    // Обработчик изменения страницы
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            fetchData(newPage);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100%]">
                <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="p-[20px]">
            {/* Заголовок и кнопка "Создать файл" */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Files</h1>
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
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data?.map((file) => (
                            <tr key={file.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">{file.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.name}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.size}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => {
                                            setDeleteModal(true);
                                            setFileData(file);
                                        }}
                                    >
                                        <MdDelete className="text-[20px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно удаления */}
            <AdminFileDelete
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                refresh={fetchData}
                data={fileData}
            />

            {/* Пагинация */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none ${currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`px-4 py-2 text-sm font-medium ${currentPage === index ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300"
                            } rounded-md hover:bg-gray-100 focus:outline-none`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none ${currentPage === totalPages - 1 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}