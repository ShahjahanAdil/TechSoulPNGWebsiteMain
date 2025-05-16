import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Home from "./Home";
import DownloadPage from './DownloadPage'
import Main from "./Main";
import About from "./About/Index";
import ContactPage from "./ContactPage/Index";
import Footer from "../../Components/Footer";

export default function Frontend() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/image/:imageID" element={<DownloadPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/images" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
}