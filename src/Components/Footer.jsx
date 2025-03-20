export default function Footer() {
    return (
      <footer id="footer" className="footer light-background">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">J-CERT</span>
              </a>
              <div className="social-links d-flex mt-4">
                <a href="https://www.youtube.com/@j-cert_uzbekistan">
                  <i className="bi bi-youtube"></i>
                </a>
                <a href="https://www.facebook.com/groups/1509510423025293">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/j_cert_uzbekistan/">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://t.me/j_certuzbekistan">
                  <i className="bi bi-telegram"></i>
                </a>
              </div>
            </div>
  
            <div className="col-lg-2 col-6 footer-links">
              <h4>Linklar</h4>
              <ul>
                <li>
                  <a href="https://t.me/j_certuzbekistan">Ro'yxatdan o'tish</a>
                </li>
                <li>
                  <a href="#about">Biz haqimizda</a>
                </li>
                <li>
                  <a href="./portfolio-details.html">Postlar</a>
                </li>
                <li>
                  <a href="#clients">Vaqt qoldi</a>
                </li>
                <li>
                  <a href="#contact">Manzil</a>
                </li>
              </ul>
            </div>
  
            <div className="col-lg-2 col-6 footer-links">
              <h4>Servislar</h4>
              <ul>
                <li>
                  <a href="#contact">Bog'lanish</a>
                </li>
                <li>
                  <a href="https://secure.j-cert.org/score/">Natijani ko'rish</a>
                </li>
              </ul>
            </div>
  
            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Bog'lanish</h4>
              <p>Buyuk turon ko'cha</p>
              <p>Adolat MFY, 120600</p>
              <p>Sirdaryo viloyati</p>
              <p className="mt-4">
                <strong>Phone:</strong> <span> +998 99 113 21 40</span>
              </p>
              <p>
                <strong>Email:</strong> <span>jcertuzbekistan@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
  
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">© 2025 J-CERT UZBEKISTAN.</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits"></div>
        </div>
      </footer>
    );
  }
  