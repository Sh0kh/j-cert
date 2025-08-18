import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import SmallModal from "../../UI/Modals/SmallModal";

export default function MapsDelete({ id, refresh }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/sdg/uz/branch/delete?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            Swal.fire("O‘chirildi!", "Joy muvaffaqiyatli o‘chirildi.", "success");
            setIsOpen(false);
            refresh()
        } catch (err) {
            console.error(err);
            Swal.fire(
                "Xatolik!",
                "Joyni o‘chirishda muammo yuz berdi.",
                "error"
            );
        }
    };

    return (
        <div>
            {/* Кнопка открытия */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
                O‘chirish
            </button>

            {/* Модалка */}
            <SmallModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4">
                    <h1 className="text-lg font-bold mb-2 text-gray-800">
                        O‘chirishni tasdiqlash
                    </h1>
                    <p className="text-sm text-gray-600 mb-6">
                        Siz ushbu joyni o‘chirmoqchimisiz? Ushbu amalni ortga qaytarib
                        bo‘lmaydi.
                    </p>

                    {/* Кнопки */}
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Bekor qilish
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            O‘chirish
                        </button>
                    </div>
                </div>
            </SmallModal>
        </div>
    );
}
