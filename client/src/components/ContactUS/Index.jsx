import React, { useState } from "react";
import "./contact.css";
import contactBG from "../../assets/images/contactbg.jpeg";
import { IoIosArrowDown } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import axios from 'axios'
import ButtonLoader from "../ButtonLoader";

const initialState = { topic: "", username: "", email: "", message: "" }

const ContactUs = () => {

    const [state, setState] = useState(initialState)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSelect = (value) => {
        setState(prev => ({ ...prev, topic: value }))
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { topic, username, email, message } = state
        if (!topic || !username || !email || !message) {
            return window.toastify("Please fill all fields!", "info")
        }

        axios.post(`${import.meta.env.VITE_HOST}/frontend/contact/send-mail`, state)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setState(initialState);
                    window.toastify(data.message, "success")
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
                window.toastify("Something went wrong while sending your message. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div>
            <div
                className="top-sec w-full flex bg-no-repeat bg-center bg-cover justify-center min-h-[250px]"
                style={{ backgroundImage: `url(${contactBG})` }}
            >
                <div className="inner-txt flex flex-col justify-center items-center">
                    <div>
                        <h1 className="font-bold text-center text-[24px] md:text-[36px] !text-white">
                            How can we help you?
                        </h1>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="flex justify-center bg-gray-50 !px-5 !py-14">
                <div className="w-full max-w-[800px]">
                    <div>
                        <p className="font-bold text-[#333]">Need Help?</p>
                        <h2 className="text-[30px] font-bold !mb-8 text-[#333]">
                            Contact Us
                        </h2>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/*  Selector */}
                        <div className="relative">
                            {/* Arrow Icon */}
                            <div
                                className={`absolute right-5 top-1 h-full flex justify-center items-center text-xl !text-[#848484] cursor-pointer transition-transform duration-300 ${isOpen && "rotate-180"}`}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <IoIosArrowDown />
                            </div>

                            {/* Dropdown Menu */}
                            <div
                                className={`selector-show absolute flex flex-col gap-4 w-full min-h-[50%] bg-[#fefefe] shadow-lg rounded-[8px] top-[80px] transition-all duration-300 ${isOpen && "active"}`}
                            >
                                <div
                                    className="cursor-pointer hover:bg-[#CCCCCC]"
                                    onClick={() => handleSelect("Login/Password/Account")}
                                >
                                    <p className="!p-4 !text-[14px]">Login/Password/Account</p>
                                </div>

                                <div
                                    className="cursor-pointer hover:bg-[#CCCCCC]"
                                    onClick={() => handleSelect("Download/Functional issue")}
                                >
                                    <p className="!p-4 !text-[14px]">Download/Functional issue</p>
                                </div>

                                <div
                                    className="cursor-pointer hover:bg-[#CCCCCC]"
                                    onClick={() => handleSelect("File content/format issue")}
                                >
                                    <p className="!p-4 !text-[14px]">File content/format issue</p>
                                </div>

                                <div
                                    className="cursor-pointer hover:bg-[#CCCCCC]"
                                    onClick={() => handleSelect("Others")}
                                >
                                    <p className="!p-4 !text-[14px]">Others</p>
                                </div>
                            </div>

                            {/* Input Field */}
                            <input
                                type="text"
                                name="topic"
                                value={state.topic}
                                placeholder="Choose your topic"
                                className="w-full !p-3 sm:!p-5 border-2 border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
                                readOnly
                                onClick={() => setIsOpen(true)}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            name="username"
                            value={state.username}
                            placeholder="Enter your username "
                            className="w-[100%] !p-3 sm:!p-5 border-2 border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleChange}
                        />
                        
                        {/* Email Input */}
                        <input
                            type="email"
                            name="email"
                            value={state.email}
                            placeholder="Enter your email"
                            className="w-[100%] !p-3 sm:!p-5 border-2 border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleChange}
                        />

                        {/* Textarea */}
                        <textarea
                            placeholder="Enter your message"
                            name="message"
                            value={state.message}
                            rows="8"
                            className="w-[100%] !p-3 sm:!p-5 border-2 resize-none border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleChange}
                        ></textarea>

                        <p className="text-[#666] text-[14px] !py-2">
                            In order to help you solve the problem faster, we hope you can
                            describe the problem in as much detail as possible. For example,
                            you can give examples of authorization issues, or copy the pop-up
                            prompt that appears on the instruction page. Thank you for your
                            cooperation.
                        </p>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex gap-2 items-center !mt-4 w-full sm:w-fit bg-[#5ABC84] text-white !px-6 !py-3 font-bold rounded-full cursor-pointer hover:bg-[#5abc84c9] transition"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {
                                    loading ?
                                        <>Sending Message <ButtonLoader /></>
                                        :
                                        <>Send Message <LuSend /></>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;