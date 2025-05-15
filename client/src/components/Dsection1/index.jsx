import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// import flag from '../../assets/images/pakflag.png'

export default function Dsection1() {
    return (
        <>
        
             <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-3 md:gap-0 ">
                    <div className="relative group inline-block">
                      <button className="px-3 py-2 bg-white border flex gap-2 items-center border-gray-200 rounded-l-md text-base">
                        Categories <IoIosArrowDown className='transition-transform duration-300 group-hover:rotate-180' />
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
              className="w-full md:w-[700px] px-4 py-2 border border-b border-gray-200 outline-[#73c29593] text-sm md:text-base"
            />
            
                    <button className="bg-[#6FD38E] text-white px-3 py-[9px] rounded-r-md flex items-center gap-1 text-sm md:text-base">
                      <FaSearch /> Search
                    </button>
                  </div>
        </>
    )
}
