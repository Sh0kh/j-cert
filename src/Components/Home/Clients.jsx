import { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../../utils/Config";

export default function Clients({ data }) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Таймер
  useEffect(() => {
    if (!data) return;

    const countdownDate = new Date(data).getTime();
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
  }, [data]);

  // Автопереключение
  useEffect(() => {
    if (images.length === 0) return;
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(sliderInterval);
  }, [images]);

  const nextSlide = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevSlide = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  // Получение картинок из backend
  const getPost = async () => {
    try {
      const response = await axios.get(`/sdg/uz/branch/get?postType=POST`);
      const arr = response.data?.object || [];

      // формируем массив ссылок с photoId
      const imgs = arr.map((item) =>
        item.photoId
          ? `${CONFIG?.API_URL}/sdg/uz/view/one/photo?id=${item.photoId}`
          : "https://source.unsplash.com/random/400x300/?city"
      );

      setImages(imgs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <section id="clients" className="clients section light-background">
      <div className="section-two">
        <h2 className="head-two">Keyingi TEST sanasi</h2>
        <div className="countdown  mb-[20px]">
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }}>
            <h2>{time.days}</h2>
            <p>DAYS</p>
          </div>
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }}>
            <h2>{time.hours}</h2>
            <p>HOURS</p>
          </div>
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }}>
            <h2>{time.minutes}</h2>
            <p>MINUTES</p>
          </div>
          <div style={{ width: "100px", height: "70px", fontSize: "20px" }}>
            <h2>{time.seconds}</h2>
            <p>SECONDS</p>
          </div>
        </div>
        <div className="h-[30px]">

        </div>

        {/* Slider */}
        <div className="slider-container">
          <div className="slider">
            {images.length > 0 ? (
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="slide-image"
              />
            ) : (
              <p>Loading images...</p>
            )}
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
