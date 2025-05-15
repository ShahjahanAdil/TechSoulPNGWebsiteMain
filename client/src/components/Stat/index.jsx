import React from 'react'
import { FaUserPlus, FaUser, FaDownload, FaSyncAlt } from "react-icons/fa";

export default function Stat() {
     const  data = [
        {
            icon: <FaUserPlus className="text-green-500 text-3xl" />,
            value: "100,000,000+",
            label: "Registered users",
          },
          {
            icon: <FaUser className="text-green-500 text-3xl" />,
            value: "147,079",
            label: "Authors",
          },
          {
            icon: <FaDownload className="text-green-500 text-3xl" />,
            value: "360,000,000+",
            label: "Total downloads",
          },
          {
            icon: <FaSyncAlt className="text-green-500 text-3xl" />,
            value: "10,000+",
            label: "New updates",
          },
        ];     
          return (
            <div className="text-center py-12 px-4">
              <h2 className="md:text-5xl text-2xl  font-bold text-gray-900 mb-10">
                The largest assets site of PNG images on <br /> the Internet
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {data.map((item, index) => (
                  <div key={index} className="flex flex-col text-3xl items-center">
                    <div className="bg-green-100 p-4 rounded-xl mb-2">{item.icon}</div>
                    <p className="md:text-3xl text-xl font-bold my-2">{item.value}</p>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        
}
