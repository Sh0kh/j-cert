import { NavLink } from "react-router-dom";
import img1 from "../../img/big-logo.jpg";
import img2 from "../../img/j-cert-1.jpg";
import img3 from "../../img/registration-is-open.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Why({ data }) {
  const [locations, setLocations] = useState([]);

  const getLocation = async () => {
    try {
      const response = await axios.get(`/sdg/uz/branch/get?postType=REGISTER`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      // API возвращает { object: [ { id, title, content, imageUrl, mapLink } ] }
      setLocations(response?.data?.object || []);
    } catch (error) {
      console.log("Lokatsiyani olishda xato:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <section id="why-us" className="why-us section">
      <div className="container">
        <div className="row gy-3">
          <div className="cards col-lg-12 d-flex align-items-stretch">
            <div
              className="cards row gy-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Ro‘yxatdan o‘tish */}
              <div className="col-xl-3">
                <div className="icon-box">
                  {locations.length > 0 ? (
                    // Рендерим HTML, пришедший с backend
                    <div
                      dangerouslySetInnerHTML={{
                        __html: locations[0].description,
                      }}
                    />
                  ) : (
                    <>
                      <h4>RO’YHATDAN O’TISH</h4>
                      <p>
                        {/* fallback если нет данных */}
                        {data
                          ? `${new Date(data).toLocaleDateString()} kuni bo’lib o’tadigan daraja testi uchun ro’yhatdan o’tish davom etmoqda.`
                          : "Ma’lumot topilmadi"}
                      </p>
                    </>
                  )}
                  <NavLink className="a_btn " to={"/register"}>
                    Hujjatlarni jo'natish
                  </NavLink>
                </div>
              </div>

              {/* Ro‘yxatdan o‘tish ochiq */}
              <div className="col-xl-3" data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <img
                    style={{ width: "100%" }}
                    src={img3}
                    alt="Ro‘yxatdan o‘tish ochiq"
                  />
                </div>
              </div>

              {/* Logotip va J-CERT rasmi */}
              <div className="col-xl-3" data-aos="fade-up" data-aos-delay="400">
                <div
                  className="icon-box d-flex flex-column justify-content-center align-items-center"
                  style={{ gap: "40px" }}
                >
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
