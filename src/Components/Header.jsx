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
              <a href="https://secure.j-cert.org/score/" target="_blank" rel="noopener noreferrer">
                Natijani ko'rish
              </a>
            </li>
            <li>
              <NavLink to={'/#about'}>Biz haqimizda</NavLink>
            </li>
            <li>
              <NavLink to={'/portfolio'}>Postlar</NavLink>
            </li>
            <li>
              <NavLink to={'/#clients'}>Vaqt qoldi</NavLink>
            </li>
            <li>
              <NavLink to={'/#contact'}>Manzillar</NavLink>
            </li>
            <li>
              <NavLink to={'/#contact'}>Bog'lanish</NavLink>
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
