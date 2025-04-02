import React from 'react';
import img1 from '../../img/TashkentMaps.png';
import img2 from '../../img/SirdaryoMaps.png';
import img3 from '../../img/Namangan.png';
import img4 from '../../img/Samarqand.png';
import img5 from '../../img/AndijonMaps.png';

// Массив данных для карточек
const cardsData = [
  {
    id: 1,
    title: 'Toshkent',
    image: img1,
    link: 'https://www.google.com/maps/place/Japan+Digital+University/@41.3330625,69.2550781,665m/data=!3m2!1e3!4b1!4m6!3m5!1s0x38ae899921bb4a3d:0x87ffd21fbce40156!8m2!3d41.3330625!4d69.2550781!16s%2Fg%2F11pwrwl57s?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 2,
    title: 'Sirdaryo',
    image: img2,
    link: 'https://www.google.com/maps/place/IT+village+%7C+Sirdaryo/@40.8451409,68.6678694,670m/data=!3m2!1e3!4b1!4m6!3m5!1s0x38adc30fa4e58f7b:0xbb8a6ba240259f54!8m2!3d40.8451409!4d68.6678694!16s%2Fg%2F11wwq7bkd7?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 3,
    title: 'Namangan',
    image: img3,
    link: 'https://www.google.com/maps/place/IS%60HOQXON+IBRAT+NOMIDAGI+NAMANGAN+DAVLAT+CHET+TILLARI+INSTITUTI/@41.0067253,71.5092686,668m/data=!3m2!1e3!4b1!4m6!3m5!1s0x38bb352f0bf9c835:0x15fb92619a203113!8m2!3d41.0067253!4d71.5092686!16s%2Fg%2F11t6vmz5fv?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D', // Ссылка для третьей карточки
  },
  {
    id: 4,
    title: 'Samarqand',
    image: img4,
    link: 'https://www.google.com/maps/place/%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4,+%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD/@39.6405719,66.8030778,43626m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3f4d191960077df7:0x487636d9d13f2f57!8m2!3d39.6507963!4d66.9653502!16zL20vMGRsM2c?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 5,
    title: 'Andijon',
    image: img5,
    link: 'https://www.google.com/maps/place/%D0%90%D0%BD%D0%B4%D0%B8%D0%B6%D0%B0%D0%BD,+%D0%90%D0%BD%D0%B4%D0%B8%D0%B6%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD/@40.8108742,72.2817816,8469m/data=!3m1!1e3!4m6!3m5!1s0x38bc901d6b13d4ef:0xfc45bcaa7973dfac!8m2!3d40.8153561!4d72.28375!16zL20vMDJwNDA5?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D', // Ссылка для пятой карточки
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact section bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Test manzili</h2>
        </div>
        {/* Верхний ряд с тремя карточками */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {cardsData.slice(0, 3).map((card) => (
            <a
              key={card.id}
              href={card.link} // Ссылка для перехода
              target="_blank" // Открывает ссылку в новой вкладке
              rel="noopener noreferrer" // Безопасность для новых вкладок
              className="block bg-white p-6 shadow-lg rounded-lg w-full sm:w-72 md:w-80 lg:w-96 text-center transition-all duration-300 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />
            </a>
          ))}
        </div>

        {/* Нижний ряд с двумя карточками */}
        <div className="flex flex-wrap justify-center gap-6">
          {cardsData.slice(3, 5).map((card) => (
            <a
              key={card.id}
              href={card.link} // Ссылка для перехода
              target="_blank" // Открывает ссылку в новой вкладке
              rel="noopener noreferrer" // Безопасность для новых вкладок
              className="block bg-white p-6 shadow-lg rounded-lg w-full sm:w-72 md:w-80 lg:w-96 text-center transition-all duration-300 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}