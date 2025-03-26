import axios from "axios";
import React, { useEffect, useState } from "react";
import EditAdminTime from "../../Components/AdminComponents/AdminTime/EditAdminTime";

export default function AdminTime() {
    const [data, setData] = useState(null);
    const [editModal, setEditModal] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`/sdg/uz/test/date/get`)
            setData(response?.data?.object)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!data) return;

        const calculateTimeRemaining = () => {
            const targetDate = new Date(data);
            const today = new Date();

            // Calculate difference in milliseconds
            const differenceInTime = targetDate.getTime() - today.getTime();

            if (differenceInTime > 0) {
                const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
                const hours = Math.floor((differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600));
                const minutes = Math.floor((differenceInTime % (1000 * 3600)) / (1000 * 60));

                setTimeRemaining({ days, hours, minutes });
            }
        };

        // Initial calculation
        calculateTimeRemaining();

        // Update every minute
        const timer = setInterval(calculateTimeRemaining, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, [data]);

    // Format number with leading zero if needed
    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="p-[20px]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Time Remaining</h1>
                <button onClick={() => setEditModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit Time
                </button>
            </div>

            {data && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <div className="text-center flex-1">
                            <div className="text-5xl font-bold text-blue-600">
                                {formatNumber(timeRemaining.days)}
                            </div>
                            <div className="text-sm text-gray-600">Days</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-5xl font-bold text-blue-600">
                                {formatNumber(timeRemaining.hours)}
                            </div>
                            <div className="text-sm text-gray-600">Hours</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="text-5xl font-bold text-blue-600">
                                {formatNumber(timeRemaining.minutes)}
                            </div>
                            <div className="text-sm text-gray-600">Minutes</div>
                        </div>
                    </div>
                    <div className="mt-4 text-gray-700">
                        <p><strong>Target Date:</strong> {new Date(data).toLocaleString()}</p>
                    </div>
                </div>
            )}
            <EditAdminTime refresh={fetchData} data={data} isOpen={editModal} onClose={()=>setEditModal(false)} />
        </div>

    );
}