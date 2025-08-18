import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import NormalModal from "../../UI/Modals/NormalModal";

export default function MapsCreate({ refresh }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // 👈 loading state
    const [form, setForm] = useState({
        title: "",
        description: "",
        photo: null,
        mapLink: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setForm({ ...form, photo: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const uploadFile = async (file) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("file", file);
            formDataToSend.append("category", "user_document");
            formDataToSend.append("userId", "1");

            const response = await axios.post(`/sdg/uz/upload`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data?.object?.id;
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text:
                    error.response?.data?.message ||
                    "Fayl yuklashda xatolik yuz berdi.",
                icon: "error",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            throw error;
        }
    };

    const handleSubmit = async () => {
        setLoading(true); // 👈 start loading
        try {
            let photoId = null;
            if (form.photo) {
                photoId = await uploadFile(form.photo);
            }

            await axios.post(
                `/sdg/uz/branch/create`,
                {
                    title: form.title,
                    description: form.description,
                    mapURL: form.mapLink,
                    photoId: photoId,
                    postType: "MAP",
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            Swal.fire("Success", "Joy muvaffaqiyatli qo‘shildi!", "success");
            setIsOpen(false);
            refresh();

            setForm({
                title: "",
                description: "",
                photo: null,
                mapLink: "",
            });
        } catch (err) {
            console.error(err);
            Swal.fire("Xatolik", "Joyni qo‘shishda muammo yuz berdi", "error");
        } finally {
            setLoading(false); // 👈 stop loading
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Yangi joy qo‘shish
            </button>

            <NormalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4">
                    <h1 className="text-[22px] font-bold mb-4">Yangi joy qo‘shish</h1>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Joy nomi"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Joy haqida izoh"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Foto */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Foto
                        </label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    {/* Map link */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Xarita havolasi
                        </label>
                        <input
                            type="text"
                            name="mapLink"
                            value={form.mapLink}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="https://maps.google.com/..."
                        />
                    </div>

                    {/* Save button with loader */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full flex justify-center items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? (
                            <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
                        ) : (
                            "Saqlash"
                        )}
                    </button>
                </div>
            </NormalModal>
        </div>
    );
}
