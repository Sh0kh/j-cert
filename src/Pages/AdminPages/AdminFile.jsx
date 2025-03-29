import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import AdminFileDelete from "../../Components/AdminComponents/AdminFile/AdminFileDelete";
import ReactLoading from "react-loading";
import { IoEyeSharp } from "react-icons/io5";
import AdminFileView from "../../Components/AdminComponents/AdminFile/AdminFileView";



export default function AdminFile() {
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [viewModal, setViewModal] = useState(false)
    const [viewData, setViewData] = useState(null)
    const fetchData = async (page = 0) => {
        try {
            const response = await axios.get(`/sdg/uz/get/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    page: page,
                    size: 10,
                },
            });

            const responseData = response?.data?.object;
            setData(responseData?.content || []); // Устанавливаем данные
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100%]">
                <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="p-[20px]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Files</h1>
            </div>
            <div className="overflow-x-auto bg-white p-[20px] shadow-md rounded-lg">
                <table className="w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Extension
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Size
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data?.map((file) => (
                            <tr key={file.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">{file.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.name}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.extension}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{file.size}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                                    <button
                                        className="bg-gray-300 text-white px-3 py-1 rounded hover:bg-gray-400"
                                        onClick={()=>{setViewData(file); setViewModal(true)}}
                                    >
                                        <IoEyeSharp className="text-[20px]" />
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => {
                                            setDeleteModal(true);
                                            setFileData(file);
                                        }}
                                    >
                                        <MdDelete className="text-[20px]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Модальное окно удаления */}
            <AdminFileDelete
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                refresh={fetchData}
                data={fileData}
            />
            <AdminFileView data={viewData} isOpen={viewModal} onClose={() =>setViewModal(false)} />
        </div>
    );
}