import img1 from '../../img/big-logo.jpg'
import img2 from '../../img/j-cert-1.jpg'
import img3 from '../../img/registration-is-open.png'


export default function Why() {
    return (
      <section id="why-us" className="why-us section">
        <div className="container">
          <div className="row gy-3">
            <div className="cards col-lg-12 d-flex align-items-stretch">
              <div className="cards row gy-3" data-aos="fade-up" data-aos-delay="200">
                
                {/* Ro‘yxatdan o‘tish */}
                <div className="col-xl-3">
                  <div className="icon-box">
                    <h4>RO’YHATDAN O’TISH</h4>
                    <p>
                      02.03.2025 kuni bo’lib o’tadigan daraja testi uchun ro’yhatdan o’tish davom etmoqda. <br />
                      Ro’yhatdan o’tish uchun: <br />
                      1. Ism-familiyangiz <br />
                      2. 4×3 o‘lchamdagi rasm <br />
                      3. To‘lov kvitansiyasini yuboring <br />
                      (To‘lov summasi 400.000 UZS)
                    </p>
                    <a 
                      href="https://t.me/j_certuzbekistan" 
                      className="a_btn" 
                      > 
                      Hujjatlarni jo'natish
                    </a>
                  </div>
                </div>
  
                {/* Ro‘yxatdan o‘tish ochiq */}
                <div className="col-xl-3" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <img style={{ width: "100%" }} src={img3} alt="Ro‘yxatdan o‘tish ochiq" />
                  </div>
                </div>
  
                {/* Logotip va J-CERT rasmi */}
                <div className="col-xl-3" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center" style={{ gap: "40px" }}>
                    <img style={{ width: "100%" }} src={img1} alt="Big Logo" />
                    <img style={{ width: "100%" }} src={img2} alt="J-CERT" />
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  