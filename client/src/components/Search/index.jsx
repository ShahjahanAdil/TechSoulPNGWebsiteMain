import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Search() {

    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate(`/images?s=${searchText}`)
    }

    return (
        <div className='flex justify-center px-5'>
            <div className="flex w-full max-w-[700px] items-center justify-center mt-8 border border-gray-200 transition-all duration-200 rounded-md ease-linear hover:ring-2 ring-[#71C194] hover:ring-offset-1 ring-offset-slate-50">
                <div className="relative group inline-block">
                    <button className="p-3 sm:text-[14px] text-[11px] text-[#666] bg-white  flex gap-2 items-center  rounded-l-md text-base">
                        Categories <IoIosArrowDown className='transition-transform duration-300 group-hover:rotate-180' />
                    </button>
                    <div className="absolute hidden group-hover:block bg-white border border-gray-200  z-10 w-45 rounded-[5px]">
                        <ul className="flex flex-col items-start text-sm">
                            {["png", "jpg", "webp", "backgrounds", "illustrations"].map((item, i) => {
                                return (
                                    <li key={i} className="px-4 py-2 uppercase text-[#333] transition-all duration-500 ease-in-out hover:text-[#71C194] cursor-pointer">{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Copyright images waiting for you to discover"
                    className="w-full bg-white max-w-[700px] text-[11px] sm:text-[14px] !border-none !p-2 text-sm md:text-base"
                    onChange={e => setSearchText(e.target.value.toLocaleLowerCase())}
                    onKeyDown={e => e.key.toLocaleLowerCase() === 'enter' && handleSearch()}
                />

                <button className="bg-[#6FD38E] text-white p-3 rounded-r-md flex items-center gap-1 text-sm md:text-base" onClick={handleSearch}>
                    <FaSearch />  <span className='!hidden sm:!block'>Search</span>
                </button>
            </div>
        </div>
    )
}