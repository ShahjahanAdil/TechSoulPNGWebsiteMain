import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flag13 from "../../assets/images/fbg1.jpg";
import flag14 from "../../assets/images/fbg2.jpg";
import flag15 from "../../assets/images/fbg3.jpg";
import flag16 from "../../assets/images/fbg4.jpg";
import flag17 from "../../assets/images/fbg5.jpg";
import flag18 from "../../assets/images/fbg6.jpg";
import crownIcon from "../../assets/images/crown.png";
import { FaCrown, FaHeart } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import pngImg from "../../assets/images/bgPNGFinal.jpg";
import ButtonLoader from "../ButtonLoader";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";

const Dcards = ({ imageDets, setImageDets, similarImages, setSimilarImages, dimensions, handleDownload, downloadLoading, }) => {

    const { userData, dispatch } = useAuthContext()
    const [shortDownloadLoading, setShortDownloadLoading] = useState(false)
    const [downloadingImageID, setDownloadingImageID] = useState("")
    const navigate = useNavigate();

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
                if (imageID === imageDets.imageID) {
                    setImageDets(prev => ({ ...prev, favourite: !imageDets.favourite }))
                } else {
                    const updatedSimilarImages = similarImages.map(img => img.imageID === imageID ? { ...img, favourite: !img.favourite } : img)
                    setSimilarImages(updatedSimilarImages)
                }
                window.toastify(data.message, "success")
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    }

    const handleShortDownload = async (img) => {
        try {
            if (!userData.userID) {
                return window.toastify("Please login to continue downloading!", "info")
            }

            const isFreeUser = userData.plan === "free";
            const isFreeImage = img.license === "free";

            if (isFreeUser && !isFreeImage) {
                return window.toastify("Upgrade to premium to download this image!", "error");
            }

            setShortDownloadLoading(true)
            setDownloadingImageID(img.imageID)

            const res = await axios.post(`${import.meta.env.VITE_HOST}/frontend/image/download/${img.imageID}?imageURL=${img.imageURL}`, {
                userID: userData.userID,
            });

            const { status, data } = res;

            if (status === 200) {
                window.toastify(data.message, "success");

                dispatch({
                    type: "SET_PROFILE",
                    payload: { user: { ...userData, dailyDownloadCount: data.dailyDownloadCount, } },
                });

                const response = await fetch(
                    `${import.meta.env.VITE_HOST}${img.imageURL}`,
                    { mode: "cors" }
                );

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = img.title || "download.png";
                document.body.appendChild(link);
                link.click();
                link.remove();

                URL.revokeObjectURL(blobUrl);
            }
        } catch (err) {
            window.toastify(err.response?.data?.message || "Download failed", "error");
            console.error("Download failed:", err);
        } finally {
            setShortDownloadLoading(false)
            setDownloadingImageID("")
        }
    };

    return (
        <>
            <div className="flex items-center justify-center !px-4 !py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1280px] w-full">
                    {/* Left Column */}
                    <div>
                        <p className="font-bold text-[24px] text-[#333] !mb-4">
                            {imageDets.title} <span className="text-[#666]">Free PNG</span>
                        </p>
                        <div
                            className="relative bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] rounded-xl !p-5 flex flex-col justify-end"
                            style={{
                                backgroundImage: `url(${pngImg})`,
                                backgroundSize: "220%",
                            }}
                        >
                            {/* License Tag */}
                            <span
                                className={`absolute top-1 left-1 sm:top-2 sm:left-2 ${imageDets.license === "free"
                                    ? "bg-[#4EAA76]"
                                    : "bg-transparent"
                                    } !text-white !text-xs font-semibold !px-2 !py-1 rounded`}
                            >
                                {imageDets.license === "free" ? (
                                    "FREE"
                                ) : (
                                    <img
                                        src={crownIcon}
                                        alt="crown"
                                        className="w-[20px] md:w-[30px]"
                                    />
                                )}
                            </span>
                            <span className={`absolute top-1 right-1 sm:top-2 sm:right-3 ${imageDets.favourite ? 'text-red-500' : 'text-gray-500'} !text-[16px] sm:!text-[20px] cursor-pointer transition-all duration-150 ${imageDets.favourite ? 'hover:text-red-400' : 'hover:text-gray-400'}`}
                                onClick={() => handleAddToFavourites({
                                    imageID: imageDets.imageID,
                                    imageURL: imageDets.imageURL,
                                    favourite: imageDets.favourite,
                                    license: imageDets.license
                                })}
                            >
                                <FaHeart />
                            </span>

                            {/* Image */}
                            <div className="w-full h-full flex justify-center">
                                <img
                                    src={`${import.meta.env.VITE_HOST}${imageDets.imageURL}`}
                                    alt="PNG"
                                    className="object-contain w-full h-full"
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            </div>
                        </div>
                        <figcaption className="text-[14px] !mt-4 text-[#666]">
                            Download {imageDets.description}
                        </figcaption>

                        <div className="flex flex-wrap gap-2 !mt-5">
                            {imageDets?.tags?.map((tag, i) => {
                                return (
                                    <p
                                        key={i}
                                        className="!text-[13px] cursor-default bg-gray-200 lowercase text-[#666]  !px-3 !py-1 rounded-[8px]"
                                    >
                                        {tag}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-white !p-1 sm:!p-6 flex flex-col gap-4 h-full">
                        <p className="text-[#666] !mb-3">
                            This image has copyright license and available for commercial use.{" "}
                            <span className="text-[#4e76aa]">
                                Upgrade to Individual Premium
                            </span>{" "}
                            to get license authorization.
                        </p>

                        <div className="!mb-4">
                            <h6 className="flex gap-2 items-center font-bold !mb-2">
                                <BsInfoCircleFill /> Image Details
                            </h6>
                            <p>
                                <span className="text-[#666] text-[14px]">Dimensions:</span>
                                <span className="font-bold indent-1 inline-block text-[#333]">
                                    {dimensions.width} x {dimensions.height}
                                </span>
                            </p>
                            <p>
                                <span className="text-[#666] text-[14px]">MIME Type:</span>
                                <span className="uppercase font-bold indent-1 inline-block text-[#333]">
                                    {imageDets.type}
                                </span>
                            </p>
                            <p>
                                <span className="text-[#666] text-[14px]">Category :</span>
                                <span className="capitalize font-bold indent-1 inline-block text-[#333]">
                                    {imageDets.category}
                                </span>
                            </p>
                        </div>

                        <button
                            className="flex items-center gap-3 justify-center !text-[16px] sm:!text-[20px] font-bold bg-[#4EAA76] text-white !px-1 !py-3 sm:!py-5 rounded-lg w-full hover:bg-[#4eaa76ba] cursor-pointer transition !mb-5"
                            disabled={downloadLoading}
                            onClick={handleDownload}
                        >
                            <HiOutlineDownload className="!text-[20px] sm:!text-[30px]" />
                            {!downloadLoading ? (
                                imageDets.license === "free" ? (
                                    "Free Download"
                                ) : (
                                    "Download Image"
                                )
                            ) : (
                                <>
                                    Downloading <ButtonLoader />
                                </>
                            )}
                        </button>

                        <p className="leading-0 text-[14px]">
                            <span className="text-[#666]">Authorization scope</span>{" "}
                            <span className="font-bold inline-block indent-2">
                                Commercial license
                            </span>
                        </p>
                        <p className=" text-[14px]">
                            <span className="text-[#666]">Authorized object</span>{" "}
                            <span className="font-bold inline-block indent-2">
                                <span className="text-[#4EAA76]">Individual</span>{" "}
                                <span className="indent-1 inline-block text-[#4e76aa]">
                                    Enterprise
                                </span>
                            </span>
                        </p>

                        <div>
                            <h6 className="text-[14px] font-bold">Free License</h6>
                            <p className="text-[#666] text-[14px]">
                                Crediting the author and the source is required
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-2 py-4 md:px-6 md:py-6 mainContainer">
                <h2 className="text-lg font-semibold mb-4">Similar PNG Images</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* Individual Card */}
                    {similarImages?.map((similarImg) => {
                        return (
                            <div
                                key={similarImg.imageID}
                                className="relative w-full aspect-square cursor-pointer overflow-hidden rounded-lg group"
                                style={{
                                    backgroundImage: `url(${pngImg})`,
                                    backgroundSize: "300%",
                                }}

                            >
                                <img
                                    src={`${import.meta.env.VITE_HOST}${similarImg.imageURL}`}
                                    alt={similarImg.title}
                                    className="object-contain w-full h-full"
                                />

                                <div className="absolute top-0 left-0 w-full inset-0 bg-[#00000085]  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2"
                                    onClick={() => navigate(`/image/${similarImg.imageID}`)}
                                >
                                    <div className="flex w-full justify-between z-10">
                                        <span
                                            className={`bg-white !text-[10px] font-bold px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                        >
                                            {similarImg.license === "free" ? (
                                                "FREE"
                                            ) : (
                                                <img
                                                    src={crownIcon}
                                                    alt="crown"
                                                    className="w-[12px] md:w-[20px]"
                                                />
                                            )}
                                        </span>
                                        <div className="!flex justify-center items-center gap-2">
                                            <span className={`bg-white ${similarImg.favourite ? 'text-red-500' : 'text-gray-500'} !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToFavourites({
                                                        imageID: similarImg.imageID,
                                                        imageURL: similarImg.imageURL,
                                                        favourite: similarImg.favourite,
                                                        license: similarImg.license
                                                    })
                                                }}
                                            >
                                                <FaHeart className="text-[12px]" />
                                            </span>
                                            <span
                                                className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1"
                                                disabled={shortDownloadLoading}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShortDownload(similarImg);
                                                }}
                                            >
                                                {
                                                    downloadingImageID === similarImg.imageID ?
                                                        <span className="w-5 h-5 border-t-2 rounded-full border-gray-100 animate-spin"></span>
                                                        :
                                                        <>
                                                            <MdOutlineFileDownload className="text-[14px]" /> {similarImg.type}
                                                        </>
                                                }
                                            </span>
                                        </div>

                                    </div>

                                    <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                        {similarImg.title}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="px-2 py-6 space-y-6 mainContainer">
                    <h2 className="text-xl font-semibold">Similar Background</h2>

                    {/* Images Grid with Hover Overlay */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="relative group overflow-hidden rounded">
                            <img
                                src={flag13}
                                alt="Background 1"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <div className="!flex justify-center items-center gap-2">
                                    <span className="bg-white text-gray-500 !text-[10px] uppercase px-2 py-1.5 r rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                        <FaHeart className="text-[12px]" />
                                    </span>
                                    <span className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1">
                                        <MdOutlineFileDownload className="text-[14px]" />{" "}
                                        {imageDets.type}
                                    </span>
                                </div>

                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 1
                            </span>
                        </div>

                        {/* Card 2 */}
                        <div className="relative group overflow-hidden rounded">
                            <img
                                src={flag14}
                                alt="Background 2"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <div className="!flex justify-center items-center gap-2">
                                    <span className="bg-white text-gray-500 !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                        <FaHeart className="text-[12px]" />
                                    </span>
                                    <span className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1">
                                        <MdOutlineFileDownload className="text-[14px]" />{" "}
                                        {imageDets.type}
                                    </span>
                                </div>
                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 2
                            </span>
                        </div>

                        {/* Repeat the pattern for remaining cards */}

                        <div className="relative group overflow-hidden rounded">
                            <img
                                src={flag15}
                                alt="Background 3"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <div className="!flex justify-center items-center gap-2">
                                    <span className="bg-white text-gray-500 !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                        <FaHeart className="text-[12px]" />
                                    </span>
                                    <span className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1">
                                        <MdOutlineFileDownload className="text-[14px]" />{" "}
                                        {imageDets.type}
                                    </span>
                                </div>
                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 3
                            </span>
                        </div>

                        {/* Card 4 */}
                        <div className="relative group overflow-hidden rounded">
                            <img
                                src={flag16}
                                alt="Background 4"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    <FaCrown className="text-black" />
                                </span>
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    <FaHeart className="text-red-500" />
                                </span>
                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 4
                            </span>
                        </div>

                        {/* Card 5 */}
                        <div className="relative group overflow-hidden rounded">
                            <img
                                src={flag17}
                                alt="Background 5"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <span className="bg-white !text-[12px] px-2 py-1.5 rounded shadow">
                                    <FaHeart className="text-red-500" />
                                </span>
                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 5
                            </span>
                        </div>

                        {/* Card 6 */}
                        <div className="relative group overflow-hidden rounded">
                            <img
                                src={flag18}
                                alt="Background 6"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <span className="bg-white !text-[12px] px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <div className="!flex justify-center items-center gap-2">
                                    <span className="bg-white text-gray-500 !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                        <FaHeart className="text-[12px]" />
                                    </span>
                                    <span className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1">
                                        <MdOutlineFileDownload className="text-[14px]" />{" "}
                                        {imageDets.type}
                                    </span>
                                </div>
                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 6
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dcards;
