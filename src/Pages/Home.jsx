import Hero from "../Components/Home/Hero";
import Clients from "../Components/Home/Clients";
import About from "../Components/Home/About";
import Stats from "../Components/Home/Stats";
import Why from "../Components/Home/Why";
import Four from "../Components/Home/Four";
import Five from "../Components/Home/Five";
import Contact from "../Components/Home/Contact";
import Top from "../Components/Top"; // Import qildik

export default function Home() {
    return (
        <div>
            <Hero />
            <Clients />
            <About />
            <Stats />
            <Why />
            <Four />
            <Five />
            <Contact />
            <Top /> {/* Scroll to Top tugmasini qo‘shdik */}
        </div>
    );
}
