import React from "react";
import contactBG from "../../assets/images/contactbg.jpeg";
const ContactUs = () => {
  return (
    <div>
      <div
        className="top-sec w-full flex justify-center min-h-[250px]"
        style={{
          backgroundImage: `url(${contactBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="inner-txt flex flex-col justify-center items-center">
          <div>
            <h1 className="font-bold text-center text-[24px] md:text-[36px] text-white">
              How can we help you?
            </h1>
          </div>
          {/* <div>
                <input type="text" className="wi" />
            </div>
            <div>bottom</div> */}
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
          <form className="flex flex-col gap-4">
            {/*  Input */}
            <input
              type="text"
              placeholder="Your "
              className="w-[100%] !p-3 sm:!p-5 border-2 border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Your Email"
              className="w-[100%] !p-3 sm:!p-5 border-2 border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Textarea */}
            <textarea
              placeholder="Your Message"
              rows="8"
              className="w-[100%] !p-3 sm:!p-5 border-2 resize-none border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="!mt-4 w-full sm:w-fit bg-[#5ABC84] text-white !px-6 !py-3 font-bold rounded-full cursor-pointer hover:bg-[#5abc84c9] transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;