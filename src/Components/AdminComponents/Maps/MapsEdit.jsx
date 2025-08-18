import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import NormalModal from "../../UI/Modals/NormalModal";
import { Button } from "@material-tailwind/react";

export default function MapsEdit({ refresh, data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        title: data?.title || "",
        description: data?.description || "",
        photo: null,
        mapLink: data?.mapURL || "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setForm({ ...form, photo: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // загрузка файла и возврат photoId
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
        try {
            let photoId = data?.photoId || null;
            if (form.photo) {
                photoId = await uploadFile(form.photo); // если выбрали новое фото
            }

            // редактирование записи
            await axios.put(
                `/sdg/uz/branch/update`,
                {
                    id: data?.id,
                    title: form.title,
                    description: form.description,
                    mapURL: form.mapLink,
                    photoId: photoId,
                    "postType": "MAP",

                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            Swal.fire("Success", "Joy muvaffaqiyatli yangilandi!", "success");
            setIsOpen(false);
            refresh();
        } catch (err) {
            console.error(err);
            Swal.fire("Xatolik", "Joyni yangilashda muammo yuz berdi", "error");
        }
    };

    return (
        <div>
            {/* Button to open modal */}
            <Button
                color="green"
                size="sm"
                onClick={() => setIsOpen(true)}
            >
                Tahrirlash
            </Button>

            {/* Modal */}
            <NormalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4">
                    <h1 className="text-[22px] font-bold mb-4">Joyni tahrirlash</h1>

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

                    {/* Save button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                        Saqlash
                    </button>
                </div>
            </NormalModal>
        </div>
    );
}
