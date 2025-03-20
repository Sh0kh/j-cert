import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function About() {
 
 
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animatsiya davomiyligi
      once: true, 
    });
  }, []);
    return (

      <section id="about"   className="about section">
        <div id="container" className="container">
          <div data-aos="fade-up" data-aos-delay="100" className="card-three">
            <h6>J-CERT haqida</h6>
            <p>
              J-CERT 生活・職能日本語検定 – JAPAN INTERNATIONAL HUMAN CAPITAL DEVELOPMENT ORGANIZATION (JIHDO) tomonidan
              o‘tkaziladigan Yapon tili bilish darajasini tasdiqlab beruvchi xalqaro sertifikatdir. Sertifikat
              uchun imtihonlar dunyoning 12 mamlakatida o‘tkazib kelinmoqda. J-CERT sertifikati YAPONIYA VAZIRLAR
              MAHKAMASI (内閣府） ro‘yxatidan o‘tgan hamda YAPONIYA IMMIGRATSIYA AGENTLIGI tomonidan tan olinadi.
            </p>
            <a
              href="https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00159.html"
              target="_blank"
              rel="noopener noreferrer"
              className="about-btn"
              color="#fff"
            >
              Immigratsiya agentligi
            </a>
          </div>
        </div>
      </section>
    );
  }
  