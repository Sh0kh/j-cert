import NormalModal from "./UI/Modals/NormalModal";
import { NavLink } from "react-router-dom";

export default function HeaderModal({ isOpen, onClose }) {
    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 space-y-4 text-center">
                {/* Ссылки в виде блоков */}
                <div>
                    <NavLink
                        onClick={onClose}
                        to={'/check'}
                        className="block text-lg font-medium hover:text-blue-500 transition-colors"
                    >
                        Natijani korish
                    </NavLink>
                </div>

                <div>
                    <NavLink
                        onClick={onClose} // Закрыть модалку при клике на ссылку
                        to={'/portfolio'}
                        className="block text-lg font-medium hover:text-blue-500 transition-colors"
                    >
                        Postlar
                    </NavLink>
                </div>
            </div>
        </NormalModal>
    );
}