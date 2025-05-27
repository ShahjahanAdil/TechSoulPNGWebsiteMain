import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAuthContext } from "../../contexts/AuthContext";
import { FaHeart } from "react-icons/fa";

const tabs = ["nature", "technology", "clothing", "food"];

export default function Cards() {

    const { userData } = useAuthContext()
    const [images, setImages] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [activeTab, setActiveTab] = useState("nature");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchImages();
    }, [activeTab]);

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchImages = () => {
        setLoading(true);
        axios.get(
            `${import.meta.env.VITE_HOST
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

    const fetchFavourites = () => {
        axios.get(`${import.meta.env.VITE_HOST}/frontend/favourites/get?userID=${userData.userID}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setFavourites(data.userFavourites);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    };

    const handleAddToFavourites = ({ imageID, imageURL, favourite, license }) => {
        const newFav = {
            userID: userData.userID,
            imageID,
            imageURL,
            favourite,
            license
        }

        axios.post(`${import.meta.env.VITE_HOST}/frontend/favourites/add`, newFav)
            .then((res) => {
                const { data } = res
                // const updatedImages = images.map(img => img.imageID === imageID ? { ...img, favourite: !img.favourite } : img)
                // setImages(updatedImages)
                const wasFav = favourites.some(fav => fav.imageID === imageID);
                if (wasFav) {
                    setFavourites(prev => prev.filter(fav => fav.imageID !== imageID));
                } else {
                    setFavourites(prev => [...prev, { imageID }]);
                }
                window.toastify(data.message, "success")
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    }

    return (
        <div className="mainContainer ps-2 md:ps-5 py-2 md:py-5">
            <h2 className="!text-[24px] sm:!text-[30px] font-bold md:mb-6">
                Explore popular creative Assets
            </h2>

            <div className="flex gap-3">
                {tabs?.map((cat, i) => {
                    return (
                        <button
                            key={i}
                            className={`capitalize text-[14px] sm:text-[18px] pb-1 rounded-sm transition-all duration-150 ease-in-out cursor-pointer font-bold text-[#333] border-b-[#5ABC84] ${cat === activeTab ? "border-b-4" : "border-none"}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            <section className="md:py-8 py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                    {images?.map((img, index) => (
                        <div
                            key={img.imageID}
                            className={`relative group cursor-pointer rounded-lg shadow-sm overflow-hidden ${index % 3 !== 0 ? "bg-[#F5E9D7]" : "bg-[#F5F6F5]"
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

                            <span className={`absolute top-2.5 right-2.5 bg-white ${favourites.some((fav) => fav.imageID === img.imageID) ? "text-red-500" : "text-gray-500"} !text-[12px] uppercase p-2 rounded shadow transform scale-0 opacity-0 transition-all duration-500 !flex items-center ease-out group-hover:scale-100 group-hover:opacity-100`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToFavourites({
                                        imageID: img.imageID,
                                        imageURL: img.imageURL,
                                        favourite: img.favourite,
                                        license: img.license
                                    })
                                }}
                            >
                                <FaHeart />
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex justify-center my-3 md:my-5">
                <button className="flex gap-2 items-center p-2 rounded-[25px] px-[25px] bg-[#5ABC84] hover:gap-4 transition-all duration-300 text-white font-semibold hover:bg-[#5abc84c9]" onClick={() => navigate("/images")}>Explore more <AiOutlineArrowRight /></button>
            </div>
        </div>
    );
}
