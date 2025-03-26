import axios from "axios";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import RegisterInfoModal from "../Components/Register/RegisterInfoModal";
import { NavLink } from "react-router-dom";
import logo from "../img/big-logo.jpg";


export default function Register() {
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const [infoModal, setInfoModal] = useState(false)
    const [infoData, setInfoData] = useState([])

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        deliveryPlace: "",
        phoneNumber: "",
        gender: "",
        passportSeries: "",
        photo: null,
        paymentCheck: null,
    });
    const [paymentCheckInfo, setPaymentCheckInfo] = useState({
        extension: "",
        id: 0,
        name: "",
        size: 0
    });
    const [fileInfo, setFileInfo] = useState({
        extension: "",
        id: 0,
        name: "",
        size: 0
    }
    )

    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    const handleChange = async (e) => {
        const { name, files } = e.target;

        // Обновляем состояние формы
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : e.target.value,
        }));

        // Если загружен файл, отправляем его на бэкенд
        if (files && files.length > 0) {
            await uploadFile(name, files[0]);
        }
    };




    const uploadFile = async (fieldName, file) => {
        setIsLoading(true)
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("file", file);
            formDataToSend.append("category", fieldName);
            formDataToSend.append("userId", '1');

            // Отправляем запрос на бэкенд
            const response = await axios.post(`/sdg/uz/upload`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (fieldName === 'user_avatar') {
                setFileInfo({
                    extension: response?.data?.object?.extension,
                    size: response?.data?.object?.size,
                    name: response?.data?.object?.name,
                    id: response?.data?.object?.id,
                })
            } else if (fieldName === 'user_document') {
                setPaymentCheckInfo({
                    extension: response?.data?.object?.extension,
                    size: response?.data?.object?.size,
                    name: response?.data?.object?.name,
                    id: response?.data?.object?.id,
                })
            }

            // Показываем уведомление об успехе
            Swal.fire({
                title: "Success!",
                text: `Fayl muvaffaqiyatli yuklandi.`,
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } catch (error) {
            // Показываем уведомление об ошибке
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Fayl yuklashda xatolik yuz berdi.",
                icon: "error",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } finally {
            setIsLoading(false)
        }
    };

    const register = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            const newData = {
                accountType: 'STUDENT',
                firstName: formData?.firstName,
                lastName: formData?.lastName,
                genderType: formData?.gender,
                dateBirth: formData?.birthDate,
                status: 'REGISTERED',
                registrationNumber: formData?.deliveryPlace,
                phoneNumber: `+998${formData?.phoneNumber}`,
                passportSerialNumber: formData?.passportSeries,
                avatarId: {
                    extension: fileInfo?.extension,
                    id: fileInfo?.id,
                    name: fileInfo?.name,
                    size: fileInfo?.size
                },
                paymentCheckId: {
                    extension: paymentCheckInfo?.extension,
                    id: paymentCheckInfo?.id,
                    name: paymentCheckInfo?.name,
                    size: paymentCheckInfo?.size
                },

            }
            const response = await axios.post(`/sdg/uz/admin`, newData)
            setInfoData(response?.data?.object)
            setInfoModal(true)
            Swal.fire({
                title: "Success!",
                text: `Muvaffaqiyatli yuklandi.`,
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            setFormData({
                firstName: "",
                lastName: "",
                birthDate: "",
                deliveryPlace: "",
                phoneNumber: "",
                gender: "",
                passportSeries: "",
                photo: null,
                paymentCheck: null,
            });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1500);
            setFileInfo({
                extension: "",
                id: 0,
                name: "",
                size: 0
            });
            setPaymentCheckInfo({
                extension: "",
                id: 0,
                name: "",
                size: 0
            });

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } finally {
            setIsLoading(false); // Выключаем индикатор загрузки
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100 pt-[200px] pb-[100px]">
            <header id="header" className={`header fixed-top ${scrolled ? "scrolled" : ""}`}>
                <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-end">
                    <NavLink style={{ backgroundColor: "#fff" }} to={'/'} className="logo d-flex align-items-center me-auto">
                        <img src={logo} alt="Logo" />
                    </NavLink>
                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li>
                                <NavLink to={'/'}>Bo'sh sahifa</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/check'}>Natijani korish</NavLink>

                            </li>
                            <li>
                                <NavLink to={'/portfolio'}>Postlar</NavLink>
                            </li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>
                    <NavLink className={'btn-getstarted'} to={'/register'}>
                        Ro'yxatdan o'tish
                    </NavLink>
                </div>
            </header>

            <form
                onSubmit={register}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
            >
                <h1 className="text-center text-2xl font-bold mb-6">
                    Ro'yxatdan o'tish
                </h1>

                {/* Full Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Ism</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    />
                    {/* Предупреждение */}
                    <p className="text-xs text-gray-500 mt-1">
                        Iltimos, ismingizni passportda ko'rsatilgandek kiriting.
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Familiya</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    />
                    {/* Предупреждение */}
                    <p className="text-xs text-gray-500 mt-1">
                        Iltimos, familiyangizni passportda ko'rsatilgandek kiriting.
                    </p>
                </div>

                {/* Birth Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Tug'ilgan sanasi
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    />
                </div>

                {/* Delivery Place */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Topshirish joyi
                    </label>
                    <select
                        name="deliveryPlace"
                        value={formData.deliveryPlace}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    >
                        <option value="">Tanlang</option>
                        <option value="Toshkent">Toshkent</option>
                        <option value="Samarqand">Samarqand</option>
                        <option value="Buxoro">Buxoro</option>
                        <option value="Namangan">Namangan</option>
                    </select>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Telefon raqami
                    </label>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        {/* Префикс */}
                        <span className="px-3 py-2 bg-gray-100 text-gray-700 font-medium border-r border-gray-300">
                            +998
                        </span>
                        {/* Поле ввода */}
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 focus:outline-none focus:border-green-500"
                            placeholder="XX XXX XX XX" // Пример формата номера
                            maxLength={9}
                            required
                        />
                    </div>
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Jins</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    >
                        <option value="">Tanlang</option>
                        <option value="ERKAK">Erkak</option>
                        <option value="AYOL">Ayol</option>
                    </select>
                </div>

                {/* Passport Series */}
                <div className="mb-4 relative">
                    <label className="block text-sm font-medium mb-2">
                        Passport seriyasi
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="passportSeries"
                            value={formData.passportSeries}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                            required
                        />
                        <span
                            className="ml-2 cursor-pointer relative"
                            onMouseEnter={() => setIsModalOpen(true)} // Показать modal при hover
                            onMouseLeave={() => setIsModalOpen(false)} // Скрыть modal при уходе
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {/* Modal */}
                            {isModalOpen && (
                                <div
                                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white text-black text-xs rounded shadow-md py-2 px-2 z-20"
                                    style={{ width: "200px" }}
                                >
                                    <p className="text-[15px]">Passport seriyasini kiriting.</p>
                                </div>
                            )}
                        </span>
                    </div>
                </div>


                {/* Photo */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Foto (3x4)
                    </label>
                    <input
                        type="file"
                        name="user_avatar"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                {/* Payment Check File */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        To'lov cheki (fayl yuklash)
                    </label>
                    <input
                        type="file"
                        name="user_document"
                        accept=".pdf,.jpg,.jpeg,.png" // Разрешенные форматы файлов
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading} // Отключаем кнопку во время загрузки
                    className={`w-full bg-[#009970] text-white py-2 rounded transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#007a5a]'
                        }`}
                >
                    {isLoading ? 'Yuklanmoqda...' : 'Yuborish'}
                </button>
            </form>
            <RegisterInfoModal data={infoData} isOpen={infoModal} onClose={() => setInfoModal(false)} />
        </div>
    );
}