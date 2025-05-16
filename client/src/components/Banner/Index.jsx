import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Banner() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_HOST}/frontend/home/fetch-categories`)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setCategories(data.cats);
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
    <div className="pt-6 pb-12 md:pt-10 px-2 text-center">
      <h1>
        20,189,213 Graphic Resources For Free Download
      </h1>
      <p className="text-sm md:text-lg text-gray-500 font-medium mt-2">
        Royalty Free Latest PNG Images, JPG, WEBP, Backgrounds, Illustrations
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-3 md:gap-0 ">
        <div className="relative group inline-block">
          <button className="px-4 py-3 bg-white border text-[#333] flex gap-2 items-center border-gray-300 rounded-l-md text-base">
            Categories <IoIosArrowDown />
          </button>
          <div className="absolute hidden py-2 group-hover:block bg-white border border-gray-200  z-10 w-45 rounded-[5px]">
            <ul className="flex flex-col items-start text-sm">
              {["png", "jpg", "webp", "backgrounds", "illustrations"].map((item, i) => {
                return (
                  <li className="px-4 py-2 uppercase text-[#333] transition-all duration-500 ease-in-out hover:text-[#71C194] cursor-pointer">{item}</li>
                )
              })}
            </ul>
          </div>
        </div>
        <input
          type="text"
          placeholder="Copyright images waiting for you to discover"
          className="w-full md:w-[700px] px-4 py-3 border border-b border-gray-400 outline-[#73C295] text-sm md:text-base"
        />

        <button className="bg-[#6FD38E] text-white px-4 py-[13px] rounded-r-md flex items-center gap-1 text-sm md:text-base">
          <FaSearch /> Search
        </button>
      </div>

      <div className="mt-5 text-gray-600">
        <ul className="flex flex-wrap justify-center gap-2 cursor-pointer">
          {categories.map((item, i) => (
            <li
              key={i}
              className="bg-[#ececec] text-[10px] sm:text-[12px] flex items-center py-1 px-3 capitalize rounded-[20px] gap-2 whitespace-nowrap transition-all duration-150 ease-linear hover:bg-[#dfdfdf]"
            >
              <RiSearchLine /> {item.category}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}