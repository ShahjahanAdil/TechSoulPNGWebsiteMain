import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { ChevronRight, ChevronLeft } from "lucide-react";
import img1 from "../../../assets/images/car.png";

const buttonLabels = [
  "Arrows",
  "Hearts",
  "Tree",
  "Star",
  "Birthday",
  "Flower",
  "Light",
  "Crown",
  "Sun",
  "Smoke",
  "Explosion",
  "Animals",
  "Logo",
  "Cloud",
  "Ribbons",
  "Circle",
  "Bird",
  "Line",
  "People",
  "Cars",
  "Explosion",
  "Animals",
  "Logo",
  "Cloud",
  "Ribbons",
  "Circle",
  "Bird",
  "Line",
  "People",
  "Cars",
  "Explosion",
  "Animals",
  "Logo",
  "Cloud",
  "Ribbons",
  "Circle",
  "Bird",
  "Line",
  "People",
  "Cars",
];

const images = [img1];

export default function Main() {
  const [buttonsPerPage, setButtonsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateButtonsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setButtonsPerPage(4);
      else if (width < 768) setButtonsPerPage(8);
      else if (width < 1024) setButtonsPerPage(12);
      else setButtonsPerPage(20);
    };

    updateButtonsPerPage();
    window.addEventListener("resize", updateButtonsPerPage);
    return () => window.removeEventListener("resize", updateButtonsPerPage);
  }, []);

  const totalPages = Math.ceil(buttonLabels.length / buttonsPerPage);

  const next = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const sliderWidth = `${100 * totalPages}%`;
  const slideOffset = `-${(100 / totalPages) * currentPage}%`;
  const buttonWidth = `${100 / buttonsPerPage}%`;
  return (
    <>
      <section className="relative bg-[#F4F7FE] w-full h-14 flex justify-center !px-5 items-center ">
        <div className="absolute md:w-[700px] w-[95%] h-[100%] bg-white top-7 !mx-4 rounded-[8px] flex items-center shadow-md">
          <div className="border-r-2 !px-1 md:!px-5 border-gray-200">
            <div className="flex gap-1 md:gap-4 items-center text-[10px] md:text-[16px]">
              PNG Images <IoIosArrowDown />
            </div>
          </div>
          <input
            placeholder="Search"
            type="text"
            className="flex-1 !px-7 h-full outline-0 border-0"
          />
          <div className="flex items-center h-full ">
            <button className="flex md:gap-4 items-center !px-5 transition duration-150 rounded-[8px] hover:bg-[#7CD497] h-full cursor-pointer hover:text-white">
              <IoSearchOutline />
              <span className="hidden md:block">Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Heading Secttion */}
      <section className="!pt-14 !pb-10 !px-2">
        <div className="flex items-center gap-2">
          <a href="#" className="text-[#666] text-sm">
            Pngtree &gt;
          </a>{" "}
          <span className="text-[#666] text-sm"> PNG Images</span>
        </div>
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[32px] font-bold text-[#333] !mb-4">
            Free Graphic Design PNG, Vectors and PSD Files
          </h1>

          <p className="text-base text-[#333]">
            Download free graphic design PNG images, vectors and PSD files for
            your design inspiration.
          </p>
          <p className="text-base text-[#333]">
            PNG, AI, EPS, and PSD format are all available.
          </p>
        </div>
      </section>

      {/* Slider */}

      <div className="relative w-full overflow-hidden !px-2 !sm:px-4">
        {/* Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
          <button
            onClick={prev}
            disabled={currentPage === 0}
            className="cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft
              className={`w-6 h-6 text-[#5ABC84] ${
                currentPage !== 0 ? "cursor-pointer" : "opacity-20"
              }`}
            />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
          <button
            onClick={next}
            disabled={currentPage === totalPages - 1}
            className="cursor-pointer disabled:cursor-default"
          >
            <ChevronRight
              className={`w-6 h-6 text-[#5ABC84] ${
                currentPage !== totalPages - 1 ? "cursor-pointer" : "opacity-20"
              }`}
            />
          </button>
        </div>

        {/* Slider Track */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform gap-1.5 duration-[2s] ease-in-out"
            style={{
              width: sliderWidth,
              transform: `translateX(${slideOffset})`,
            }}
          >
            {buttonLabels.map((label, index) => (
              <button
                key={index}
                className="min-w-0 flex items-center justify-center text-center truncate !px-4 !py-2 bg-[#efefef] hover:bg-[#71C194] text-sm text-[#333] hover:text-white font-bold rounded transition-all duration-300"
                style={{ width: buttonWidth }}
                title={label}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}

      <div className="!my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full h-48 overflow-hidden rounded-lg shadow-sm"
          >
            <img
              src={src}
              alt={`Image ${i}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
}
