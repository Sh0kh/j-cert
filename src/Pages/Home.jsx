import Hero from "../Components/Home/Hero";
import Clients from "../Components/Home/Clients";
import About from "../Components/Home/About";
import Stats from "../Components/Home/Stats";
import Why from "../Components/Home/Why";
import Four from "../Components/Home/Four";
import Five from "../Components/Home/Five";
import Contact from "../Components/Home/Contact";
import Top from "../Components/Top"; // Import qildik
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`/sdg/uz/test/date/get`);
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <Hero />
            <Clients data={data} />
            <About />
            <Stats />
            <Why data={data} />
            <Four />
            <Five />
            <Contact />
            <Top />
        </div>
    );
}
