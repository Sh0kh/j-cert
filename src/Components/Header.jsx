import { useEffect, useState } from "react";
import logo from "../img/big-logo.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header id="header" className={`header fixed-top ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-end">
        <a style={{ backgroundColor: "#fff" }} href="index.html" className="logo d-flex align-items-center me-auto">
          <img src={logo} alt="Logo" />
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="https://secure.j-cert.org/score/" className="active">Natijani ko'rish</a></li>
            <li><a href="#about">Biz haqimizda</a></li>
            <li><a href="/portfolio">Postlar</a></li>
            <li><a href="#clients">Vaqt qoldi</a></li>
            <li><a href="#locations">Manzillar</a></li>
            <li><a href="#contact">Bog'lanish</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <a className="btn-getstarted" href="form.html">Ro'yxatdan o'tish</a>
      </div>
    </header>
  );
}
