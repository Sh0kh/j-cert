import img_calendar from '../../img/photo (7).png'
import img from '../../img/photo (3).jpg'

export default function Five() {
    return (
      <section>
        <div className="section-five">
          <div className="card-top">
            
            {/* Rasmlar */}
            <div className="card-five" data-aos="fade-up" data-aos-delay="200">
              <img src={img_calendar} alt="Natijalar" />
            </div>
  
            {/* Natijalarni ko'rish */}
            <div className="card-five" data-aos="fade-up" data-aos-delay="200">
              <div className="center one">
                <h6>NATIJALARNI KO’RISH</h6>
                <p>
                  Natijani ko’rish uchun ruhsatnoma (受験票）da ko’rsatilgan raqam va tug’ilgan kun
                  ma’lumotlaringizni kiriting yoki ruhsatnomadagi QR kodni skanerlang.
                </p>
                <a href="https://secure.j-cert.org/score/" target="_blank" rel="noopener noreferrer">
                  <button style={{ color: "#fff" }}>Natijani ko'rish</button>
                </a>
              </div>
            </div>
  
            {/* Test jadvali */}
            <div className="card-five" data-aos="fade-up" data-aos-delay="200">
              <div className="center">
                <h6>Test jadvali</h6>
                <p style={{ maxWidth: "670px" }}>
                  Yilda 6 marta A1 (N5 dan past), A2.1 (N5), A2.2 (N4) darajalar uchun test o’tkaziladi. <br />
                  2025.07.13 sanasida B1 (N3), B2 (N2), C1 (N1) darajalari uchun test o’tkaziladi.
                </p>
                <a href="https://t.me/j_certuzbekistan" target="_blank" rel="noopener noreferrer">
                  <button style={{ color: "#fff" }}>Batafsil</button>
                </a>
              </div>
            </div>
  
            {/* Rasmlar */}
            <div className="card-five" data-aos="fade-up" data-aos-delay="200">
              <img src={img} alt="Test jadvali" />
            </div>
  
          </div>
        </div>
      </section>
    );
  }
  