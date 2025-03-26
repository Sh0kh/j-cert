import axios from "axios";
import SmallModal from "../../UI/Modals/SmallModal";
import Swal from "sweetalert2";

export default function AdminFileDelete({ isOpen, onClose, data, refresh }) {


    const deleteUser = async () => {
        try {
            await axios.delete(`/sdg/uz/delete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    fileHashId: data?.hashId,
                    userId:1
                }
            });
            Swal.fire({
                title: "Success!",
                text: "User has been successfully deleted.",
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            refresh(); // Обновить список пользователей
            onClose(); // Закрыть модальное окно
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
            <div className="p-6 bg-white rounded-lg shadow-lg  w-full">
                {/* Заголовок */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Delete User</h2>

                {/* Сообщение подтверждения */}
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete the user with ID{" "}
                    <span className="font-semibold text-indigo-600">{data?.id}</span>? This action cannot be undone.
                </p>

                {/* Кнопки действия */}
                <div className="flex justify-end space-x-4">
                    {/* Кнопка отмены */}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>

                    {/* Кнопка подтверждения удаления */}
                    <button
                        onClick={deleteUser}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </SmallModal>
    );
}