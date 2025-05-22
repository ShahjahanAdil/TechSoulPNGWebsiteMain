import React from "react";
import { useNavigate } from 'react-router-dom'
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

const Dcards = ({ imageDets, similarImages, dimensions, handleDownload }) => {

    const navigate = useNavigate()

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
                            style={{ backgroundImage: `url(${pngImg})`, backgroundSize: '220%' }}
                        >
                            {/* License Tag */}
                            <span className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${imageDets.license === 'free' ? 'bg-[#4EAA76]' : 'bg-transparent'} text-white !text-xs font-semibold !px-2 !py-1 rounded`}>
                                {
                                    imageDets.license === 'free' ?
                                        'FREE'
                                        :
                                        <svg class="_tea4l2" xmlns="http://www.w3.org/2000/svg" width="28" height="23" aria-hidden="true" viewBox="0 0 28 23">
                                            <defs>
                                                <linearGradient id="isc2z30a" x1="50%" x2="50%" y1="11.131%" y2="57.082%">
                                                    <stop offset="0%" stop-color="#FFD700"></stop>
                                                    <stop offset="100%" stop-color="#FFC300"></stop>
                                                </linearGradient>
                                                <linearGradient id="isc2z30c" x1="90.916%" x2="5.301%" y1="61.059%" y2="59.126%">
                                                    <stop offset="0%" stop-color="#FFD700"></stop>
                                                    <stop offset="100%" stop-color="#FFB800"></stop>
                                                </linearGradient>
                                                <linearGradient id="isc2z30e" x1="100%" x2="22.218%" y1="27.905%" y2="95.888%">
                                                    <stop offset="0%" stop-color="#FFD700"></stop>
                                                    <stop offset="100%" stop-color="#FFC300"></stop>
                                                </linearGradient>
                                            </defs>
                                            <path id="isc2z30b" d="M25.455 3.662 22.47 18.458c-.116.35-6.731 1.579-9.755 1.579-2.808 0-9.639-1.23-9.756-1.579L0 3.662l7.948 5.016L12.715 0l4.826 8.678z"></path>
                                            <g fill="none" fill-rule="evenodd">
                                                <path fill="url(#isc2z30a)" fill-rule="nonzero" d="M9.301 3.906 14 15.866H3.733l4.7-11.96a.467.467 0 0 1 .868 0" transform="rotate(-20 8.867 9.333)"></path>
                                                <path fill="url(#isc2z30a)" fill-rule="nonzero" d="m19.568 3.906 4.699 11.96H14l4.699-11.96a.467.467 0 0 1 .869 0" transform="scale(-1 1)rotate(-20 0 117.844)"></path>
                                                <g transform="translate(1.281 1.389)">
                                                    <mask id="isc2z30d" fill="#fff">
                                                        <use href="#isc2z30b"></use>
                                                    </mask>
                                                    <use fill="url(#isc2z30c)" fill-rule="nonzero" href="#isc2z30b"></use>
                                                    <path stroke="#FFF8DC" stroke-linejoin="round" stroke-width=".933" d="m23.712 14.935-.305.084a41.3 41.3 0 0 1-10.29 1.435l-.328.003v-.002q-5.422-.03-10.617-1.438l-.305-.084" mask="url(#isc2z30d)" opacity=".504"></path>
                                                </g>
                                                <ellipse cx="1.909" cy="5.682" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse>
                                                <ellipse cx="14" cy="1.894" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse>
                                                <ellipse cx="26.091" cy="5.682" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse>
                                                <path fill="#FFF8DC" fill-rule="nonzero" d="M14.626 15.48a.7.7 0 0 1-1.224.051l-.028-.051-2.1-4.2a.7.7 0 0 1 1.226-.674l.026.048L14 13.602l1.474-2.948a.7.7 0 0 1 .889-.336l.05.023a.7.7 0 0 1 .336.889l-.023.05z" opacity=".7"></path>
                                            </g>
                                        </svg>
                                }
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
                            <HiOutlineDownload className="!text-[20px] sm:!text-[30px]" /> {
                                imageDets.license === 'free' ?
                                'Free Download' :
                                'Download Image'
                            }
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
                    {
                        similarImages?.map(similarImg => {
                            return (
                                <div className="relative w-full aspect-square cursor-pointer overflow-hidden rounded-lg group"
                                    style={{ backgroundImage: `url(${pngImg})`, backgroundSize: '300%' }}
                                    onClick={() => navigate(`/image/${similarImg.imageID}`)}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_HOST}${similarImg.imageURL}`}
                                        alt={similarImg.title}
                                        className="object-contain w-full h-full"
                                    />

                                    <div className="absolute top-0 left-0 w-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
                                        <div className="flex w-full justify-between">
                                            <span className={`bg-white !text-[10px] font-bold px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}>
                                                {
                                                    similarImg.license === 'free' ?
                                                        'FREE' :
                                                        <svg class="_tea4l2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-hidden="true" viewBox="0 0 28 23">
                                                            <defs>
                                                                <linearGradient id="isc2z30a" x1="50%" x2="50%" y1="11.131%" y2="57.082%">
                                                                    <stop offset="0%" stop-color="#FFD700"></stop>
                                                                    <stop offset="100%" stop-color="#FFC300"></stop>
                                                                </linearGradient>
                                                                <linearGradient id="isc2z30c" x1="90.916%" x2="5.301%" y1="61.059%" y2="59.126%">
                                                                    <stop offset="0%" stop-color="#FFD700"></stop>
                                                                    <stop offset="100%" stop-color="#FFB800"></stop>
                                                                </linearGradient>
                                                                <linearGradient id="isc2z30e" x1="100%" x2="22.218%" y1="27.905%" y2="95.888%">
                                                                    <stop offset="0%" stop-color="#FFD700"></stop>
                                                                    <stop offset="100%" stop-color="#FFC300"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                            <path id="isc2z30b" d="M25.455 3.662 22.47 18.458c-.116.35-6.731 1.579-9.755 1.579-2.808 0-9.639-1.23-9.756-1.579L0 3.662l7.948 5.016L12.715 0l4.826 8.678z"></path>
                                                            <g fill="none" fill-rule="evenodd">
                                                                <path fill="url(#isc2z30a)" fill-rule="nonzero" d="M9.301 3.906 14 15.866H3.733l4.7-11.96a.467.467 0 0 1 .868 0" transform="rotate(-20 8.867 9.333)"></path>
                                                                <path fill="url(#isc2z30a)" fill-rule="nonzero" d="m19.568 3.906 4.699 11.96H14l4.699-11.96a.467.467 0 0 1 .869 0" transform="scale(-1 1)rotate(-20 0 117.844)"></path>
                                                                <g transform="translate(1.281 1.389)">
                                                                    <mask id="isc2z30d" fill="#fff">
                                                                        <use href="#isc2z30b"></use>
                                                                    </mask>
                                                                    <use fill="url(#isc2z30c)" fill-rule="nonzero" href="#isc2z30b"></use>
                                                                    <path stroke="#FFF8DC" stroke-linejoin="round" stroke-width=".933" d="m23.712 14.935-.305.084a41.3 41.3 0 0 1-10.29 1.435l-.328.003v-.002q-5.422-.03-10.617-1.438l-.305-.084" mask="url(#isc2z30d)" opacity=".504"></path>
                                                                </g>
                                                                <ellipse cx="1.909" cy="5.682" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse>
                                                                <ellipse cx="14" cy="1.894" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse>
                                                                <ellipse cx="26.091" cy="5.682" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse>
                                                                <path fill="#FFF8DC" fill-rule="nonzero" d="M14.626 15.48a.7.7 0 0 1-1.224.051l-.028-.051-2.1-4.2a.7.7 0 0 1 1.226-.674l.026.048L14 13.602l1.474-2.948a.7.7 0 0 1 .889-.336l.05.023a.7.7 0 0 1 .336.889l-.023.05z" opacity=".7"></path>
                                                            </g>
                                                        </svg>
                                                }
                                            </span>
                                            <span className="bg-[#05cf5e] text-white !text-[10px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1">
                                                <MdOutlineFileDownload className="text-[14px]" /> {imageDets?.imageURL?.split(".").pop().split(/\#|\?/)[0]}
                                            </span>
                                        </div>

                                        <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                            {similarImg.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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
