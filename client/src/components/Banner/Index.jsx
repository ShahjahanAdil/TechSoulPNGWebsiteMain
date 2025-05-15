import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


export default function Banner() {

  return (
    <div className=" py-10 px-4 text-center md:mt-[40px]">
      <h1 className="text-2xl md:text-5xl font-bold text-gray-900">
        20,189,213 Graphic Resources For Free Download
      </h1>
      <p className="text-sm md:text-lg text-gray-500 font-medium mt-2">
        Royalty Free PNG Images, Vectors, Backgrounds, Templates + AI PNG Maker | Photo Editor | BG Remover
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-3 md:gap-0 ">
        <div className="relative group inline-block">
          <button className="px-4 py-3 bg-white border flex gap-2 items-center border-gray-300 rounded-l-md text-base">
            Categories <IoIosArrowDown />
          </button>
          <div className="absolute hidden group-hover:block bg-white border border-gray-200  z-10 w-45 rounded-[5px]">
            <ul className="flex flex-col items-start text-sm">
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">PNG Images</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Templates</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Backgrounds</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Text effects</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Illustrations</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Power Points</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Collections</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">POD</li>
              <li className="px-4 py-2  transition-all duration-500 ease-in-out  hover:text-[#71C194] cursor-pointer">Image Editor</li>
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


      <div className="mt-4 text-sm text-gray-700">
  <ul className="flex flex-wrap justify-center gap-2">
    {["Mothers Day", "Flower", "Suit", "Leaf", "Arrow", "Tree", "Border", "Light"].map((item, i) => (
      <li
        key={i}
        className="bg-[#ececec] flex items-center py-2 px-3 rounded-[20px] font-semibold gap-2 whitespace-nowrap"
      >
        <FaSearch /> {item}
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}
