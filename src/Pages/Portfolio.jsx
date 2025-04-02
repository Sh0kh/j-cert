import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import photo from "../img/photo (10).jpg";
import logo from "../img/big-logo.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import HeaderModal from "../Components/HeaderModal";

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 1000, // Animatsiya davomiyligi
      once: true,
    });
  }, []);

  return (
    <div>
      <header id="header" className={`header fixed-top ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-end">
          <NavLink style={{ backgroundColor: "#fff" }} to={'/'} className="logo d-flex align-items-center me-auto">
            <img src={logo} alt="Logo" />
          </NavLink>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <NavLink to={'/'}>Bo'sh sahifa</NavLink>
              </li>
              <li>
                <NavLink to={'/check'}>Natijani korish</NavLink>
              </li>
              <li>
                <NavLink to={'/portfolio'}>Postlar</NavLink>
              </li>
            </ul>
            <i onClick={()=>setModal(true)} className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          <NavLink className={'btn-getstarted'} to={'/register'}>
            Ro'yxatdan o'tish
          </NavLink>
        </div>
      </header>
      <HeaderModal isOpen={modal} onClose={()=>setModal(false)}/>
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
                  <p>50% = 入門 (Boshlang’ich) <br /> 60% = JLPT N5 <br /> 70% = JLPT N4</p>
                  <p>Tesdan o’tish yoki o’tolmasligidan qat’iy nazar barcha ishtirokchilarga test natijalari yozilgan sertifikat taqdim etiladi.
                    Ular ham 10 kundan keyin hujjatning pdf shaklini olishlari mumkin.
                    *Bilish darajangizni qayd etib borish (自己記録）maqsadida foydalansangiz bo’ladi.
                    Shuningdek, ayni paytdagi yapon tili bilimingiz ko’rsatib beruvchi hujjat sifatida ham taqdim eta olasiz.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}