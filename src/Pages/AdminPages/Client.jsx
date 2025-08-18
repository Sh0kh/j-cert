import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Users, Briefcase, Hammer, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ClientCreate from "../../Components/AdminComponents/Client/ClientCreate";
import ClientEdit from "../../Components/AdminComponents/Client/ClientEdit";


export default function Client() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    const getClients = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/sdg/uz/info/get', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    const stats = [
        { label: "Klientlar", value: data[0]?.clientCount ?? 0, icon: <Users className="w-8 h-8 text-blue-500" /> },
        { label: "Loyihalar", value: data[0]?.projectCount ?? 0, icon: <Briefcase className="w-8 h-8 text-green-500" /> },
        { label: "Ishchilar", value: data[0]?.worker ?? 0, icon: <Hammer className="w-8 h-8 text-orange-500" /> },
        { label: "Support", value: data[0]?.support ?? 0, icon: <Headphones className="w-8 h-8 text-purple-500" /> },
    ];


    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100vh]">
                <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-[20px]">
            <div className="flex items-center justify-between w-full mb-[20px]">
                <Typography variant="h3" color="blue-gray" className=" font-bold">
                    Statistika
                </Typography>
                {data?.length ==! 0 ? <ClientEdit data={data[0]} refresh={getClients} /> : <ClientCreate refresh={getClients} />}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {stats.map((item, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <CardBody className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-4 bg-blue-gray-50 rounded-full">
                                {item.icon}
                            </div>
                            <Typography variant="h5" color="blue-gray" className="font-semibold">
                                {item.value}
                            </Typography>
                            <Typography color="gray" className="text-sm font-medium">
                                {item.label}
                            </Typography>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
