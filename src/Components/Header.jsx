import { useEffect, useState } from "react";
import logo from "../img/big-logo.jpg";
import { NavLink } from "react-router-dom";

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
        <NavLink style={{ backgroundColor: "#fff" }} to={'/'} className="logo d-flex align-items-center me-auto">
          <img src={logo} alt="Logo" />
        </NavLink>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <NavLink to={'/check'}>Natijani korish</NavLink>
            </li>
            <li>
              <a href="#about">Biz haqimizda</a>
            </li>
            <li>
              <NavLink to={'/portfolio'}>Postlar</NavLink>
            </li>
            <li>
              <a href="#clients">Test vaqti</a>
            </li>
            <li>
              <a href="#contact">Manzillar</a>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
        <NavLink className={'btn-getstarted'} to={'/register'}>
          Ro'yxatdan o'tish
        </NavLink>
      </div>
    </header>
  );
}
