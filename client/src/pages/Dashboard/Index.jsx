import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import userImage from "../../assets/images/user.png";
import { FaUser, FaHeart, FaFolderOpen } from "react-icons/fa";
import { FaCreditCard, FaUsersGear, FaX } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import { PiUserGearBold } from "react-icons/pi";
import { IoCloudUploadSharp } from "react-icons/io5";
// import { SidebarOpen } from "lucide-react";
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
                <div className={`md:w-[120px] md:h-[120px] w-[80px] h-[80px]  rounded-full border-3 p-2 ${userData.plan === 'premium' ? 'border-[#ffe895]' : ' border-gray-200'} overflow-hidden`}>
                  <img
                    src={userImage}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-1 -right-1.5 bg-white rounded-full p-1 shadow">
                  <svg class="_tea4l2" xmlns="http://www.w3.org/2000/svg" width="28" height="25" aria-hidden="true" viewBox="0 0 28 23"><defs><linearGradient id="isc2z30a" x1="50%" x2="50%" y1="11.131%" y2="57.082%"><stop offset="0%" stop-color="#C7C7C7"></stop><stop offset="100%" stop-color="#9C9C9C"></stop></linearGradient><linearGradient id="isc2z30c" x1="90.916%" x2="5.301%" y1="61.059%" y2="59.126%"><stop offset="0%" stop-color="#D2D2D2"></stop><stop offset="100%" stop-color="#C4C4C4"></stop></linearGradient><linearGradient id="isc2z30e" x1="100%" x2="22.218%" y1="27.905%" y2="95.888%"><stop offset="0%" stop-color="#E8E8E8"></stop><stop offset="100%" stop-color="#CFCFCF"></stop></linearGradient></defs><path id="isc2z30b" d="M25.455 3.662 22.47 18.458c-.116.35-6.731 1.579-9.755 1.579-2.808 0-9.639-1.23-9.756-1.579L0 3.662l7.948 5.016L12.715 0l4.826 8.678z"></path><g fill="none" fill-rule="evenodd"><path fill="url(#isc2z30a)" fill-rule="nonzero" d="M9.301 3.906 14 15.866H3.733l4.7-11.96a.467.467 0 0 1 .868 0" transform="rotate(-20 8.867 9.333)"></path><path fill="url(#isc2z30a)" fill-rule="nonzero" d="m19.568 3.906 4.699 11.96H14l4.699-11.96a.467.467 0 0 1 .869 0" transform="scale(-1 1)rotate(-20 0 117.844)"></path><g transform="translate(1.281 1.389)"><mask id="isc2z30d" fill="#fff"><use href="#isc2z30b"></use></mask><use fill="url(#isc2z30c)" fill-rule="nonzero" href="#isc2z30b"></use><path stroke="#FFF" stroke-linejoin="round" stroke-width=".933" d="m23.712 14.935-.305.084a41.3 41.3 0 0 1-10.29 1.435l-.328.003v-.002q-5.422-.03-10.617-1.438l-.305-.084" mask="url(#isc2z30d)" opacity=".504"></path></g><ellipse cx="1.909" cy="5.682" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse><ellipse cx="14" cy="1.894" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse><ellipse cx="26.091" cy="5.682" fill="url(#isc2z30e)" fill-rule="nonzero" rx="1.909" ry="1.894"></ellipse><path fill="#FFF" fill-rule="nonzero" d="M14.626 15.48a.7.7 0 0 1-1.224.051l-.028-.051-2.1-4.2a.7.7 0 0 1 1.226-.674l.026.048L14 13.602l1.474-2.948a.7.7 0 0 1 .889-.336l.05.023a.7.7 0 0 1 .336.889l-.023.05z" opacity=".7"></path></g></svg>
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
              {
                userData.plan === 'free' ?
                  <button className="md:px-[20px] md:py-3 px-[15px] py-2 rounded-full font-bold bg-gradient-to-t from-[#F3574C] via-[#F65A48] to-[#f86055] text-white sm:!text-[14px] !text-[12px] my-2 shadow-lg transform transition-all duration-300 hover:scale-105">
                    Become a Member
                  </button> :
                  <button className="md:px-[20px] md:py-3 px-[15px] py-2 rounded-full font-bold bg-linear-to-b from-[#FAD961] to-[#F76B1C] text-white sm:!text-[14px] !text-[12px] my-2 shadow-lg !cursor-default">
                    Premium Account
                  </button>
              }
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
            <Route path="subscriptions" element={<Subscription />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}
