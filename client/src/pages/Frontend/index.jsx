import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "./Home";
import DownloadPage from './DownloadPage'
import Main from "./Main";
import About from "./About/index";
import ContactPage from "./ContactPage/index";
import Footer from "../../components/Footer";

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
        <Route path="/images/:category" element={<Main />} />
      </Routes>
      <Footer />
    </>
  );
}