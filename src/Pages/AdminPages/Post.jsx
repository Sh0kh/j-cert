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

export default function Post() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/sdg/uz/branch/get?postType=POST`, {
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
                    Postlar
                </Typography>

                <PostCreate refresh={getPosts} />
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
                            <CardHeader floated={false} className="h-48">
                                <img
                                    src={
                                        item.photoId
                                            ? `${CONFIG?.API_URL + `/sdg/uz/view/one/photo?id=` + item.photoId}`
                                            : "https://source.unsplash.com/random/400x300/?city"
                                    }
                                    alt="joylashuv rasmi"
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {item.title || "Nomsiz joy"}
                                </Typography>
                                <Typography color="gray">
                                    {item.description || "Izoh mavjud emas"}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-3 flex justify-between gap-2">
                                <PostEdit data={item} refresh={getPosts} />
                                <MapsDelete id={item?.id} refresh={getPosts} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
