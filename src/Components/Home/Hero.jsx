import hero from '../../img/header (2).jpg';

export default function Hero() {
  return (
    <section id="hero" className="hero section dark-background">
      <img src={hero} alt="Hero image" data-aos="fade-in" className=""/>

      <div className="container text-center" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 id="testId">YAPONIYADA Ta’lim & Ish</h2>
            <p>J-CERT 生活・職能日本語検定</p>
            <p>Yaponiya biz bilan yanada yaqin!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
