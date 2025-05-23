import React from "react";
import pngImg from "../../../assets/images/bgPNGFinal.jpg";
import car from "../../../assets/images/car.png";

export default function Favourites() {
  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] h-fit shadow">
      <h5 className="my-4 p-[20px] md:text-center ">My Favourites</h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          style={{ backgroundImage: `url(${pngImg})` }}
          className="relative group cursor-pointer flex items-center justify-center p-1 h-[150px] sm:h-[170px] md:h-[200px]  rounded-[12px]"
        >
          <img src={car} alt="" srcset="" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-[12px]"></div>

          <div className="absolute hidden group-hover:flex items-center gap-[120px] top-2 transition-all opacity-0 group-hover:opacity-100 duration-300">
            <span className="text-[#333] !text-[12px] bg-[#ffffff] rounded-[5px] px-1 py-[2px]">Free</span>

            <span className="text-white !text-[12px] bg-[#4eaa76] rounded-[5px] px-1 py-[2px]">PNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
