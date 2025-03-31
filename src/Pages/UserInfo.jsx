import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserInfo() {
    const { ID } = useParams();
    const [data, setData] = useState(null);

    // Функция для получения данных пользователя
    const fetchData = async () => {
        try {
            const response = await axios.post(`/sdg/uz/check?registrationNumber=${ID}`);
            setData(response?.data?.object);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    // Функция для скачивания файла
    const downloadFile = async (hashId, fileName) => {
        try {
            const response = await axios.get(`/sdg/uz/down/one/photo?id=${hashId}`, {
                responseType: "blob", // Blob javobini kutamiz
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName || "file"); // Fayl nomi
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Faylni yuklab olishda xatolik:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ID]);

    // Если данные еще не загружены
    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                <p className="ml-4 text-lg text-gray-700">Yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-[200px] bg-gray-100 flex flex-col items-center py-12 px-4">
            {/* Заголовок */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Imtihon Natijalari</h1>

            {/* Карточка с информацией */}
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">


                {/* Кнопки для скачивания */}
                {data.resultId && data.resultId.id ? (
                    <div className="space-y-4">
                        <button
                            onClick={() => downloadFile(data.resultId.id, `result.${data.resultId.extension}`)}
                            className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
                        >
                            Imtihon natijasini yuklab oling
                        </button>
                       
                    </div>
                ) : data.accessPermissionId && data.accessPermissionId.id ? (
                    <div className="space-y-4">
                        <button
                            onClick={() =>
                                downloadFile(data.accessPermissionId.id, `permission.${data.accessPermissionId.extension}`)
                            }
                            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
                        >
                            Ruxsatnomani yuklab oling
                        </button>
                        <p className="text-sm text-gray-600 text-center">
                            Imtihon kogozini yuklab oling va imtihon vaqti o'zingiz bilan olib boring.
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-700">
                            So‘rovingiz ko‘rib chiqilmoqda. Iltimos, kuting.
                        </p>
                        <a
                            className="flex items-center justify-center gap-[5px]"
                            href="https://t.me/j_certuzbekistan" target="_blank" rel="noopener noreferrer">
                            <svg className="text-[30px] " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.994 2a10 10 0 1 0 10 10a10 10 0 0 0-10-10m3.18 15.152a.705.705 0 0 1-1.002.352l-2.715-2.11l-1.742 1.608a.3.3 0 0 1-.285.039l.334-2.989l.01.009l.007-.059s4.885-4.448 5.084-4.637c.202-.189.135-.23.135-.23c.012-.23-.361 0-.361 0l-6.473 4.164l-2.695-.918s-.414-.148-.453-.475c-.041-.324.466-.5.466-.5l10.717-4.258s.881-.392.881.258Z"></path></svg>
                            <span className="text-[20px]">
                                Telegtam
                            </span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}