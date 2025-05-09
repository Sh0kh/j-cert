import axios from "axios";
import NormalModal from "../../UI/Modals/NormalModal";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

export default function AdminUserInfo({ isOpen, onClose, data }) {
    const [Foto, setFoto] = useState('');
    const [loading, setLoading] = useState(true);
    console.log(data);

    const getFoto = async () => {
        try {
            const response = await axios.get(`/sdg/uz/view/one/photo?id=${data?.avatarId?.id}`, {
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            setFoto(imageUrl);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Функция для конвертации байтов в мегабайты
    const bytesToMB = (bytes) => {
        if (!bytes) return '0 MB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    useEffect(() => {
        if (isOpen) {
            getFoto();
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            if (Foto && Foto.startsWith('blob:')) {
                URL.revokeObjectURL(Foto);
            }
        };
    }, [Foto]);

    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-lg h-[1] w-full">
                {loading ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">User Information</h2>
                        <div className="flex items-center justify-center w-full my-[10px]">
                            <img
                                className="w-[70%]"
                                src={Foto} alt="User Avatar" />
                        </div>
                        <div className="space-y-2">
                            {/* General Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">General Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">ID</p>
                                        <p className="text-sm text-gray-700">{data?.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Account Type</p>
                                        <p className="text-sm text-gray-700">{data?.accountType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Status</p>
                                        <p className="text-sm text-gray-700">{data?.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                                        <p className="text-sm text-gray-700">{data?.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">First Name</p>
                                        <p className="text-sm text-gray-700">{data?.firstName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Last Name</p>
                                        <p className="text-sm text-gray-700">{data?.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                                        <p className="text-sm text-gray-700">{data?.dateBirth}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Gender</p>
                                        <p className="text-sm text-gray-700">{data?.genderType === "AYOL" ? "Female" : "Male"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">Additional Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Registration Number</p>
                                        <p className="text-sm text-gray-700">{data?.registrationNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Passport Serial Number</p>
                                        <p className="text-sm text-gray-700">{data?.passportSerialNumber || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">File Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Result</p>
                                        {data?.resultId?.id ? (
                                            <div>

                                                <a
                                                    className="mt-2 w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-center block hover:bg-blue-700 transition duration-300"
                                                    href={`https://j-sert.uz/sdg/uz/down/one/photo?id=${data.resultId.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Faylni yuklab olish
                                                </a>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    {bytesToMB(data.resultId.size)} • {data.resultId.extension}
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                className="mt-6 w-full py-2 bg-gray-300 text-gray-500 font-semibold rounded-md text-center block opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Fayl mavjud emas
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Access Permission</p>
                                        {data?.accessPermissionId?.id ? (
                                            <div>

                                                <a
                                                    className="mt-2 w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-center block hover:bg-blue-700 transition duration-300"
                                                    href={`https://j-sert.uz/sdg/uz/down/one/photo?id=${data.accessPermissionId.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Faylni yuklab olish
                                                </a>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    {bytesToMB(data.accessPermissionId.size)} • {data.accessPermissionId.extension}
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                className="mt-6 w-full py-2 bg-gray-300 text-gray-500 font-semibold rounded-md text-center block opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Fayl mavjud emas
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-[20px]">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Payment Check</p>
                                        {data?.paymentCheckId?.id ? (
                                            <div>

                                                <a
                                                    className="mt-2 w-full py-2 bg-blue-600 text-white font-semibold rounded-md text-center block hover:bg-blue-700 transition duration-300"
                                                    href={`https://j-sert.uz/sdg/uz/down/one/photo?id=${data.paymentCheckId.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Faylni yuklab olish
                                                </a>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    {bytesToMB(data.paymentCheckId.size)} • {data.paymentCheckId.extension}
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                className="mt-6 w-full py-2 bg-gray-300 text-gray-500 font-semibold rounded-md text-center block opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Fayl mavjud emas
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </NormalModal>
    );
}