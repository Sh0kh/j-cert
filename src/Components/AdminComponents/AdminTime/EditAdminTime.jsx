import axios from "axios";
import SmallModal from "../../UI/Modals/SmallModal";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function EditAdminTime({ isOpen, onClose, refresh, data }) {
    // Состояние для даты и времени
    const [selectedDateTime, setSelectedDateTime] = useState("");

    useEffect(() => {
        if (data) {
            setSelectedDateTime(data)
        }
    }, [data])

    // Функция для отправки данных на бэкенд
    const EditTime = async () => {
        try {
            // Отправляем данные на сервер
            await axios.post(`/sdg/uz/test/date/update`, { lastTestDate: selectedDateTime });
            Swal.fire({
                title: "Success!",
                text: "Date and time have been successfully updated.",
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            refresh()
            onClose()
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "An error occurred.",
                icon: "error",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        }
    };

    return (
        <SmallModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[10px]">
                <div className="">
                    <h1 className="text-[22px] font-bold mb-4">Edit Date and Time</h1>

                    {/* Поле для выбора даты и времени */}
                    <div className="mb-4">
                        <label
                            htmlFor="datetime"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Select Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            value={selectedDateTime}
                            onChange={(e) => setSelectedDateTime(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Кнопка сохранения */}
                    <button
                        onClick={EditTime}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </SmallModal>
    );
}