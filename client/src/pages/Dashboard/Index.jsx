import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import userImage from "../../assets/images/user.png";
import { FaCrown, FaUser, FaHeart, FaFolderOpen } from "react-icons/fa";
import { FaCreditCard, FaUsersGear, FaX } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import { PiUserGearBold } from "react-icons/pi";
import { IoCloudUploadSharp } from "react-icons/io5";
import { SidebarOpen } from "lucide-react";
import { RiMenuFold2Line } from "react-icons/ri";
import Customers from "./Customers";
import Authorization from "./Authorization";
import Favourites from "./Favourites";
import Downloads from "./Downloads";
import Followings from "./Followings";
import Projects from "./Projects";
import MyUploads from "./MyUploads";
import { useAuthContext } from "../../contexts/AuthContext";
import Subscription from "./Subscription";

export default function Dashboard() {

  const { userData } = useAuthContext()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setSidebarOpen(false);
    navigate(`/dashboard/${path}`);
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="flex flex-col md:flex-row gap-5 min-h-screen py-5 md:px-4 px-2 bg-[#F5F7FC]">
        <div className="rounded-[20px] w-full md:w-[350px]">
          <div className="bg-white shadow-lg rounded-3xl">
            <div className="flex justify-center items-center">
              <div className="relative mt-5">
                <div className="md:w-[120px] md:h-[120px] w-[80px] h-[80px]  rounded-full border-5 p-1 border-gray-300 overflow-hidden">
                  <img
                    src={userImage}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
                  <FaCrown className="text-gray-400 w-7 h-7" />
                </div>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-[16px] text-black font-bold">{userData?.username}</p>
              <p className="text-gray-400 font-semibold">ID: {userData?.userID}</p>
              <div className="flex justify-center mt-2 mb-3">
                <p className="!text-[#39a166] bg-green-100 px-3 !text-[14px] rounded-full flex items-center  gap-2">
                  Active
                  <span className="animate-pulse w-[8px] rounded-full h-[8px] bg-[#39a166]"></span>
                </p>
              </div>
              <button className="md:px-[20px] md:py-3 px-[15px] py-2 rounded-full font-bold bg-gradient-to-t from-[#F3574C] via-[#F65A48] to-[#f86055] text-white sm:!text-[12px] !text-[10px] my-2 shadow-lg transform transition-all duration-300 hover:scale-105">
                Become a Member
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-white shadow-lg hidden md:block rounded-3xl mt-4">
            <ul className="p-[30px] space-y-2 text-gray-700 font-medium">
              <Link to="/dashboard/profile">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <FaUser />
                  My Profile
                </li>
              </Link>

              <Link to="/dashboard/subscriptions">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <FaCreditCard />
                  Subscription
                </li>
              </Link>

              <Link to="/dashboard/authorization">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <PiUserGearBold />
                  My Authorization
                </li>
              </Link>

              <Link to="/dashboard/customer">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <FaUsersGear />
                  My Customer
                </li>
              </Link>
              <Link to="/dashboard/favourites">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <FaHeart />
                  My Favourites
                </li>
              </Link>
              <Link to="/dashboard/downloads">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <LuDownload />
                  My Downloads
                </li>
              </Link>
              <Link to="/dashboard/followings">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <MdOutlineStarPurple500 />
                  My Followings
                </li>
              </Link>
              <Link to="/dashboard/projects">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <FaFolderOpen />
                  My Projects
                </li>
              </Link>
              <Link to="/dashboard/uploads">
                <li className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[16px] py-2 cursor-pointer">
                  <IoCloudUploadSharp />
                  My Uploads
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div
          className={`dashboard-sidebar fixed left-0 top-0 bg-white w-full min-h-screen z-[9999999999] ${sidebarOpen && "dashboard-sidebar-active"
            }`}
        >
          <p className="flex justify-end !text-[12px] px-5 pt-5">
            <FaX onClick={() => setSidebarOpen(false)} />
          </p>
          <ul className="p-[20px] space-y-2 text-gray-700 font-medium">
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("profile")}
            >
              <FaUser />
              My Profile
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("subscription")}
            >
              <FaCreditCard />
              Subscription
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("authorization")}
            >
              <PiUserGearBold />
              My Authorization
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("customer")}
            >
              <FaUsersGear />
              My Customer
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("favourites")}
            >
              <FaHeart />
              My Favourites
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("downloads")}
            >
              <LuDownload />
              My Downloads
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("followings")}
            >
              <MdOutlineStarPurple500 />
              My Followings
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("projects")}
            >
              <FaFolderOpen />
              My Projects
            </li>
            <li
              className="hover:text-green-500 flex items-center gap-3 text-gray-500 font-semibold !text-[12px] py-2 cursor-pointer"
              onClick={() => handleNavigate("uploads")}
            >
              <IoCloudUploadSharp />
              My Uploads
            </li>
          </ul>
        </div>

        <div className="block md:hidden fixed bottom-10 right-5 bg-[#5fc58b] p-2 rounded-full z-[999999]">
          <RiMenuFold2Line
            className="text-white"
            onClick={() => setSidebarOpen(true)}
          />
        </div>

        <div className="w-full">
          <Routes>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="authorization" element={<Authorization />} />
            <Route path="customer" element={<Customers />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="followings" element={<Followings />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="projects" element={<Projects />} />
            <Route path="uploads" element={<MyUploads />} />
            <Route path="subscription" element={<Subscription />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}
