import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import logooo from "../../assets/images/logo.png";
import { CgMenu } from "react-icons/cg";
import { BiX } from "react-icons/bi";
import iconImg from "../../assets/images/icons-img.png";
import pngDrop from "../../assets/images/pngdropdown.jpeg";
import vector from "../../assets/images/vector.jpeg";
import clipArt from "../../assets/images/clipart.jpeg";
import iconDrop from "../../assets/images/icon-drop.jpeg";
import threeD from "../../assets/images/3d.jpeg";
import backGround from "../../assets/images/background.jpeg";
import wallPaper from "../../assets/images/wallpaper.jpeg";
import banner from "../../assets/images/banner.jpeg";
import picture from "../../assets/images/picture.jpeg";
import socialMedia from "../../assets/images/socialmedia.jpeg";
import marketing from "../../assets/images/marketing.jpeg";
import individual from "../../assets/images/individual.jpeg";
import branding from "../../assets/images/branding.jpeg";
import office from "../../assets/images/office.jpeg";
import bgImg from "../../assets/images/enterpricebg.jpeg";
import priceImg from "../../assets/images/pricingbg.jpeg";
import lovePik from "../../assets/images/lovepik.jpeg";
import pikBest from "../../assets/images/pikbest.jpeg";
import seaPik from "../../assets/images/seapik.jpeg";
import slideDoc from "../../assets/images/slidedoc.jpeg";
import userIcon from "../../assets/images/user.png";
import nameIcon from "../../assets/images/name-icon.png";
import saleCrown from "../../assets/images/sale-crown.png";
import "./navbar.css";
import {
    IoIosArrowDown,
    IoIosArrowForward,
    IoMdArrowDropdown,
} from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import dayjs from 'dayjs'

const Navbar = () => {

    const { userData, handleLogout } = useAuthContext()
    const { logout } = useAuth0()
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoverShow, setHoverShow] = useState(false);
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const isToday = dayjs(userData.lastDownloadDate).isSame(dayjs(), "day")
    const isPremium = userData?.plan === "premium"
    const dailyDownloadLimit = isPremium ? 50 : 10
    const usedDownloads = isToday ? userData.dailyDownloadCount : 0
    const remainingDownloads = dailyDownloadLimit - usedDownloads

    const logoutFunction = () => {
        logout()
        handleLogout()
    }

    return (
        <>
            {/* Top Navbar */}
            {pathname == "/about" ? (
                ""
            ) : pathname == "/contact" ? (
                ""
            ) : (
                <section
                    className="overflow-hidden w-full hidden lg:flex h-18 bg-gradient-to-r from-[#FF0C53] to-[#FF013F]  justify-center items-center"
                    style={{
                        background:
                            'url("https://js.pngtree.com/a5/static/5kaywn.BE_RcDw8.gif")  center center/cover, linear-gradient(to right, #FF0C53, #FF013F)',
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
                                <h6 className="!text-white font-bold lg:text-xl leading-7 text-[16px]">
                                    Best Deals
                                </h6>
                                <p className="!text-white font-normal leading-5 !text-[10px] sm:!text-[12px]">
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
                                <h6 className="!text-white font-bold lg:text-xl leading-7 text-[16px] ">
                                    90% OFF coupons
                                </h6>
                                <p className="!text-white font-normal leading-5 !text-[10px] sm:!text-[12px]">
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
                                <h6 className="!text-white font-bold lg:text-xl leading-7 text-[16px]">
                                    Anniversary Specials
                                </h6>
                                <p className="!text-white font-normal leading-5 !text-[10px] sm:!text-[12px]">
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
            )}

            {/* Below navabar */}
            <section className={`navbar relative w-full h-14 ${pathname === '/home' ? 'bg-[#f1fcec86]' : pathname === '/' ? 'bg-[#f1fcec86]' : 'bg-[#FFFFFF]'} flex justify-between items-center !gap-5 px-5 shadow-sm`}>
                <div className="flex  flex-1 items-center gap-[30px] w-full lg:w-fit">
                    <div className="logo">
                        <img src={logooo} alt="logo" className="sm:w-[150px] w-[150px] cursor-pointer" onClick={() => navigate('/')} />
                    </div>
                    <div className="nav-items hidden xl:block">
                        <ul className="flex justify-between items-center gap-[15px]">
                            {/* Browse */}
                            <li className="relative group font-bold flex items-center gap-0.5 text-[16px] cursor-pointer">
                                Browse{" "}
                                <IoMdArrowDropdown className="transition-transform duration-300 group-hover:rotate-180" />
                                <div
                                    className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                    transition-all duration-300 delay-200 bg-white shadow-md rounded-md px-[15px] min-w-[150px] z-50"
                                >
                                    <ul>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            PNG Images
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Backgrounds
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Power Point
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Templates
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Text Effects
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Illustrations
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            3D
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Fonts
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            POD
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Ai Png
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Image Editor
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            {/* Inner-Dropdown PNG*/}
                            <div className="png-img relative group cursor-pointer">
                                <li className="font-bold flex items-center gap-0.5">
                                    PNG Images{" "}
                                    <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                                </li>
                                <div className="absolute !p-2 flex flex-col top-[35px] -left-[100px] invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 justify-center rounded-[12px] min-w-[750px] min-h-[200px] bg-white shadow-lg z-30">
                                    <div className="flex !px-3">
                                        {/* PNG */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#D8F8DF] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={pngDrop}
                                                    alt="PNG"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                PNG <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Vector */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#D7FAFB] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={vector}
                                                    alt="Vector"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Vector <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Clipart */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#FFEDEE] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={clipArt}
                                                    alt="Clipart"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Clipart <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Icon */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#FFEFDE] !p-3 h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={iconDrop}
                                                    alt="Icon"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Icon <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* 3D */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-gray-100 h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img src={threeD} alt="3D" className="object-contain" />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold">
                                                3D <IoIosArrowForward />
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`drop-content gap-[72px] rounded-b-[12px] !mx-3 flex  !px-3 !py-5 ${hoverShow && "bg-[#f3f3f3]"
                                            }`}
                                    >
                                        <ul className="flex flex-col gap-2">
                                            <li className="text-sm">Father's Day</li>
                                            <li className="text-sm">Tree</li>
                                            <li className="text-sm">Eid-ul-Adha</li>
                                            <li className="text-sm">Arrows</li>
                                            <li className="text-sm">Hearts</li>
                                        </ul>
                                        <div>
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[2px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[12px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[12px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm font-bold uppercase">photo</li>
                                                <li className="text-sm font-bold uppercase">psd</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inner-Dropdown Backgrounds */}
                            <div className="png-img relative group cursor-pointer">
                                <li className="font-bold flex gap-0.5 items-center">
                                    Backgrounds{" "}
                                    <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                                </li>
                                <div className="absolute !p-2 flex flex-col top-[35px] -left-[100px] invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 justify-center rounded-[12px] min-w-[650px] min-h-[200px] bg-white shadow-lg z-30">
                                    <div className="flex !px-3">
                                        {/* PNG */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#D8F8DF] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={backGround}
                                                    alt="PNG"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Background <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Vector */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#D7FAFB] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={wallPaper}
                                                    alt="Vector"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Wallpaper <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Clipart */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#FFEDEE] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={banner}
                                                    alt="Clipart"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Banner <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Icon */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] hover:bg-[#f3f3f3]`}
                                            onMouseEnter={() => setHoverShow(true)}
                                            onMouseLeave={() => setHoverShow(false)}
                                        >
                                            <div className="bg-[#FFEFDE] !p-3 h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={picture}
                                                    alt="Icon"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Picture <IoIosArrowForward />
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`drop-content gap-[75px] rounded-b-[12px] !mx-3 flex items-center !px-3 !py-5 ${hoverShow && "bg-[#f3f3f3]"
                                            }`}
                                    >
                                        <ul className="flex flex-col gap-2">
                                            <li className="text-sm">Father's Day</li>
                                            <li className="text-sm">Tree</li>
                                            <li className="text-sm">Eid-ul-Adha</li>
                                            <li className="text-sm">Arrows</li>
                                            <li className="text-sm">Hearts</li>
                                        </ul>
                                        <div>
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[2px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[12px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inner-Dropdown templates */}
                            <div className="png-img relative group cursor-pointer">
                                <li className="font-bold flex items-center gap-0.5">
                                    Templates{" "}
                                    <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                                </li>
                                <div className="absolute !p-2 flex flex-col top-[35px] -left-[100px] invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 justify-center rounded-[12px] min-w-[815px] min-h-[200px] bg-white shadow-lg z-30">
                                    <div className="flex !px-3">
                                        {/* PNG */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] `}
                                        >
                                            <div className="bg-[#D8F8DF] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={socialMedia}
                                                    alt="PNG"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Social media <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Vector */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] `}
                                        >
                                            <div className="bg-[#D7FAFB] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={marketing}
                                                    alt="Vector"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Maketing <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Clipart */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] `}
                                        >
                                            <div className="bg-[#FFEDEE] h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={individual}
                                                    alt="Clipart"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Individual <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* Icon */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] `}
                                        >
                                            <div className="bg-[#FFEFDE] !p-3 h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img
                                                    src={branding}
                                                    alt="Icon"
                                                    className="object-contain h-[80px]"
                                                />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold uppercase">
                                                Branding <IoIosArrowForward />
                                            </p>
                                        </div>

                                        {/* 3D */}
                                        <div
                                            className={`item-drop flex flex-col justify-start  !p-3 rounded-t-[8px] `}
                                        >
                                            <div className="bg-gray-100 h-[80px] w-[130px] flex justify-center items-center rounded-[8px]">
                                                <img src={office} alt="3D" className="object-contain" />
                                            </div>
                                            <p className="!mt-4 flex items-center gap-1 text-base font-bold">
                                                Office <IoIosArrowForward />
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`drop-content gap-[80px] rounded-b-[12px] !mx-3 flex items-center !px-3 !py-5 `}
                                    >
                                        <ul className="flex flex-col gap-2">
                                            <li className="text-sm">Father's Day</li>
                                            <li className="text-sm">Tree</li>
                                            <li className="text-sm">Eid-ul-Adha</li>
                                            <li className="text-sm">Arrows</li>
                                            <li className="text-sm">Hearts</li>
                                        </ul>
                                        <div>
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[2px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[2px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                        <div className="!ml-[12px]">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-sm">Father's Day</li>
                                                <li className="text-sm">Tree</li>
                                                <li className="text-sm">Eid-ul-Adha</li>
                                                <li className="text-sm">Arrows</li>
                                                <li className="text-sm">Hearts</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PPT (no dropdown) */}
                            <li className="font-bold flex items-center gap-0.5 text-[16px] cursor-pointer">
                                PPT
                            </li>

                            {/* AI Tools */}
                            <li className="relative group font-bold flex items-center gap-0.5 text-[16px] cursor-pointer">
                                AI Tools{" "}
                                <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                                <div
                                    className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
               transition-all duration-300 delay-200 bg-white shadow-md rounded-md py-[10px] px-[10px] min-w-[170px] z-50"
                                >
                                    <ul>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            AI PNG
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            AI BG Remover
                                        </li>
                                        <li className="hover:bg-gray-100 px-2 py-1 rounded my-2.5">
                                            Image Remover
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Buttons Hover */}
                    <div className="hidden sm:block">
                        <div className="pre-btn  nav-btn flex justify-end gap-4">
                            <div className="relative group ">
                                <button className="flex items-center gap-2 bg-[#5b658d] hover:bg-[#313e68] !text-[14px] !text-[#FFE4CA] font-bold rounded cursor-pointer">
                                    <Crown size={16} color="white" fill="#ffffff" />
                                    Enterprise
                                </button>
                                <div className="absolute invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 -left-[70%] w-[340px] min-h-[100px] !p-5 bg-white z-20 rounded-[12px] shadow-lg">
                                    <div className="bg-img relative">
                                        <img src={bgImg} alt="" className="object-cover " />
                                        <div className="iner-txt absolute top-4 left-5">
                                            <h4 className="!text-white font-bold !text-[18px]">
                                                Enterprise Plan
                                            </h4>
                                        </div>
                                        <div className="iner-content bg-[#EDF2FC] !p-5">
                                            <p className="flex gap-2 items-center text-[#333] text-[14px] ">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    className="_ktturt _tea4l2 _1yoi2w4"
                                                >
                                                    <path
                                                        fill="#47537D"
                                                        d="M8.96 0a8.96 8.96 0 1 1-.001 17.921A8.96 8.96 0 0 1 8.96 0m.106 4.52C6.868 4.52 5.6 6.004 5.6 8.456v1.046c0 2.434 1.268 3.898 3.466 3.898 1.88 0 3.254-1.176 3.254-2.828a.094.094 0 0 0-.094-.094H11.09a.16.16 0 0 0-.16.146c-.084.922-.802 1.556-1.86 1.556-1.306 0-2.042-.958-2.042-2.672V8.456c.002-1.74.74-2.71 2.044-2.71 1.06 0 1.78.676 1.86 1.668a.16.16 0 0 0 .16.148h1.134a.094.094 0 0 0 .094-.094c0-1.734-1.368-2.948-3.254-2.948"
                                                    ></path>
                                                </svg>
                                                Access to all assets
                                            </p>
                                            <p className="flex gap-2 items-center text-[#333] text-[14px] !my-2 ">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    className="_ktturt _tea4l2 _1yoi2w4"
                                                >
                                                    <g fill="none" fill-rule="evenodd">
                                                        <circle cx="9" cy="9" r="9" fill="#47537D"></circle>
                                                        <g fill="#FFF" transform="translate(3.5 2.723)">
                                                            <path
                                                                fill-rule="nonzero"
                                                                d="m6.6 10.755 2.646-.022a.66.66 0 0 0 .654-.66V5.475a1.32 1.32 0 0 0-1.32-1.32H6.6zM5.557.565a.88.88 0 0 1 .218.58V9.93H.825V4.137c0-.38.164-.742.45-.993L4.316.483a.88.88 0 0 1 1.242.082m-1.02 5.24h-1.65a.412.412 0 1 0 0 .825h1.65a.412.412 0 1 0 0-.825m0-1.65h-1.65a.412.412 0 1 0 0 .825h1.65a.412.412 0 1 0 0-.825"
                                                            ></path>
                                                            <rect
                                                                width="10.725"
                                                                height="1"
                                                                y="9.93"
                                                                rx=".5"
                                                            ></rect>
                                                        </g>
                                                    </g>
                                                </svg>
                                                Maximun commercial use rights
                                            </p>
                                            <p className="flex gap-2 items-center text-[#333] text-[14px] ">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    className="_ktturt _tea4l2 _1yoi2w4"
                                                >
                                                    <g fill="none" fill-rule="evenodd">
                                                        <circle cx="9" cy="9" r="9" fill="#47537D"></circle>
                                                        <g fill="#FFF" fill-rule="nonzero">
                                                            <path d="M10.25 9.269a2.32 2.32 0 0 0 1.06-1.998A2.318 2.318 0 1 0 7.734 9.27a.193.193 0 0 1-.032.34 3.4 3.4 0 0 0-2.046 2.545.484.484 0 0 0 .48.565h5.713a.484.484 0 0 0 .48-.565 3.39 3.39 0 0 0-2.047-2.543.193.193 0 0 1-.031-.342"></path>
                                                            <path d="M13.98 11.04a2.25 2.25 0 0 0-1.355-1.683.128.128 0 0 1-.02-.226 1.533 1.533 0 0 0-.941-2.819 2.85 2.85 0 0 1-.674 3.05 3.93 3.93 0 0 1 1.696 2.051h.976a.32.32 0 0 0 .318-.373M6.994 9.364a2.87 2.87 0 0 1-.675-3.052l-.023-.002a1.533 1.533 0 0 0-.915 2.821.128.128 0 0 1-.021.225 2.25 2.25 0 0 0-1.355 1.684.32.32 0 0 0 .318.374h.975c.31-.86.909-1.585 1.695-2.05"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                                Multi-account use
                                            </p>
                                            <button className="!mt-3  bg-linear-to-t from-[#dfab62] to-[#fdce87] w-full text-[16px] font-bold !p-3 text-white rounded-[12px]">
                                                Get Enterprise Authorization
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 top-[100%] -left-[70%] w-[340px] min-h-[100px] !p-5 bg-white z-20 rounded-[12px] shadow-lg">
                                    <div className="pricing relative">
                                        <h4 className="absolute top-4 left-5 !text-white font-bold !text-[18px]">
                                            Individual Plan
                                        </h4>
                                        <img src={priceImg} alt="" />
                                        <div className="iner-content bg-[#D6F8DE] !p-3">
                                            <p className="flex gap-2 items-center text-[#333] text-[14px] ">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    className="_ktturt _tea4l2 _1yoi2w4"
                                                >
                                                    <g fill="none">
                                                        <path
                                                            fill="#77C88E"
                                                            d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18"
                                                        ></path>
                                                        <path
                                                            fill="#FFF"
                                                            d="M8.438 4.5h1.124a.562.562 0 0 0 0-1.125H8.438a.562.562 0 0 0 0 1.125m.024 8.723c.29.334.76.334 1.05 0l2.622-3.016a.93.93 0 0 0 .21-.727.55.55 0 0 0-.546-.48h-1.673V6.189a.56.56 0 0 0-.563-.563H8.437a.56.56 0 0 0-.562.563V9h-1.7a.55.55 0 0 0-.545.479.93.93 0 0 0 .21.727z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                Unlimited Downloads
                                            </p>
                                            <p className="flex gap-2 items-center text-[#333] text-[14px] !my-2 ">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    className="_ktturt _tea4l2 _1yoi2w4"
                                                >
                                                    <g fill="none">
                                                        <path
                                                            fill="#77C88E"
                                                            d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18"
                                                        ></path>
                                                        <path
                                                            fill="#FFF"
                                                            d="M8.908 4.025a.24.24 0 0 1 .215 0l3.631 1.335c.154.067.246.2.246.367v4.17c-.123 2.502-3.723 4.003-3.877 4.07C9.093 14 9.031 14 9 14c-.03 0-.092-.034-.123-.034C8.723 13.9 5.092 12.4 5 9.93V5.727c0-.167.092-.3.246-.367Zm1.969 3.17-2.4 2.601-1.17-1.267a.316.316 0 0 0-.46 0 .385.385 0 0 0 0 .5l1.384 1.535a.33.33 0 0 0 .246.1.33.33 0 0 0 .246-.1l2.646-2.836a.385.385 0 0 0 0-.5c-.122-.166-.338-.166-.492-.033"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                Personal commercial use
                                            </p>
                                            <p className="flex gap-2 items-center text-[#333] text-[14px] ">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    className="_ktturt _tea4l2 _1yoi2w4"
                                                >
                                                    <g fill="none">
                                                        <path
                                                            fill="#77C88E"
                                                            d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18"
                                                        ></path>
                                                        <path
                                                            fill="#FFF"
                                                            d="M9.223 9.009c1.453 0 2.638-1.122 2.638-2.505S10.676 4 9.223 4 6.584 5.121 6.584 6.504c0 1.378 1.181 2.505 2.639 2.505m-1.016.456C6.37 9.465 5 10.662 5 12.406v.186c0 .912 1.472.912 3.329.912h1.977c1.789 0 3.334 0 3.334-.912v-.186c0-1.739-1.37-2.941-3.207-2.941z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                Individual Authorization
                                            </p>
                                            <button className="!mt-3  bg-linear-to-t from-[#ff910f] to-[#ffc76b] w-full text-[16px] font-bold !p-3 text-white rounded-[12px]">
                                                Go Premium
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-[#ff7d04] hover:bg-[#ff9f0f] !text-[14px] !text-white font-bold rounded cursor-pointer">
                                    <Crown size={16} color="white" fill="#ffffff" />
                                    Pricing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="below-nav flex justify-center items-center gap-6 ">
                    {
                        userData.role === 'admin' &&
                        <button className="flex gap-1 items-center bg-[#4EAA76] !text-[#fff] font-bold hover:bg-[#4eaa76a6]" onClick={() => navigate("/admin/dashboard")}>
                            <MdManageAccounts /> Admin
                        </button>
                    }
                    <button className="swing-animation text-[12px] sm:text-[16px] flex items-center gap-2 bg-[#ff9992] hover:bg-[#f04c41]  text-white font-bold rounded cursor-pointer">
                        90% OFF
                    </button>
                    {/* SVG Hover */}
                    <div className="relative group square hover:text-white  flex justify-center items-center">
                        <div className="absolute invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 min-h-[100px] w-[300px] z-30 rounded-[12px] !p-5 -left-[250px] top-10 bg-white shadow-lg">
                            <h4 className="!text-base !text-[#333] font-bold !mb-3">
                                New Project
                            </h4>
                            <div className="top-item flex gap-2 items-center">
                                <div className="bg-[#DBECFF] rounded-[12px] ">
                                    <img src={lovePik} alt="" />
                                </div>
                                <div className="!bg-[#FFEBD4] rounded-[12px] ">
                                    <img src={pikBest} alt="" />
                                </div>
                            </div>
                            <div className="down-item !my-2 flex gap-2 items-center">
                                <div className="bg-[#FFE7EB] rounded-[12px] ">
                                    <img src={seaPik} alt="" />
                                </div>
                                <div className="bg-[#D9EBFF]  rounded-[12px] h-[64px] flex items-center !px-3 w-[130px]">
                                    <img src={slideDoc} alt="" />
                                </div>
                            </div>
                        </div>
                        <svg
                            className="!pl-1  !pt-1 rounded-full hover:bg-[#5ABC84] bg-[#efefef] cursor-pointer"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="4" y="4" width="4" height="4" />
                            <rect x="10" y="4" width="4" height="4" />
                            <rect x="16" y="4" width="4" height="4" />
                            <rect x="4" y="10" width="4" height="4" />
                            <rect x="10" y="10" width="4" height="4" />
                            <rect x="16" y="10" width="4" height="4" />
                            <rect x="4" y="16" width="4" height="4" />
                            <rect x="10" y="16" width="4" height="4" />
                            <rect x="16" y="16" width="4" height="4" />
                        </svg>
                    </div>

                    {/* Login Profile */}
                    {
                        userData.userID ?
                            <div className="w-[30px] h-[30px] login relative group cursor-pointer hidden xl:block">
                                <img src={userIcon} alt={userData.username} className="w-full h-full object-contain" />
                                <div className="absolute invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 flex flex-col items-center justify-between min-h-[400px] w-[400px] bg-white rounded-[12px] z-99 right-0 top-[35px] !p-5 shadow-lg">
                                    <div className="absolute top-[15px] right-2">
                                        <button className="!text-[14px] hover:!text-red-500 hover:underline" onClick={logoutFunction}>Logout</button>
                                    </div>
                                    {/* Profile Content */}
                                    <div className="relative flex flex-col items-center ">
                                        <div className="absolute z-10 top-[40px] right-[0px] cursor-pointer shadow-xl w-[34px] h-[34px] flex justify-center items-center bg-white !p-1.5 rounded-[50px] "
                                            onClick={() => navigate("/dashboard/subscriptions")}>
                                            {
                                                userData.plan === 'premium' ?
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
                                                    </svg> :
                                                    <svg
                                                        className="_tea4l2"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="28"
                                                        height="23"
                                                        aria-hidden="true"
                                                        viewBox="0 0 28 23"
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="isc2z30a"
                                                                x1="50%"
                                                                x2="50%"
                                                                y1="11.131%"
                                                                y2="57.082%"
                                                            >
                                                                <stop offset="0%" stop-color="#C7C7C7"></stop>
                                                                <stop offset="100%" stop-color="#9C9C9C"></stop>
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="isc2z30c"
                                                                x1="90.916%"
                                                                x2="5.301%"
                                                                y1="61.059%"
                                                                y2="59.126%"
                                                            >
                                                                <stop offset="0%" stop-color="#D2D2D2"></stop>
                                                                <stop offset="100%" stop-color="#C4C4C4"></stop>
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="isc2z30e"
                                                                x1="100%"
                                                                x2="22.218%"
                                                                y1="27.905%"
                                                                y2="95.888%"
                                                            >
                                                                <stop offset="0%" stop-color="#E8E8E8"></stop>
                                                                <stop offset="100%" stop-color="#CFCFCF"></stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <path
                                                            id="isc2z30b"
                                                            d="M25.455 3.662 22.47 18.458c-.116.35-6.731 1.579-9.755 1.579-2.808 0-9.639-1.23-9.756-1.579L0 3.662l7.948 5.016L12.715 0l4.826 8.678z"
                                                        ></path>
                                                        <g fill="none" fill-rule="evenodd">
                                                            <path
                                                                fill="url(#isc2z30a)"
                                                                fill-rule="nonzero"
                                                                d="M9.301 3.906 14 15.866H3.733l4.7-11.96a.467.467 0 0 1 .868 0"
                                                                transform="rotate(-20 8.867 9.333)"
                                                            ></path>
                                                            <path
                                                                fill="url(#isc2z30a)"
                                                                fill-rule="nonzero"
                                                                d="m19.568 3.906 4.699 11.96H14l4.699-11.96a.467.467 0 0 1 .869 0"
                                                                transform="scale(-1 1)rotate(-20 0 117.844)"
                                                            ></path>
                                                            <g transform="translate(1.281 1.389)">
                                                                <mask id="isc2z30d" fill="#fff">
                                                                    <use href="#isc2z30b"></use>
                                                                </mask>
                                                                <use
                                                                    fill="url(#isc2z30c)"
                                                                    fill-rule="nonzero"
                                                                    href="#isc2z30b"
                                                                ></use>
                                                                <path
                                                                    stroke="#FFF"
                                                                    stroke-linejoin="round"
                                                                    stroke-width=".933"
                                                                    d="m23.712 14.935-.305.084a41.3 41.3 0 0 1-10.29 1.435l-.328.003v-.002q-5.422-.03-10.617-1.438l-.305-.084"
                                                                    mask="url(#isc2z30d)"
                                                                    opacity=".504"
                                                                ></path>
                                                            </g>
                                                            <ellipse
                                                                cx="1.909"
                                                                cy="5.682"
                                                                fill="url(#isc2z30e)"
                                                                fill-rule="nonzero"
                                                                rx="1.909"
                                                                ry="1.894"
                                                            ></ellipse>
                                                            <ellipse
                                                                cx="14"
                                                                cy="1.894"
                                                                fill="url(#isc2z30e)"
                                                                fill-rule="nonzero"
                                                                rx="1.909"
                                                                ry="1.894"
                                                            ></ellipse>
                                                            <ellipse
                                                                cx="26.091"
                                                                cy="5.682"
                                                                fill="url(#isc2z30e)"
                                                                fill-rule="nonzero"
                                                                rx="1.909"
                                                                ry="1.894"
                                                            ></ellipse>
                                                            <path
                                                                fill="#FFF"
                                                                fill-rule="nonzero"
                                                                d="M14.626 15.48a.7.7 0 0 1-1.224.051l-.028-.051-2.1-4.2a.7.7 0 0 1 1.226-.674l.026.048L14 13.602l1.474-2.948a.7.7 0 0 1 .889-.336l.05.023a.7.7 0 0 1 .336.889l-.023.05z"
                                                                opacity=".7"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                            }
                                        </div>
                                        <div className={`relative w-[72px] h-[72px] flex items-center justify-center border-2 ${userData.plan === 'premium' ? 'border-[#ffe895]' : 'border-[#efefef]'} !p-3 rounded-[50px] overflow-hidden`}>
                                            <img src={userIcon} alt="" />
                                        </div>
                                        <div className="!mt-5 flex justify-center items-center gap-1.5">
                                            <p>{userData?.username}</p>
                                            <img src={nameIcon} alt="" className="w-[15px]" />
                                        </div>
                                        <div className="!mt-1 mb-3">
                                            <p>ID: {userData.userID}</p>
                                        </div>
                                        <div className={`!mt-1 flex items-center bg-[#E8E8E8] rounded-full ${userData.plan === 'free' ? 'bg-[#E8E8E8]' : 'bg-linear-to-b from-[#FAD961] to-[#F76B1C] !text-[#fff]'}`}>
                                            {" "}
                                            <span className={`!py-[8px] !text-[12px] sm:!text-[14px] font-bold capitalize !px-[16px]`}>
                                                <span className="!text-[12px] sm:!text-[14px]">{userData.plan}</span> user
                                            </span>{" "}
                                        </div>
                                    </div>

                                    {/* Download Status */}
                                    <div className="flex items-center !py-[20px] gap-10">
                                        <div className="flex items-center flex-col">
                                            <p className="!text-[24px] font-bold !text-[#333]">{dailyDownloadLimit}</p>
                                            <p className="text-[#999] !text-sm">Daily Downloads</p>
                                        </div>

                                        <div className="flex items-center flex-col">
                                            <p className="!text-[24px] font-bold !text-[#333]">{remainingDownloads}</p>
                                            <p className="text-[#999] !text-sm">Remaning Downloads</p>
                                        </div>
                                    </div>

                                    {/* Border Line */}

                                    <div className="border-t-2 w-full border-[#F7F7F7]"></div>


                                    {/* Sale banner */}
                                    <div className={`!mt-4 !p-[20px] relative flex flex-col items-center justify-center bg-[#FFFAEC] w-[350px] min-h-[100px] rounded-[12px] shadow-lg ${userData.plan === 'premium' && 'hidden'}`}>
                                        <div className=" absolute top-0 left-0 z-30 flex flex-col justify-center !px-1">
                                            <p className="!text-[14px] !text-white uppercase font-bold">
                                                Sale
                                            </p>
                                            <p className="!text-[14px] !text-white uppercase font-bold">
                                                80%
                                            </p>
                                        </div>
                                        <div className="absolute top-[20px] right-[20px] -rotate-30">
                                            <img src={saleCrown} alt="" className="w-[50px]" />
                                        </div>
                                        <div className="absolute top-0 left-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="46"
                                                height="50"
                                                viewBox="0 0 46 50"
                                                fill="none"
                                            >
                                                <path
                                                    d="M0 0H46V49.5L23 43.5L0 49.5V0Z"
                                                    fill="#FF3E7E"
                                                ></path>
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 ">
                                            <p className="!text-[14px] !text-[#85713b]">
                                                One Time payment
                                            </p>
                                            <p className="!text-[14px] font-medium !text-[#85713b]">
                                                8,000,000+ curated assets
                                            </p>
                                            <p className="!text-[16px] !text-[#4e2d25] font-semibold">
                                                Unlimited Lifetime Downloads
                                            </p>
                                        </div>

                                        <button className=" !mt-3 bg-linear-65 from-[#f7bc0b] !py-2 to-[#ff9900] w-full !text-[18px] font-bold !text-white">
                                            Buy Now
                                        </button>
                                    </div>

                                    {/* Help center */}
                                    <div className="!mt-5 flex gap-[100px]">
                                        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/dashboard/profile")}>
                                            <div className="flex flex-col items-center justify-center bg-[#EDFAF0] w-[60px] h-[60px] rounded-[12px]">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" aria-hidden="true" viewBox="0 0 22 23" class="_tea4l2"><g fill="none" fill-rule="evenodd"><path fill="#83D99B" d="M10.69 11.759c-5.612 0-10.217 4.295-10.687 9.766a.86.86 0 0 0 .866.923h19.64c.503 0 .91-.424.867-.923-.47-5.471-5.074-9.766-10.686-9.766"></path><circle cx="10.69" cy="5.345" r="5.345" fill="#BEEDCC"></circle></g></svg></span>
                                            </div>
                                            <p className="!text-[#333] !py-2 !text-[14px]">My Profile</p>
                                        </div>
                                        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/contact")}>
                                            <div className="flex flex-col items-center justify-center bg-[#EDFAF0] w-[60px] h-[60px] rounded-[12px]">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" aria-hidden="true" viewBox="0 0 22 22" class="_tea4l2"><g fill="none"><path fill="#91C4FF" d="M19.387 12.065c0-.355.12-.71.12-1.065s0-.71-.12-1.065L21.8 8.161c.241-.118.241-.473.12-.71l-2.292-3.784c-.12-.237-.483-.355-.724-.237l-2.775 1.065c-.604-.473-1.207-.828-1.931-1.065L13.836.473c0-.236-.242-.473-.604-.473H8.768c-.242 0-.483.237-.604.473L7.802 3.43c-.724.237-1.327.592-1.93 1.065L3.095 3.43c-.241-.118-.483 0-.724.237L.079 7.452c-.12.236-.12.473.12.71l2.414 1.773c0 .355-.12.71-.12 1.065s0 .71.12 1.065L.2 13.839c-.241.118-.241.473-.12.71l2.292 3.784c.12.237.483.355.724.237l2.775-1.065c.604.473 1.207.828 1.931 1.065l.362 2.957c0 .236.242.473.604.473h4.464c.242 0 .483-.237.604-.473l.362-2.957c.724-.237 1.327-.592 1.93-1.065l2.776 1.065c.241.118.483 0 .724-.237l2.293-3.785c.12-.236.12-.473-.12-.71z"></path><path fill="#C8E3FF" d="M11.06 14.785c-2.172 0-3.86-1.656-3.86-3.785s1.69-3.785 3.861-3.785S14.922 8.871 14.922 11s-1.69 3.785-3.862 3.785"></path></g></svg></span>
                                            </div>
                                            <p className="!text-[#333] !py-2 !text-[14px]">Help Center</p>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <button
                                className="flex items-center gap-2 bg-[#efefef] hover:bg-[#71C194]  text-[#333] hover:text-white font-bold rounded cursor-pointer"
                                onClick={() => navigate("/auth/login")}
                            >
                                Log in
                            </button>
                    }
                </div>

                <div className="menu block xl:hidden border-1 border-gray-200 rounded-[5px] !p-2">
                    {!menuOpen ? (
                        <CgMenu
                            className="text-black"
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    ) : (
                        <BiX
                            className="text-black"
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    )}
                </div>

                {/* Toogle Menu  */}
                <div
                    className={`toggle-menu absolute top-[100%] h-[calc(100vh-56px)] !px-5 w-full z-999 sm:w-[400px] transition-all duration-300 !py-3 left-0 bg-gray-100 ${menuOpen && "toggle-menu-show"
                        }`}
                >
                    <div className="">
                        <ul className="gap-7">
                            <li className="!py-3 text-[14px] sm:text-[16px]">Browse</li>
                            <li className="!py-3 text-[14px] sm:text-[16px]">PNG Images</li>
                            <li className="!py-3 text-[14px] sm:text-[16px]"> Backgrounds</li>
                            <li className="!py-3 text-[14px] sm:text-[16px]">Templates</li>
                            <li className="!py-3 text-[14px] sm:text-[16px]">PPT</li>
                            <li className="!py-3 text-[14px] sm:text-[16px]">AI Tools</li>
                        </ul>
                    </div>
                    <div className="pre-btn  nav-btn flex justify-start gap-4">
                        <button className="flex items-center gap-2 bg-[#5b658d] hover:bg-[#313e68] text-white font-bold rounded cursor-pointer">
                            <Crown size={24} color="white" fill="#ffffff" />
                            Enterprise
                        </button>
                        <button className="flex items-center gap-2 bg-[#ff7d04] hover:bg-[#ff9f0f] text-white font-bold rounded cursor-pointer">
                            <Crown size={24} color="white" fill="#ffffff" />
                            Pricing
                        </button>
                    </div>

                    <div className="below-nav  gap-6 !mt-4">
                        <div className="square hidden justify-center items-center">
                            <svg
                                className="!pl-1  !pt-1 rounded-full bg-[#efefef]"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="black"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="4" y="4" width="4" height="4" />
                                <rect x="10" y="4" width="4" height="4" />
                                <rect x="16" y="4" width="4" height="4" />
                                <rect x="4" y="10" width="4" height="4" />
                                <rect x="10" y="10" width="4" height="4" />
                                <rect x="16" y="10" width="4" height="4" />
                                <rect x="4" y="16" width="4" height="4" />
                                <rect x="10" y="16" width="4" height="4" />
                                <rect x="16" y="16" width="4" height="4" />
                            </svg>
                        </div>
                        <div className="login !mt-5 flex flex-col gap-6">
                            <button className="flex items-center justify-center  gap-2 bg-[#ffffff] hover:bg-[#71C194]   text-[#333] hover:text-white font-bold rounded cursor-pointer">
                                Log in
                            </button>
                            <button className="flex items-center justify-center  gap-2 bg-[#ffffff] hover:bg-[#71C194]  text-[#333] hover:text-white font-bold rounded cursor-pointer">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Navbar;