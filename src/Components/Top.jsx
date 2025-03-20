import { useEffect, useState } from "react";

export default function Top() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`top_qwe ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            <i className="bi bi-arrow-up-short text-2xl"></i>
        </button>
    );
}
