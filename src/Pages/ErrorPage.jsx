// ErrorPage.jsx
import React from "react";
import { FaGhost, FaArrowLeft } from "react-icons/fa";

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800">
            {/* Иконка призрака */}
            <FaGhost className="text-8xl text-[#009970] mb-6" />

            {/* Заголовок */}
            <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>

            {/* Подзаголовок */}
            <p className="text-lg text-gray-600 mb-8">Oops! The page you're looking for is lost in space.</p>

            {/* Кнопка возврата на главную */}
            <a
                href="/"
                className="flex items-center bg-[#009970] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#009970cd] transition duration-300"
            >
                <FaArrowLeft className="mr-2 text-lg" />
                Go Back Home
            </a>
        </div>
    );
}