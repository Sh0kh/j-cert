import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";
import ReactLoading from "react-loading";
import CONFIG from "../../utils/Config";
import MapsDelete from "../../Components/AdminComponents/Maps/MapsDelete";
import PostCreate from "../../Components/AdminComponents/Post/PostCreate";
import PostEdit from "../../Components/AdminComponents/Post/PostEdit";
import AdminRegisterCreate from "../../Components/AdminComponents/AdminRegister/AdminRegisterCreate";
import AdminRegisterEdit from "../../Components/AdminComponents/AdminRegister/AdminRegisterEdit";

export default function AdminRegister() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/sdg/uz/branch/get?postType=REGISTER`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100vh]">
                <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" color="blue-gray" className="font-bold">
                    Register qoidasi
                </Typography>
                {data?.length === 0
                    ? <AdminRegisterCreate refresh={getPosts} />
                    : <AdminRegisterEdit data={data[0]} refresh={getPosts} />}
            </div>

            {/* Agar data bo‘sh bo‘lsa */}
            {data.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Typography variant="h6" color="gray">
                        Ma'lumot mavjud emas
                    </Typography>
                </div>
            ) : (
                // Grid cards
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item) => (
                        <Card key={item.id} className="shadow-lg">

                            <CardBody>
                                {item?.description ? (
                                    <div
                                        className="text-gray-700 prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                ) : (
                                    <Typography color="gray">Izoh mavjud emas</Typography>
                                )}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
