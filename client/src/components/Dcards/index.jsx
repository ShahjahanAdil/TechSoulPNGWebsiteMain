import React from "react";
import flag1 from "../../assets/images/f1.png";
import flag2 from "../../assets/images/f2.png";
import flag3 from "../../assets/images/f3.png";
import flag4 from "../../assets/images/f4.png";
import flag5 from "../../assets/images/f5.png";
import flag6 from "../../assets/images/f6.png";
import flag7 from "../../assets/images/f7.png";
import flag8 from "../../assets/images/f8.png";
import flag9 from "../../assets/images/f9.png";
import flag10 from "../../assets/images/f10.png";
import flag11 from "../../assets/images/f11.png";
import flag12 from "../../assets/images/cartoonNetwork.png";
import flag13 from "../../assets/images/fbg1.jpg";
import flag14 from "../../assets/images/fbg2.jpg";
import flag15 from "../../assets/images/fbg3.jpg";
import flag16 from "../../assets/images/fbg4.jpg";
import flag17 from "../../assets/images/fbg5.jpg";
import flag18 from "../../assets/images/fbg6.jpg";
import { FaCrown, FaHeart } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import pngImg from "../../assets/images/bgPNGFinal.jpg";
import iconImg from "../../assets/images/icons-img.png";
import { CiSearch } from "react-icons/ci";

const Dcards = ({ imageDets, dimensions, handleDownload }) => {
    return (
        <>
            <div className="flex items-center justify-center !px-4 !py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-[1280px] w-full">
                    {/* Left Column */}
                    <div>
                        <p className="font-bold text-[24px] text-[#333] !mb-4">
                            {imageDets.title} <span className="text-[#666]">Free PNG</span>
                        </p>
                        <div
                            className="relative bg-cover bg-center h-[500px] rounded-xl !p-5 flex flex-col justify-end"
                            style={{ backgroundImage: `url(${pngImg})`, backgroundSize: '220%' }}
                        >
                            {/* Free Tag */}
                            <span className="absolute top-4 left-4 bg-[#4EAA76] text-white !text-xs font-semibold !px-2 !py-1 rounded">
                                FREE
                            </span>

                            {/* Image */}
                            <div className="w-full h-full flex justify-center">
                                <img
                                    src={`${import.meta.env.VITE_HOST}${imageDets.imageURL}`}
                                    alt="PNG"
                                    className="object-contain w-full h-full"
                                    onContextMenu={e => e.preventDefault()}
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
                                    {imageDets?.imageURL?.split(".").pop().split(/\#|\?/)[0]}
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
                            onClick={handleDownload}
                        >
                            <HiOutlineDownload className="!text-[20px] sm:!text-[30px]" /> Free
                            Download
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

            <div className="px-2 py-6 mainContainer">
                <h2 className="text-lg font-semibold mb-4">Similar PNG Images</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* Individual Card */}
                    <div className="relative w-full  aspect-square overflow-hidden rounded-lg group"  style={{ backgroundImage: `url(${pngImg})`, backgroundSize: '300%' }}>
                        <img
                            src={flag1}
                            alt="Flag 1"
                            className="object-contain w-full h-full"
                        />

                        <div className="absolute top-0 left-0 w-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
                            {/* Top Icons (unchanged) */}
                            <div className="flex w-full justify-between">
                                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                                    <FaCrown className="text-black" />
                                </span>
                                <span className="bg-green-500 text-white !text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex gap-1">
                                    <MdOutlineFileDownload className="text-[16px]" /> PNG
                                </span>
                            </div>

                            {/* Bottom Text on Hover */}
                            <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                Some bottom text here
                            </div>
                        </div>
                    </div>
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
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                {/* <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    <FaHeart className="text-gray-500" />
                                </span> */}
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
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    <FaHeart className="text-gray-500" />
                                </span>
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
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    <FaHeart className="text-gray-500" />
                                </span>
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
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    <FaCrown className="text-black" />
                                </span>
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
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
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
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
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    Free
                                </span>
                                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                                    <FaHeart className="text-gray-500" />
                                </span>
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow flex items-center">
                                    <MdOutlineFileDownload className="mr-1" /> PNG
                                </span>
                            </div>
                            <span className="absolute bottom-2 left-2 text-white text-sm px-2 py-1 rounded shadow transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                Background 6
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="mainContainer px-2 py-6">
                <h2 className="text-md font-semibold mb-2">Similar Images</h2>
                <div className="flex flex-wrap gap-2">
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex ">
                        <CiSearch /> tehreek labbaik pakistan flag image
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> pakistan national flag waving in beautiful s...
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> realistic 3d waving pakistan flag clipart illu...
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> flag of pakistan
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> pakistan flag waving in the wind clipart ill...
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> beautiful 3d pakistan flag waving clipart ill...
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> 3d waving flag of pakistan clipart illustration
                    </button>
                    <button className="text-sm bg-gray-100 px-3 py-3 rounded-full hover:bg-gray-200 transition items-center gap-2 flex">
                        <CiSearch /> flag of pakistan
                    </button>
                </div>
            </div> */}
        </>
    );
};

export default Dcards;
