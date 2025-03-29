import React, { useEffect, useState } from "react";
import AdminUserCreate from "../../Components/AdminComponents/AdminUser/AdminUserCreate";
import axios from "axios";
import ReactLoading from "react-loading";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import AdminUserInfo from "../../Components/AdminComponents/AdminUser/AdminUserInfo";
import AdminUserEdit from "../../Components/AdminComponents/AdminUser/AdminUserEdit";
import AdminUserDelete from "../../Components/AdminComponents/AdminUser/AdminUserDelete";
import { useNavigate } from "react-router-dom";

export default function AdminUser() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [infoModal, setInfoModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    // Пагинация
    const [currentPage, setCurrentPage] = useState(0); // Текущая страница
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const pageSize = 10; // Размер страницы (можно настроить)

    // Фильтры
    const [filters, setFilters] = useState({
        phoneNumber: "",
        firstName: "",
        lastName: "",
        accountType: "STUDENT",
        genderType: '',
        passport: '',
        registrationNumber: '',
        status: ''
    });
    const statusTranslations = {
        DONE: "Yakunlangan",
        PAYMENT_COMPLETED: "To'lov yakunlandi",
        PAYMENT_FAILED: "To'lov muvaffaqiyatsiz",
        REGISTERED: "Ro'yxatdan o'tgan",
        RESULT_UPLOADED: "Natija yuklandi",
        TEST_COMPLETED: "Test yakunlandi",
        TEST_FAILED: "Test muvaffaqiyatsiz",
    };

    // Загрузка данных с учетом фильтров
    const fetchData = async (page = 0) => {
        try {
            setLoading(true);
            const response = await axios.get(`/sdg/uz`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    ...filters, // Добавляем фильтры в параметры запроса
                    page: page,
                    size: pageSize,
                },
            });
            setData(response.data.object.content);
            setTotalPages(response.data.object.totalPages); // Установка общего количества страниц
        } catch (error) {
            if (error?.status === 401) {
                localStorage.clear();
                navigate('/login')
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage); // Загрузка данных при монтировании
    }, []);

    // Обработка изменения фильтров
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Применение фильтров
    const applyFilters = () => {
        setCurrentPage(0); // Сброс на первую страницу
        fetchData(0); // Загрузка данных с новыми фильтрами
    };

    // Обработка перехода на другую страницу
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            fetchData(newPage); // Загрузка данных для новой страницы
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
            {/* Заголовок и кнопка "Создать пользователя" */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                <button onClick={() => setCreateModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create User
                </button>
            </div>
            {/* Фильтры */}
            <div className="mb-6 bg-white p-2 rounded-lg shadow-md space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
                <div className="grid grid-cols-4 gap-4">
                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={filters.phoneNumber}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={filters.firstName}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter first name"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={filters.lastName}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter last name"
                        />
                    </div>

                    {/* Account Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account Type</label>
                        <select
                            name="accountType"
                            value={filters.accountType}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="ADMIN">Admin</option>
                            <option value="STUDENT">Student</option>
                            <option value="SUPER_ADMIN">Super Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={filters.status} // Предполагается, что у вас есть состояние `filters` с полем `status`
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {/* Пустой вариант для выбора по умолчанию */}
                            <option value="">Barcha statuslar</option>

                            {/* Динамическая генерация статусов */}
                            {Object.entries(statusTranslations).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender Type</label>
                        <select
                            name="genderType"
                            value={filters.genderType}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="AYOL">Female</option>
                            <option value="ERKAK">Male</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Passport</label>
                        <input
                            type="text"
                            name="passport"
                            value={filters.passport}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter last name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={filters.registrationNumber}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter last name"
                        />
                    </div>

                </div>

                {/* Кнопка применения фильтров */}
                <div className="flex justify-end">
                    <button
                        onClick={applyFilters}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Таблица пользователей */}
            {data?.length > 0 ? (
                <div className="overflow-x-auto bg-[white] p-[20px] shadow-md rounded-lg">
                    <table className="w-full bg-white rounded-md overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Passport series</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Register number</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{user.firstName} {user.lastName}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{user.passportSerialNumber}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{user.phoneNumber}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700"> {statusTranslations[user.status] || "Noma'lum status"}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{user?.registrationNumber}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                                        <button
                                            className="bg-gray-300 text-white px-3 py-1 rounded hover:bg-gray-400"
                                            onClick={() => {
                                                setUserData(user);
                                                setInfoModal(true);
                                            }}
                                        >
                                            <IoEyeSharp className="text-[20px]" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditModal(true);
                                                setUserData(user);
                                            }}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            <MdModeEdit className="text-[20px]" />
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => {
                                                setDeleteModal(true);
                                                setUserData(user);
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
            ) : (
                <div className="flex items-center justify-center mt-[50px]">
                    <h1 className="font-bold text-[30px]">
                        Ma'lumot y'oq
                    </h1>
                </div>
            )}

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
            <AdminUserCreate refresh={() => fetchData(currentPage)} isOpen={createModal} onClose={() => setCreateModal(false)} />
            <AdminUserInfo isOpen={infoModal} onClose={() => setInfoModal(false)} data={userData} />
            <AdminUserEdit refresh={() => fetchData(currentPage)} isOpen={editModal} onClose={() => setEditModal(false)} data={userData} />
            <AdminUserDelete isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={userData} refresh={() => fetchData(currentPage)} />
        </div>
    );
}