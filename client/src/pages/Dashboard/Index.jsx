import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import userImage from "../../assets/images/rev1.jpg"

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FC] py-[40px] overflow-hidden">
        <div className="flex min-h-screen">
        <div className="w-[300px] p-[20px] rounded-[20px] bg-[#FFFFFF]">
          <div className="profileimage flex justify-center items-center bg-amber-300">
            <div className="p-[70px]">
              <img src={userImage} alt="" className="rounded-full"/>
            </div>
          </div>
        </div>
        <div className="flex-1 p-10">
          <Routes>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
      </div>
      
      <Footer />
    </>
  );
}
