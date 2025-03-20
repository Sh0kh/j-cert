import { useEffect, useRef } from "react";
import Footer from "../Components/Footer";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import photo from "../img/photo (10).jpg";
import logo from "../img/big-logo.jpg";

export default function Portfolio() {
  return (
    <div>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-end">
          <a style={{ backgroundColor: "#fff" }} href="/" className="logo d-flex align-items-center me-auto">
            <img src={logo} alt="Logo" />
          </a>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="https://secure.j-cert.org/score/">Natijani ko'rish</a></li>
              <li><a href="#services">Postlar</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          <a className="btn-getstarted" href="/register">Ro'yxatdan o'tish</a>
        </div>
      </header>

      <main className="main">
        <div className="page-title light-background">
          <div className="container">
            <h1 style={{ fontSize: "15px" }}>29th Yanvar 2025</h1>
            <h1>J-CERT multilevel yapon tili bilish darajasini aniqlash testi</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><img style={{ width: "70px" }} src={logo} alt="Logo" /></li>
                <li className="current">J-CERT UZBEKISTAN</li>
              </ol>
            </nav>
          </div>
        </div>

        <section id="portfolio-details" className="portfolio-details section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-8">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  loop={true}
                  speed={600}
                  autoplay={{ delay: 5000 }}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  className="portfolio-details-slider"
                >
                  <SwiperSlide><img style={{ width: "100%" }} src={photo} alt="Slide" /></SwiperSlide>
                  <SwiperSlide><img style={{ width: "100%" }} src={photo} alt="Slide" /></SwiperSlide>
                  <SwiperSlide><img style={{ width: "100%" }} src={photo} alt="Slide" /></SwiperSlide>
                </Swiper>
              </div>
              <div className="col-lg-4">
                <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                  <h3>J-CERT multilevel yapon tili bilish darajasini aniqlash testi baholash tartibini tushuntiramiz.</h3>
                  <ul>
                    <li>Advanced: N3=B1, N2=B2, N1=C1</li>
                    <li>Basic: 入門-Boshlang’ich, N5, N4=A2</li>
                    <li>Master: Gapirish bo’limi mavjud</li>
                  </ul>
                </div>
                <div className="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                  <h2>Bu safar faqatgina "Basic" ni baholash ko’rsatkichlarini tanishtirmoqdamiz.</h2>
                  <p>Umumiy 200 ballning:</p>
                  <p>50% = 入門 (Boshlang’ich), 60% = JLPT N5, 70% = JLPT N4</p>
                  <p>Test natijalari yozilgan sertifikat taqdim etiladi va 10 kundan keyin pdf shaklini olish mumkin.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}