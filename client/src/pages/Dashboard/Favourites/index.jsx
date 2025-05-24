import React, { useEffect, useState } from "react";
import pngImg from "../../../assets/images/bgPNGFinal.jpg";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import axios from "axios";

export default function Favourites() {

    const { userData } = useAuthContext()
    const [favourites, setFavourites] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData.userID) {
            fetchFavourites()
        }
    }, [userData, page])

    const fetchFavourites = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/frontend/favourites/get-dashboard?userID=${userData.userID}&&?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setFavourites(data.userFavourites)
                    setTotalPages(data.totalFavourites / 20)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

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
                const updateFavourites = favourites.filter(fav => fav.imageID !== imageID)
                setFavourites(updateFavourites)
                window.toastify(data.message, "success")
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
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
        return <Loader />
    }

    return (
        <div className="p-4 md:p-8 bg-white rounded-[20px] h-full shadow">
            {/* <h5 className="my-4 p-[20px] md:text-center ">My Favourites</h5> */}
            <h5 className="flex items-center gap-2 !text-[#55AF7C] font-semibold mb-8"><FaHeart /> My Favourites</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {
                    favourites.map(fav => {
                        return (
                            <div
                                style={{ backgroundImage: `url(${pngImg})` }}
                                className="relative group cursor-pointer flex items-center justify-center p-1 h-[120px] sm:h-[140px] md:h-[170px]  rounded-[12px]"
                                onClick={() => navigate(`/image/${fav.imageID}`)}
                            >
                                <img src={`${import.meta.env.VITE_HOST}${fav.imageURL}`} alt="image" className="w-full h-full object-contain" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-[12px]"></div>

                                <div className="absolute hidden group-hover:flex justify-between top-2 left-0 px-3 w-full transition-all opacity-0 group-hover:opacity-100 duration-300">
                                    <span className={`bg-white ${fav.favourite ? 'text-red-500' : 'text-gray-500'} !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 !flex items-center ease-out group-hover:scale-100 group-hover:opacity-100`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleAddToFavourites({
                                                imageID: fav.imageID,
                                                imageURL: fav.imageURL,
                                                favourite: fav.favourite,
                                                license: fav.license
                                            })
                                        }}
                                    >
                                        <FaHeart />
                                    </span>
                                    <span className="text-white !text-[12px] bg-[#4eaa76] uppercase rounded-[5px] px-1 py-[2px]">
                                        {fav?.imageURL?.split(".").pop().split(/\#|\?/)[0]}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Pagination */}
            {
                !loading &&
                (
                    totalPages > 1 &&
                    <div className='flex flex-wrap my-10 items-center justify-center gap-1'>
                        {renderPageNumbers()}
                    </div>
                )
            }
        </div>
    );
}
