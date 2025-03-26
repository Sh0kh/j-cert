import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import NormalModal from "../../UI/Modals/NormalModal";

export default function AdminUserEdit({ isOpen, onClose, data, refresh }) {

    console.log(data)

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        // accessPermissionId: 0,
        accountType: "ADMIN",
        commentAdmin: "",
        commentUser: "",
        dateBirth: "",
        firstName: "",
        genderType: "AYOL",
        lastName: "",
        passportSerialNumber: "",
        password: "",
        password02: "",
        // paymentCheckId: 0,
        phoneNumber: "",
        registrationNumber: "",
        // resultId: 0,
        status: "DONE",
        avatarId: {
            id: 0,
            extension: '',
            name: '',
            size: 0
        },
        paymentCheckId: {
            id: 0,
            extension: '',
            name: '',
            size: 0
        },

    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id || 0,
                accountType: data.accountType || "ADMIN",
                commentAdmin: data.commentAdmin || "",
                commentUser: data.commentUser || "",
                dateBirth: data.dateBirth || "",
                firstName: data.firstName || "",
                genderType: data.genderType || "AYOL",
                lastName: data.lastName || "",
                passportSerialNumber: data.passportSerialNumber || "",
                password: "",
                password02: "",
                // paymentCheckId: data.paymentCheckId || 0,
                phoneNumber: data.phoneNumber || "",
                registrationNumber: data.registrationNumber || "",
                // resultId: data.resultId || 0,
                status: data.status || "DONE",
                avatarId: {
                    extension: data?.avatarId?.extension,
                    id: data?.avatarId?.id,
                    name: data?.avatarId?.name,
                    size: data?.avatarId?.size
                },
                paymentCheckId: {
                    extension: data?.paymentCheckId?.extension,
                    id: data?.paymentCheckId?.id,
                    name: data?.paymentCheckId?.name,
                    size: data?.paymentCheckId?.size
                }

            });
        }
    }, [data]);

    const handleChange = async (e) => {
        const { name, files } = e.target;

        // Обновляем состояние формы
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : e.target.value,
        }));

        // Если загружен файл, отправляем его на бэкенд
        if (files && files.length > 0) {
            await uploadFile(name, files[0]);
        }
    };

    const uploadFile = async (fieldName, file) => {
        setLoading(true)
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("file", file);
            formDataToSend.append("category", fieldName);
            formDataToSend.append("userId", '1');

            // Отправляем запрос на бэкенд
            const response = await axios.post(`/sdg/uz/upload`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (fieldName === 'user_avatar') {
                setFormData((prevData) => ({
                    ...prevData,
                    avatarId: {
                        id: response?.data?.object?.id,
                        extension: response?.data?.object?.extension,
                        name: response?.data?.object?.name,
                        size: response?.data?.object?.size,
                    },
                }));
            } else if (fieldName === 'user_document') {
                setFormData((prevData) => ({
                    ...prevData,
                    paymentCheckId: {
                        id: response?.data?.object?.id,
                        extension: response?.data?.object?.extension,
                        name: response?.data?.object?.name,
                        size: response?.data?.object?.size,
                    },
                }));
            }

            // Показываем уведомление об успехе
            Swal.fire({
                title: "Success!",
                text: `Fayl muvaffaqiyatli yuklandi.`,
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } catch (error) {
            // Показываем уведомление об ошибке
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Fayl yuklashda xatolik yuz berdi.",
                icon: "error",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        }finally{
            setLoading(false)
        }
    };


    const UpdateUser = async () => {
        setLoading(true);
        try {
            await axios.put(`/sdg/uz/edit`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            Swal.fire({
                title: "Success!",
                text: "User has been successfully updated.",
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            refresh()
            onClose(); // Закрыть модальное окно после успешного обновления
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <form className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account Type</label>
                            <select
                                name="accountType"
                                value={formData.accountType}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="ADMIN">Admin</option>
                                <option value="STUDENT">Student</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="DONE">Done</option>
                                <option value="PAYMENT_COMPLETED">Payment Completed</option>
                                <option value="PAYMENT_FAILED">Payment Failed</option>
                                <option value="REGISTERED">Registered</option>
                                <option value="RESULT_UPLOADED">Result Uploaded</option>
                                <option value="TEST_COMPLETED">Test Completed</option>
                                <option value="TEST_FAILED">Test Failed</option>
                            </select>
                        </div>
                    </div>

                    {/* First Name and Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Phone Number and Date of Birth */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dateBirth"
                                value={formData.dateBirth}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Gender and Passport Serial Number */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="genderType"
                                value={formData.genderType}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="AYOL">Female</option>
                                <option value="ERKAK">Male</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Passport Serial Number</label>
                            <input
                                type="text"
                                name="passportSerialNumber"
                                value={formData.passportSerialNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password and Confirm Password */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Leave blank to keep current password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="password02"
                                value={formData.password02}
                                onChange={handleChange}
                                placeholder="Leave blank to keep current password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Registration Number and Payment Check ID */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                    </div>

                    <div className="flex items-center justify-between">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Foto (3x4)
                            </label>
                            <input
                                type="file"
                                name="user_avatar"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        {/* Payment Check File */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                To'lov cheki (fayl yuklash)
                            </label>
                            <input
                                type="file"
                                name="user_document"
                                accept=".pdf,.jpg,.jpeg,.png" // Разрешенные форматы файлов
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={UpdateUser}
                            disabled={loading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Updating..." : "Update User"}
                        </button>
                    </div>
                </form>
            </div>
        </NormalModal>
    );
}