import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import pngImg from "../../assets/images/png bg.jpeg";
import testImg from "../../assets/images/sports.png";
import iconImg from "../../assets/images/icons-img.png";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Loader from "../Loader";

const Dcards = () => {
  const { imageID } = useParams();

  const [imageDets, setImageDets] = useState({});
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    if (!imageDets?.imageURL) return;

    const img = new Image();
    img.src = `${import.meta.env.VITE_HOST}${imageDets.imageURL}`;

    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [imageDets]);

  const fetchImage = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_HOST}/frontend/images?imageID=${imageID}`)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setImageDets(data.img);
        }
      })
      .catch((err) => {
        console.error("Frontend POST error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}${imageDets.imageURL}`,
        {
          mode: "cors",
        }
      );

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = imageDets.title || "download.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
              style={{ backgroundImage: `url(${pngImg})` }}
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
                    className="!text-[13px] bg-gray-200 lowercase text-[#666]  !px-3 !py-1 rounded-[8px]"
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
              <h3 className="flex gap-2 items-center font-bold !mb-2">
                <BsInfoCircleFill /> Image Details
              </h3>
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
              className="flex items-center gap-3 justify-center text-[16px] sm:text-[20px] font-bold bg-[#4EAA76] text-white !px-1 !py-3 sm:!py-5 rounded-lg w-full hover:bg-[#4eaa76ba] cursor-pointer transition !mb-5"
              onClick={handleDownload}
            >
              <HiOutlineDownload className="text-[20px] sm:text-[30px]" /> Free
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
              <h3 className="text-[14px] font-bold">Free License</h3>
              <p className="text-[#666] text-[14px]">
                Crediting the author and the source is required
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Similar PNG Images</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:px-15 lg:px:15 px-1">
          {/* Individual Card */}
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag1}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag2}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag3}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag4}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag5}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag6}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag7}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag8}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag9}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag10}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag11}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white group">
            <img
              src={flag12}
              alt="Flag 1"
              className="object-contain w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-between p-2">
              {/* Top Icons (unchanged) */}
              <div className="flex absolute justify-between">
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex">
                  <FaCrown className="text-black" />
                </span>
                <span className="bg-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-23">
                  <FaHeart />
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex ms-1">
                  <MdOutlineFileDownload /> PNG
                </span>
              </div>

              {/* Bottom Text on Hover */}
              <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                Some bottom text here
              </div>
            </div>
          </div>

          {/* Repeat cards as needed... */}
        </div>

        <div className="p-4 space-y-6 max-w-7xl mx-auto">
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
                <span className="bg-white text-xs px-2 py-1 rounded shadow">
                  <FaHeart className="text-gray-500" />
                </span>
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
      <section
        className="overflow-hidden w-full rounded-[35px] px-[20px] hidden lg:flex h-18 bg-gradient-to-r from-[#FF0C53] to-[#FF013F]  justify-center items-center"
        style={{
          background:
            "  center center/cover, linear-gradient(to right, #FF0C53, #FF013F)",
          backgroundSize: "500px",
        }}
      >
        <div className="relative flex flex-1  justify-center items-center gap-7 w-full px-5">
          <div className="absolute h-[100%] z-20 icon-img hidden lg:block">
            <img src={iconImg} alt="" className="object-cover" />
          </div>
          <div className="left flex ps-[40px] justify-center items-center gap-3">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="25"
                fill="#ffffff"
                viewBox="0 0 20 25"
              >
                <path d="m10.994 23.369.033.145a1.44 1.44 0 0 0 1.35 1.047h5.057c.9 0 1.632-.732 1.632-1.632V2.212c0-.9-.732-1.63-1.632-1.63h-5.035a1.42 1.42 0 0 0-1.4 1.17l-.01.05a1.13 1.13 0 0 1-1.115.932c-.542 0-1.013-.39-1.127-.983a1.43 1.43 0 0 0-1.38-1.17H2.313c-.9 0-1.632.732-1.632 1.631v20.719c0 .9.732 1.632 1.632 1.632H7.35c.69 0 1.278-.494 1.408-1.223a1.131 1.131 0 0 1 1.853-.657c.206.176.342.419.384.686m-3.698-.293H2.313a.15.15 0 0 1-.147-.147V9.78c.04.005.074.023.114.023H5.5a.86.86 0 0 0 .858-.858.86.86 0 0 0-.858-.856H2.28c-.04 0-.075.018-.114.022V2.214a.15.15 0 0 1 .147-.149h4.982l.01.056a2.636 2.636 0 0 0 2.57 2.099c1.262 0 2.34-.896 2.578-2.155h4.981a.15.15 0 0 1 .147.147V8.11c-.039-.004-.073-.022-.114-.022h-3.22a.86.86 0 0 0-.857.856.86.86 0 0 0 .857.858h3.22c.04 0 .075-.018.114-.022v13.15a.15.15 0 0 1-.147.148h-4.966l-.029-.059a2.636 2.636 0 0 0-2.565-2.096c-1.253 0-2.326.88-2.578 2.155z" />
              </svg>
            </div>
            <div className="inner-txt">
              <h1 className="text-white font-bold lg:text-xl leading-7 text-[16px]">
                Best Deals
              </h1>
              <p className="text-white font-normal leading-5 text-sm">
                On all plans
              </p>
            </div>
          </div>
          <div className="middle flex justify-center items-center gap-5 pl-6 ">
            <div className="border-l-2 border-[#FF6B95] h-6"></div>

            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="none"
                viewBox="0 0 25 25"
              >
                <path
                  fill="#ffffff"
                  d="M6.42.578c1.172 0 2.343.004 3.515-.002.66-.003 1.217.222 1.754.61.516.371.945.823 1.387 1.265q5.236 5.227 10.465 10.461c.808.808 1.02 2.011.51 3.018a2.6 2.6 0 0 1-.477.664 2916 2916 0 0 1-7.226 7.232c-.996.994-2.642 1-3.637.008-3.772-3.766-7.544-7.531-11.3-11.312-.458-.46-.866-.99-1.01-1.657a2.7 2.7 0 0 1-.062-.566Q.333 6.667.338 3.035C.339 1.667 1.386.597 2.755.582 3.976.568 5.198.58 6.42.58zm-.004 1.625H5.91c-1.03 0-2.062-.003-3.093 0-.513.003-.86.337-.861.832q-.005 3.63.003 7.263c0 .134.03.288.101.399.168.262.342.53.56.748 3.72 3.73 7.446 7.453 11.17 11.178.442.442 1.028.44 1.472-.004 2.366-2.366 4.725-4.738 7.104-7.091a1.083 1.083 0 0 0 .001-1.507c-3.102-3.08-6.181-6.183-9.283-9.262-.781-.775-1.488-1.627-2.392-2.278-.241-.173-.469-.282-.764-.28-1.17.005-2.342.002-3.513.002"
                />
                <path
                  fill="#ffffff"
                  d="M6.82 10.315a3.255 3.255 0 0 1-3.242-3.259 3.246 3.246 0 0 1 3.25-3.228 3.236 3.236 0 0 1 3.238 3.27 3.25 3.25 0 0 1-3.246 3.217m0-1.628A1.624 1.624 0 0 0 8.447 7.07c0-.885-.726-1.616-1.61-1.62A1.625 1.625 0 0 0 5.2 7.06a1.624 1.624 0 0 0 1.62 1.627"
                />
              </svg>
            </div>
            <div className="inner-txt">
              <h1 className="text-white font-bold lg:text-xl leading-7 text-[16px] ">
                90% OFF coupons
              </h1>
              <p className="text-white font-normal leading-5 text-sm">
                Specials for lifetime plans
              </p>
            </div>
          </div>

          <div className="right flex justify-center items-center gap-5">
            <div className="border-l-2 border-[#FF6B95] h-6"></div>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="25"
                fill="none"
                viewBox="0 0 21 25"
              >
                <path
                  fill="#ffffff"
                  d="M10.032.67a1.7 1.7 0 0 1 1.12 0l8.552 2.959a1.71 1.71 0 0 1 1.151 1.616v8.598q0 5.539-9.478 10.535a1.71 1.71 0 0 1-1.576.01Q.328 19.546.328 13.842V5.245A1.71 1.71 0 0 1 1.48 3.63zm.56 1.617L2.039 5.244v8.599c0 3.01 2.736 6.055 8.54 9.021 5.817-3.065 8.566-6.12 8.566-9.022V5.244zm5.018 6.33.055.055a.817.817 0 0 1 0 1.155l-4.894 4.893a.817.817 0 0 1-1.154 0l-3.08-3.079a.817.817 0 0 1 0-1.155l.056-.054a.817.817 0 0 1 1.155 0l2.446 2.448 4.261-4.262a.817.817 0 0 1 1.155 0"
                />
              </svg>
            </div>
            <div className="inner-txt">
              <h1 className="text-white font-bold lg:text-xl leading-7 text-[16px]">
                Anniversary Specials
              </h1>
              <p className="text-white font-normal leading-5 text-[12px] sm:text-[14px]">
                Limited time discount
              </p>
            </div>
          </div>
          <div className="top-btn ">
            <button className="zoom-animation gradient-btn  bg-gradient-to-r from-[#faff00] to-[#ffc700] text-[#333] font-bold lg:text-base text-[14px] rounded-full">
              GRAB NOW
            </button>
          </div>
        </div>
      </section>

      <div className="p-4">
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
      </div>
    </>
  );
};

export default Dcards;
