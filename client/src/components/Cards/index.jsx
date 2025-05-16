import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = ["nature", "technology", "clothing", "food"];

export default function Cards() {
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("nature");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, [activeTab]);

  const fetchImages = () => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_HOST
        }/frontend/fetch-tab-images?category=${activeTab}`
      )
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setImages(data.imgs);
        }
      })
      .catch((err) => {
        console.error("Frontend POST error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mainContainer px-[8px] md:py-7">
      <h2 className="!text-[24px] sm:!text-[30px] font-bold md:mb-6">
        Explore popular creative Assets
      </h2>

      <div className="flex gap-3 mt-5">
        {tabs.map((cat) => {
          return (
            <button
              className={`capitalize text-[14px] sm:text-[18px] pb-1 rounded-sm transition-all duration-150 ease-in-out cursor-pointer font-bold text-[#333] border-b-[#5ABC84] ${
                cat === activeTab ? "border-b-4" : "border-none"
              }`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <section className="md:py-10 py-5 md:px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={img.imageID}
              className={`relative group cursor-pointer rounded-lg shadow-sm overflow-hidden ${
                index % 3 !== 0 ? "bg-[#F5E9D7]" : "bg-[#F5F6F5]"
              }`}
              onClick={() => navigate(`/image/${img.imageID}`)}
            >
              <img
                src={`${import.meta.env.VITE_HOST}${img.imageURL}`}
                alt={img.title}
                className="w-full h-[150px] sm:h-[200px] object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover-activated gradient + title */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#ABABAB] via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
                <p className="!text-white text-lg mb-4 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
