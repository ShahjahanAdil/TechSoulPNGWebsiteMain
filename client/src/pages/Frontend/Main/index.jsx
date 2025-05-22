import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import pngBg from "../../../assets/images/bgPNGFinal.jpg";
import axios from "axios";
import Loader from "../../../components/Loader";
import { FiDownload } from "react-icons/fi";
import Search from "../../../components/Search";

export default function Main() {

    const { category } = useParams()

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalImagePages, setTotalImagePages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories()
    }, []);

    useEffect(() => {
        fetchImages()
        window.scrollTo(0, 0)
    }, [page, category])

    useEffect(() => {
        setPage(1)
    }, [category])

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
        // const apiURL = category ?
        //     `${import.meta.env.VITE_HOST}/frontend/main/fetch-images/${category}?page=${page}` :
        //     `${import.meta.env.VITE_HOST}/frontend/main/fetch-images?page=${page}`

        const apiURL = `${import.meta.env.VITE_HOST}/frontend/main/fetch-images?page=${page}` +
            (category ? `&category=${category}` : '');

        setLoading(true);
        axios.get(apiURL)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setImages(data.imgs);
                    setTotalImagePages(Math.ceil(data?.totalImgs / 25));
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

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

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalImagePages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? '!bg-[#5ABC84] !text-white' : '!bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>

            <Search />
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
                                className={`w-6 h-6 !text-[#5ABC84] ${currentPage !== 0 ? "cursor-pointer" : "opacity-20"
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
                                className={`w-6 h-6 text-[#5ABC84] ${currentPage !== totalPages - 1
                                    ? "cursor-pointer"
                                    : "opacity-20"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Slider Track */}
                    <div className="w-full overflow-hidden mb-5 md:mb-10">
                        <div
                            className="flex transition-transform gap-1 sm:gap-2 duration-150 ease-in-out"
                            style={{
                                width: sliderWidth,
                                transform: `translateX(${slideOffset})`,
                            }}
                        >
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    className="flex items-center justify-center w-fit text-center capitalize truncate px-2 py-1 sm:px-4 sm:py-2 bg-[#eeeeeeae] hover:bg-[#71C194] text-[10px] sm:text-sm text-[#666] hover:text-white font-bold rounded-lg transition-all duration-300"
                                    onClick={() => navigate(`/images/${cat.category.toLowerCase()}`)}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="!my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
                    {images.map((img) => (
                        <div
                            key={img.imageID}
                            className="relative w-full sm:h-[250px] h-[150px] cursor-pointer overflow-hidden rounded-lg shadow-sm group"
                            style={{
                                backgroundImage: `url(${pngBg})`,
                                backgroundSize: "300%",
                            }}
                            onClick={() => navigate(`/image/${img.imageID}`)}
                        >
                            <img
                                src={`${import.meta.env.VITE_HOST}${img.imageURL}`}
                                alt={img.title}
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 bg-[#0000004f] bg-opacity-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-between px-4 py-3">
                                <div className="flex items-start justify-between">
                                    <span className="text-white bg-[#5ABC84] rounded-[5px] px-3 py-2 !text-[20px]">
                                        <FiDownload />
                                    </span>
                                    <span className="text-white bg-[#5ABC84] uppercase rounded-[5px] px-3 py-2 !text-[14px]">
                                        {img?.imageURL?.split(".").pop().split(/\#|\?/)[0]}
                                    </span>
                                </div>
                                <p className="!text-white px-1">
                                    {img.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {
                    !loading &&
                    (
                        totalImagePages > 1 &&
                        <div className='flex flex-wrap my-10 items-center justify-center gap-1'>
                            {renderPageNumbers()}
                        </div>
                    )
                }
            </div >
        </>
    );
}
