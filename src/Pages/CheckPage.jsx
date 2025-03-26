import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import logo from "../img/big-logo.jpg";

const CheckPage = () => {
    const [scrolled, setScrolled] = useState(false);

    const [formData, setFormData] = useState({
        registrationNumber: "", // Для первого поля (число)
        dateBirth: "", // Для второго поля (дата рождения)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "registrationNumber") {
            // Разрешаем только числа для первого поля
            if (/^\d*$/.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        } else if (name === "dateBirth") {
            // Сохраняем дату рождения
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Формируем query string из formData
            const queryString = new URLSearchParams(formData).toString();

            // Отправляем GET-запрос с query parameters
            const response = await axios.get(`/sdg/uz/check?${queryString}`);

            // Показываем успешное уведомление
            Swal.fire({
                title: "Muvaffaqiyatli!",
                text: "Natijangiz topildi.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);

            // Показываем ошибку
            Swal.fire({
                title: "Xatolik!",
                text: "Ma'lumotlarni tekshirib, qayta urinib ko'ring.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
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
                                <a href="https://secure.j-cert.org/score/" target="_blank" rel="noopener noreferrer">
                                    Natijani ko'rish
                                </a>
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
            <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg shadow-lg space-y-6">
                {/* Заголовок */}
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Natijangizni ko'ring
                </h1>

                {/* Поле для ввода числа (идентификационный номер или код) */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Identifikatsion raqam
                    </label>
                    <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                        placeholder="Masalan, 12345"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Поле для выбора даты рождения */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Tug'ilgan kuningiz
                    </label>
                    <input
                        type="date"
                        name="dateBirth"
                        value={formData.dateBirth}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Кнопка отправки */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#009970] text-white py-2 rounded hover:bg-[#009970cd] transition duration-300"
                >
                    Tekshirish
                </button>
            </div>
        </div>
    );
};

export default CheckPage;