import { NavLink } from "react-router-dom";
import SmallModal from "../UI/Modals/SmallModal";

export default function RegisterInfoModal({ isOpen, onClose, data }) {
    return (
        <SmallModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px] text-center">
                {/* Заголовок */}
                <h2 className="text-[#28a745] text-xl font-bold mb-4">
                    Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!
                </h2>

                {/* Сообщение */}
                <p className="text-gray-700 text-sm mb-6">
                    Sizning ro'yxatdan o'tish raqamingiz quyida ko'rsatilgan. Iltimos, uni saqlab qo'ying.
                </p>

                {/* Регистрационный номер */}
                <div className="bg-[#f8f9fa] p-4 rounded-lg border border-green-200 shadow-md">
                    <span className="text-lg font-semibold text-green-600">
                        {data?.registrationNumber || "Ma'lumot topilmadi"}
                    </span>
                </div>

                {/* Кнопка закрытия */}
                <NavLink to={'/'}>
                    <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2 bg-[#28a745] text-white rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Yopish
                    </button>
                </NavLink>
            </div>
        </SmallModal>
    );
}