import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import NormalModal from "../../UI/Modals/NormalModal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminRegisterCreate({ refresh }) {
    const [isOpen, setIsOpen] = useState(false);
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

    // ✅ для ReactQuill
    const handleDescriptionChange = (value) => {
        setForm({ ...form, description: value });
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
                    postType: "REGISTER",
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
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Restratsiya qoidasi qo‘shish
            </button>

            <NormalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4">
                    <h1 className="text-[22px] font-bold mb-4">Restratsiya qoidasi qo‘shish</h1>

                    {/* ✅ Description ReactQuill */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <ReactQuill
                            value={form.description}
                            onChange={handleDescriptionChange}
                            theme="snow"
                            placeholder="..."
                            className="bg-white rounded-md h-[300px] mb-[100px]"
                        />
                    </div>

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
