import React from "react";
import img1 from "../../assets/images/card1.avif";
import img2 from "../../assets/images/card2.avif";
import img3 from "../../assets/images/card3.avif";
import img4 from "../../assets/images/card4.avif";

import trend1 from "../../assets/images/trend1.avif";
import trend2 from "../../assets/images/trend2.avif";
import trend3 from "../../assets/images/trend3.avif";
import trend4 from "../../assets/images/arrow.avif";
import trend5 from "../../assets/images/trend5.avif";
import trend6 from "../../assets/images/trend6.avif";
import trend7 from "../../assets/images/trend7.avif";
import trend8 from "../../assets/images/trend8.avif";

const popularCollections = [
  { src: img1, title: "Mother's Day" },
  { src: img2, title: "Ascension Day" },
  { src: img3, title: "Happy Mother's Day" },
  { src: img4, title: "International Nurses Day" },
];

const designTrends = [
  { src: trend1, title: "Jumma mubarak", count: "1,452 PNG images" },
  { src: trend2, title: "Hajj", count: "983 PNG images" },
  { src: trend3, title: "Pakistan flag", count: "6,835 PNG images" },
  { src: trend4, title: "North Arrow", count: "1,103 PNG images" },
  { src: trend5, title: "Bismillah", count: "528 PNG images" },
  { src: trend6, title: "iPhone mockup", count: "612 PNG images" },
  { src: trend7, title: "Location icon", count: "889 PNG images" },
  { src: trend8, title: "Islamic", count: "2,114 PNG images" },
];

export default function Section3() {
  return (
    <>
      <div className="mainContainer">
        <div className=" mx-auto px-4 py-10 space-y-12">
          {/* Popular Collections */}
          <div>
            <h2 className="md:text-4xl text-2xl font-semibold mb-2">
              Popular collections to inspire you
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Explore trending themed collections and find the perfect visual.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {popularCollections.map((item, idx) => (
                <div
                  key={idx}
                  className="h-64 rounded-lg bg-cover bg-center relative hover:scale-102 transition-all duration-500"
                  style={{ backgroundImage: `url(${item.src})` }}
                >
                  <div className="absolute bottom-2 left-2 text-white bg-[#6666668f] px-2 py-1 rounded !text-[10px] sm:!text-sm font-medium">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Trends */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Keep up with design trends
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Discover the most sought-after and trendy design collections.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {designTrends.map((trend, index) => (
                <div
                  key={index}
                  className={`${
                    index % 3 !== 0 ? "bg-[#F5E9D7]" : "bg-[#F5F6F5]"
                  } hover:scale-102 bg-contain bg-no-repeat transition-all duration-500 rounded-lg overflow-hidden shadow bg-center relative h-52 sm:h-60`}
                  style={{ backgroundImage: `url(${trend.src})` }}
                >
                  <div className="" />
                  <div className="absolute bottom-3 left-3 text-black z-10">
                    <p className="font-semibold text-sm">{trend.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
