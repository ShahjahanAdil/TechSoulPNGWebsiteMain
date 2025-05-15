import React, { useState, useRef, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import "./Footer.css";
import bankCard from '../../assets/images/bankcards.jpeg'

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const dropdownRef = useRef();

  const languages = ["English", "Hindi", "Spanish", "French", "Arabic"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <section className="footer bg-[#FAFAFB] py-10 px-7 flex flex-col justify-between gap-5 lg:flex-row">
      {/* Left Section */}
      <div className="left-foot">
        <div className="logo-side flex flex-col items-start gap-8">
          <img src={logo} alt="logo" className="w-44" />
          <div className="overflow-hidden md:w-auto lg:w-[500px]">
            <p className="font-light text-sm">
              Pngtree, founded in January 2017, offers tens of millions of PNG images and graphic
              resources, aiming to be the world's largest design platform. We serve professional
              designers and creatives, helping them save time and enhance their projects
              efficiently. All our designers are real- authenticated, and their works come with
              commercial licenses. Our platform also features AI tools, including an AI image
              generator and AI background remover, making it a comprehensive resource hub for design
              needs.
            </p>
          </div>

          {/* Social Icons */}
          <div className="social-icons flex gap-3 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1DA1F2] w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E60023] text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
            >
              <FaPinterestP size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
            >
              <FaInstagram size={18} />
            </a>
          </div>

          {/* Language Selector */}
          <div className="select-lang relative w-56 mt-4" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="bg-white border border-gray-300 px-4 py-2 rounded cursor-pointer flex justify-between items-center"
            >
              <span>{selectedLang}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {open && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 shadow-lg z-50 py-2">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-foot flex flex-col justify-center gap-10 px-5 sm:flex-row sm:gap-20">
        {/* PNGTREE Section */}
        <div className="png-tree w-1/2">
          <div className="inner-items">
            <h4 className="font-bold uppercase">PNGTREE.COM</h4>
            <ul className="space-y-1 mt-2">
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Contributor Project</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Popular Searches</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Update</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">New Background</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">AI Image Generator</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">AI Remove Background</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Slidesdocs</a></li>
            </ul>
          </div>
        </div>

        {/* Plans & Help */}
        <div className="plan-help w-1/2">
          <div className="plan mb-4">
            <h4 className="font-bold uppercase">PLANS</h4>
            <ul className="space-y-1 mt-2">
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Enterprise Plan</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Individual Plan</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Education Plan</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Enterprise PLUS Plan</a></li>
            </ul>
          </div>
          <div className="help">
            <h4 className="font-bold uppercase">HELP</h4>
            <ul className="space-y-1 mt-2">
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Partnerships</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Affiliate Program</a></li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="legal w-1/2">
          <div className="inner-items">
            <h4 className="font-bold uppercase">LEGAL</h4>
            <ul className="space-y-1 mt-2">
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Term of Service</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Copyrights Infringement Notification</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Cookies Policy</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">License Terms</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Refund Policy</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-green-600">Intellectual Property Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    {/* Bank Card Section */}
      <div className="copy-right !py-10 !px-5 flex flex-wrap flex-col sm:flex-row justify-between gap-4">
        <div>
          <span>©️</span>
          <span className="text-[#666] text-sm">
            2017-2025 Pngtree -All Rights Reserved.
          </span>
          <span className="text-[#666] text-sm">
            Contact Email: info@pngtree.com
          </span>
        </div>
        <div className="flex items-center">
          <img src={bankCard} alt="bankcards" />
        </div>
      </div>
    </>
    
  );
};

export default Footer;
