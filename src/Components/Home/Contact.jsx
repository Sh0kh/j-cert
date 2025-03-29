import React, { useRef } from 'react';
import Swal from 'sweetalert2';

export default function Contact() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Очистка полей формы
    if (formRef.current) {
      formRef.current.reset();
    }

    // Показать уведомление SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Muvaffaqiyatli!',
      text: 'Xabaringiz muvaffaqiyatli yuborildi. Rahmat!',
      confirmButtonText: 'OK',
    });
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Biz bilan ulanishingiz mumkin bo'lgan manzillar</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Manzil</h3>
                  <p>Sidrayo tumani</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Raqam</h3>
                  <p>+998 99 113 21 40</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email</h3>
                  <p>jcertuzbekistan@gmail.com</p>
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2868.8789335934343!2d68.6678694!3d40.8451409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38adc30fa4e58f7b%3A0xbb8a6ba240259f54!2sIT%20village%20%7C%20Sirdaryo!5e1!3m2!1sen!2s!4v1741029126595!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          <div className="col-lg-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">Ismingiz</label>
                  <input type="text" name="name" id="name-field" className="form-control" required />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">Email</label>
                  <input type="email" className="form-control" name="email" id="email-field" required />
                </div>

                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">Mavzu</label>
                  <input type="text" className="form-control" name="subject" id="subject-field" required />
                </div>

                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">Xabar</label>
                  <textarea className="form-control" name="message" rows="10" id="message-field" required></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button type="submit">Yuborish</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}