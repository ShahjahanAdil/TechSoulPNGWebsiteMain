import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import DownloadPage from './DownloadPage'
import About from './About'
import ContactPage from './ContactPage'

export default function Frontend() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="/image/:imageID" element={<DownloadPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
