import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import NormalModal from "../../UI/Modals/NormalModal";

export default function ClientCreate({ refresh }) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        clientCount: "",
        projectCount: "",
        worker: "",
        support: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(
                `/sdg/uz/info/create`,
                {
                    clientCount: Number(form.clientCount),
                    projectCount: Number(form.projectCount),
                    worker: Number(form.worker),
                    support: Number(form.support),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            Swal.fire("Success", "Statistika muvaffaqiyatli qo‘shildi!", "success");
            setIsOpen(false);
            refresh();

            // Formani tozalash
            setForm({
                clientCount: "",
                projectCount: "",
                worker: "",
                support: "",
            });
        } catch (err) {
            console.error(err);
            Swal.fire("Xatolik", "Statistika qo‘shishda muammo yuz berdi", "error");
        }
    };

    return (
        <div>
            {/* Tugma */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Yangi Statistika qo‘shish
            </button>

            {/* Modal */}
            <NormalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4">
                    <h1 className="text-[22px] font-bold mb-4">
                        Yangi Statistika qo‘shish
                    </h1>

                    {/* Klientlar */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Klientlar soni
                        </label>
                        <input
                            type="number"
                            name="clientCount"
                            value={form.clientCount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Masalan: 120"
                        />
                    </div>

                    {/* Loyihalar */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loyihalar soni
                        </label>
                        <input
                            type="number"
                            name="projectCount"
                            value={form.projectCount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Masalan: 45"
                        />
                    </div>

                    {/* Ishchilar */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ishchilar soni
                        </label>
                        <input
                            type="number"
                            name="worker"
                            value={form.worker}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Masalan: 80"
                        />
                    </div>

                    {/* Support */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Support soni
                        </label>
                        <input
                            type="number"
                            name="support"
                            value={form.support}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            placeholder="Masalan: 12"
                        />
                    </div>

                    {/* Saqlash tugmasi */}
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
