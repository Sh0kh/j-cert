import { useState, useEffect } from "react";
import img1 from "../../img/photo (4).jpg";
import img2 from "../../img/photo (6).jpg";
import img3 from "../../img/photo (8).jpg";
import axios from "axios";

export default function Clients() {
  const [data, setData] = useState('');
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3];

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

  useEffect(() => {
    // Only start the countdown if data is available
    if (!data) return;

    const countdownDate = new Date(data).getTime();

    // Check if the date is valid
    if (isNaN(countdownDate)) {
      console.error("Invalid date format:", data);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]); // Only run when data changes

  // Auto-rotate slider
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(sliderInterval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="clients" className="clients section light-background">
      <div className="section-two">
        <h2 className="head-two">Keyingi TEST sanasi</h2>
        <div className="countdown">
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }} className="hours">
            <h2>{time.days}</h2>
            <p>DAYS</p>
          </div>
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }} className="hours">
            <h2>{time.hours}</h2>
            <p>HOURS</p>
          </div>
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }} className="minutes">
            <h2>{time.minutes}</h2>
            <p>MINUTES</p>
          </div>
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }} className="seconds">
            <h2>{time.seconds}</h2>
            <p>SECONDS</p>
          </div>
        </div>
        <p className="mt-[25px]" id="until">Vaqt qoldi</p>
        {/* Slider */}
        <div className="slider-container">
          <div className="slider">
            <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="slide-image" />
          </div>
          <div className="buttons">
            <button onClick={prevSlide}>&#10094;</button>
            <button onClick={nextSlide}>&#10095;</button>
          </div>
        </div>
      </div>
    </section>
  );
}