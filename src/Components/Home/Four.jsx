import img from "../../img/photo (2).png"
export default function Four() {
    return (
      <section>
        <div className="section-four">
          
          {/* 4 sabab */}
          <div 
            id="card-four" 
            data-aos="fade-up" 
            data-aos-delay="200" 
            className="card-four"
            style={{ backgroundColor: "#009970" }}
          >
            <h6>J-CERTni tanlash uchun 4 sabab:</h6>
            <ol>
              <li>
                <b>SERTIFIKAT SIZ TO’PLAGAN BALL ASOSIDA TAQDIM ETILADI.</b> Test CEFR shkalasi va JLPT me’zonlari asosida baholanadigan 3 darajaga bo’linadi.
                <ul>
                  <li className="li_4" ><b>BASIC COURSE</b> - Boshlang‘ich, A1, A2.1 (N5), A2.2 (N4) darajalari uchun bir vaqtda ro‘yxatdan o‘tiladi.</li>
                  <li className="li_4" ><b>ADVANCED COURSE</b> - B1 (N3), B2 (N2), C1 (N1) darajalari uchun bir vaqtda ro‘yxatdan o‘tiladi.</li>
                  <li  className="li_4"><b>MASTER COURSE</b> - C2 bu JLPT N1 yuqori darajasi bo‘lib, bu bo‘limda yozma (writing) va gapirish (speaking) bo‘limlari ham mavjud.</li>
                </ul>
              </li>
              <li><b>YILDA 6 MARTA O’TKAZILADI</b></li>
              <li>
                <b>TEZKOR NATIJA</b> <br />
                Test natijalari 1 ish kunida e’lon qilinadi. Sertifikat 10 kun ichida qo‘lingizda bo‘ladi.
              </li>
              <li>
                <b>TEST O’TKAZISH MARKAZLARINING KO’PLIGI</b> <br />
                Hozirda Respublikaning 4 viloyatida test markazlari mavjud. Kelgusida barcha viloyatlarda tashkil etish rejalashtirilgan.
              </li>
            </ol>
          </div>
  
          {/* Rasmlar */}
          <div className="card-four" data-aos="fade-up" data-aos-delay="200">
            <img 
              style={{ width: "100%", borderRadius: "20px", objectFit: "cover" }} 
              src={img} 
              alt="J-CERT" 
            />
          </div>
  
        </div>
      </section>
    );
  }
  