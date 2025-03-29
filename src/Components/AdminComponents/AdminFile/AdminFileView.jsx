import NormalModal from "../../UI/Modals/NormalModal";
import CONFIG from "../../../utils/Config";
import axios from "axios";
import { useState } from "react";

export default function AdminFileView({ data, isOpen, onClose }) {
    // Состояния для хранения данных
    const [viewFoto, setViewFoto] = useState(null); // Base64 изображения

    // Функция для форматирования размера файла
    const formatFileSize = (sizeInBytes) => {
        if (!sizeInBytes) return "N/A";
        const sizeKB = sizeInBytes / 1024;
        const sizeMB = sizeKB / 1024;
        return sizeMB > 1 ? `${sizeMB.toFixed(2)} MB` : `${sizeKB.toFixed(2)} KB`;
    };

    // Проверка, является ли файл изображением
    const isImage = (contentType) => contentType && contentType.startsWith("image");

    // Запрос для просмотра изображения
    const fetchViewFoto = async () => {
        try {
            const response = await axios.get(`sdg/uz/view/one/photo?id=${data?.id}`, {
                responseType: "blob", // Ожидаем Blob-ответ
            });

            // Преобразование Blob в base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(",")[1]; // Убираем префикс "data:image/..."
                setViewFoto(base64Data); // Сохраняем base64 изображения
            };
            reader.readAsDataURL(response.data); // Читаем Blob как Data URL
        } catch (error) {
            console.error("Ошибка при загрузке изображения:", error);
        }
    };

    // Запрос для скачивания файла
    const downloadFile = async () => {
        try {
            const response = await axios.get(`/sdg/uz/down/one/photo?hashId=${data?.hashId}`, {
                responseType: "blob", // Ожидаем Blob-ответ
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", data?.orginalName || "file"); // Имя файла
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Ошибка при скачивании файла:", error);
        }
    };

    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                {/* Заголовок */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Fayl ma'lumotlari</h2>

                {/* Информация о файле */}
                <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                        <strong>Nomi:</strong> {data?.orginalName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Hajmi:</strong> {formatFileSize(data?.size)}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Turi:</strong> {data?.contentType || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Kategoriyasi:</strong> {data?.fileCategory || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Yuklangan vaqti:</strong>{" "}
                        {new Date(data?.createdAt).toLocaleString() || "N/A"}
                    </p>
                </div>

                {/* Отображение изображения или иконки файла */}
                <div className="mt-6 text-center">
                    {isImage(data?.contentType) ? (
                        viewFoto ? (
                            <img
                                src={`data:${data?.contentType};base64,${viewFoto}`}
                                alt={data?.orginalName}
                                className="max-w-full h-auto rounded-md border border-gray-200"
                            />
                        ) : (
                            <button
                                onClick={fetchViewFoto}
                                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Rasmni ko'rish
                            </button>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 border border-gray-200 rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">Bu fayl ko'rsatilmaydi</p>
                        </div>
                    )}
                </div>

                {/* Кнопка скачивания */}
                <button
                    onClick={downloadFile}
                    className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-center block hover:bg-blue-700 transition duration-300"
                >
                    Faylni yuklab olish
                </button>
            </div>
        </NormalModal>
    );
}