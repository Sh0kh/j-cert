import React, { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../utils/Config";
import ReactLoading from "react-loading";


export default function Contact() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true)

  const getLocation = async () => {
    try {
      const response = await axios.get(`/sdg/uz/branch/get?postType=MAP
`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });

      // допустим, API возвращает { object: [ { id, name, imageUrl, mapLink } ] }
      setLocations(response?.data?.object || []);
    } catch (error) {
      console.log("Lokatsiyani olishda xato:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getLocation();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
      </div>
    );
  }

  return (
    <section id="contact" className="contact section bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Filiallar manzili</h2>
        </div>

        {locations.length === 0 ? (
          <p className="text-center text-gray-500">Ma'lumotlar yuklanmoqda...</p>
        ) : (
          <>
            {/* Barcha filiallar grid ko‘rinishda */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((branch) => (
                <a
                  key={branch.id}
                  href={branch.mapURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-6 shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {branch.title}
                  </h3>
                  <img
                    src={
                      branch.photoId
                        ? `${CONFIG?.API_URL + `/sdg/uz/view/one/photo?id=` + branch.photoId}`
                        : "https://source.unsplash.com/random/400x300/?city"
                    } alt={branch.name}
                    className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
