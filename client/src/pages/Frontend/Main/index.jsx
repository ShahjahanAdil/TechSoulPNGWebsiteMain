import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { ChevronRight, ChevronLeft } from "lucide-react";
import pngBg from '../../../assets/images/bgPNGFinal.jpg'
import axios from 'axios'
import Loader from "../../../components/Loader";

export default function Main() {

    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [totalImagePages, setTotalImagePages] = useState(1)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
        fetchImages()
    }, [])

    const fetchCategories = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST}/frontend/main/fetch-categories`)
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

    const fetchImages = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST}/frontend/main/fetch-images?page=${page}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setImages(data.imgs);
                    setTotalImagePages(Math.ceil(data?.totalImgs / 25))
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

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

    const totalPages = Math.ceil(categories.length / buttonsPerPage);

    const next = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const sliderWidth = `${100 * totalPages}%`;
    const slideOffset = `-${(100 / totalPages) * currentPage}%`;
    // const buttonWidth = `${100 / buttonsPerPage}%`;

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <section className="relative bg-[#F4F7FE] w-full h-14 flex justify-center !px-5 items-center ">
                <div className="absolute md:w-[800px] w-[95%] h-[100%] bg-white top-7 !mx-4 rounded-[8px] flex items-center shadow-lg transition-all duration-150 ease-linear hover:ring-2 ring-[#71C194] hover:ring-offset-4 ring-offset-slate-50">
                    <div className="border-r-2 !px-1 md:!px-5 border-gray-200">
                        <div className="flex gap-1 md:gap-4 items-center text-[10px] md:text-[16px]">
                            PNG Images <IoIosArrowDown />
                        </div>
                    </div>
                    <input
                        placeholder="Search"
                        type="text"
                        className="flex-1 !px-7 h-full !outline-0 !border-0"
                    />
                    <div className="flex items-center h-full ">
                        <button className="flex md:gap-4 items-center !px-5 transition duration-150 rounded-[8px] hover:bg-[#7CD497] h-full cursor-pointer hover:text-white">
                            <IoSearchOutline />
                            <span className="hidden md:block">Search</span>
                        </button>
                    </div>
                </div>
            </section>

            <div className="mainContainer">
                {/* Heading Secttion */}
                <section className="!pt-14 !pb-10 !px-2">
                    <div className="flex items-center gap-2">
                        <a href="#" className="text-[#666] text-sm">
                            Pngtree &gt;
                        </a>{" "}
                        <span className="text-[#666] text-sm"> PNG Images</span>
                    </div>
                    <div>
                        <h2 className="text-[20px] sm:text-[26px] lg:text-[32px] font-bold text-[#333] !mb-3">
                            Free Graphic Design PNG, Vectors and PSD Files
                        </h2>

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
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 z-10">
                        <button
                            onClick={prev}
                            disabled={currentPage === 0}
                            className="cursor-pointer disabled:cursor-default"
                        >
                            <ChevronLeft
                                className={`w-6 h-6 !text-[#5ABC84] ${currentPage !== 0 ? "cursor-pointer" : "opacity-20"}`}
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
                                className={`w-6 h-6 text-[#5ABC84] ${currentPage !== totalPages - 1 ? "cursor-pointer" : "opacity-20"}`}
                            />
                        </button>
                    </div>

                    {/* Slider Track */}
                    <div className="w-full overflow-hidden mb-5 md:mb-10">
                        <div
                            className="flex transition-transform gap-1 sm:gap-2 duration-150 ease-in-out"
                            style={{ width: sliderWidth, transform: `translateX(${slideOffset})` }}
                        >
                            {categories.map((cat, index) => (
                                <button key={index} className="flex items-center justify-center w-fit text-center capitalize truncate px-2 py-1 sm:px-4 sm:py-2 bg-[#eeeeeeae] hover:bg-[#71C194] text-[10px] sm:text-sm text-[#666] hover:text-white font-bold rounded-lg transition-all duration-300">
                                    {cat.category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="!my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
                    {images.map(img => (
                        <div
                            key={img.imageID}
                            className="w-full h-[300px] overflow-hidden bg-cover rounded-lg shadow-sm"
                            style={{ backgroundImage: `url(${pngBg})`, backgroundSize: '300%' }}
                        >
                            <img
                                src={`${import.meta.env.VITE_HOST}${img.imageURL}`}
                                alt={img.title}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
