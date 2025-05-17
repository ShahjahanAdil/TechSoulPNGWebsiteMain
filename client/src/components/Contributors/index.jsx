import React from 'react';
import c1 from '../../assets/images/c-1.png';
import c2 from '../../assets/images/c-2.png';
import c3 from '../../assets/images/c-3.png';
import c4 from '../../assets/images/c-4.png';
import c5 from '../../assets/images/c-6.png';
import c6 from '../../assets/images/c-7.png';
import c7 from '../../assets/images/c-5.png';

const contributor = [
  {
    name: 'Robert Baygulov',
    country: 'Britain',
    image: c1,
    position: 'top-[120px] right-[250px]',
    withCard: true,
  },
  {
    name: 'Andrew Green',
    country: 'Kazakhstan',
    image: c2,
    position: 'top-[150px] left-[340px]',
    withCard: true,
  },
  {
    name: 'Tulery Barden',
    country: 'Africa',
    image: c3,
    position: 'top-[300px] left-[100px]',
    withCard: true,
  },
  {
    image: c4,
    position: 'top-[0px] left-[60px]',
    withCard: false,
  },
  {
    image: c5,
    position: 'top-[10px] left-[260px]',
    withCard: false,
  },
  {
    image: c6,
    position: 'top-[350px] left-[360px]',
    withCard: false,
  },
  {
    image: c7,
    position: 'top-[180px] left-[20px]',
    withCard: false,
  },
];

export default function Contributors() {
  return (
    <section className="relative mt-12 py-10 px-6 w-full rounded-3xl bg-[#E6F5ED] overflow-hidden z-[-2]">
      {/* SVG Background for the whole section */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1521"
        height="532"
        fill="none"
        viewBox="0 0 1521 532"
        className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none "
        preserveAspectRatio="xMidYMid slice"
      >
        <mask
          id="i1osnt6na"
          width="1521"
          height="532"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <rect
            width="1520"
            height="531"
            x="0.824"
            y="0.871"
            fill="#AEDDC8"
            fillOpacity="0.15"
            rx="32"
          />
        </mask>
        <g mask="url(#i1osnt6na)">
          <path
            stroke="#AEDDC8"
            strokeOpacity="0.6"
            strokeWidth="80"
            d="M-40.45 257.002C68.498 190.208 353.333 54.657 468.688 134.81c144.194 100.19-33.645 465.655 0 533.967 33.645 68.311 275.17 576.093 753.413-738.906"
          />
        </g>
      </svg>


      {/* Section Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-6 md:ps-20">
          <h2 className="md:text-5xl text-2xl font-bold text-gray-800">
            Contributors around the world
          </h2>
          <p className="text-gray-600 text-sm ">
            Become a pngtree contributor and earn cash uploading your copyrighted images and designs.
          </p>
          <p className="md:text-4xl ext-2xl font-bold text-gray-800">
            147,079 <div className="md:text-2xl font-medium">contributors</div>
          </p>
          <button className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition">
            Join us →
          </button>
        </div>

        {/* Right Side: Avatar Canvas */}
        <div className="relative w-full min-h-[440px] sm:h-[440px] h-auto">
          {contributor.map((item, idx) => (
            <div key={idx} className={`absolute ${item.position}`}>
              {item.withCard ? (
                <div className="md:flex items-center gap-2 bg-white shadow-lg px-4 py-4 rounded-xl max-w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover bg-[#F5C8BA]"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500">{item.country}</p>
                  </div>
                </div>
              ) : (
                <img
                  src={item.image}
                  alt="avatar"
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl object-cover bg-[#C8BAFE] border-2 border-white shadow"
                />
              )}
            </div>
          ))}

          {/* Floating Dots */}
          <span className="absolute top-[40%] left-[25%] w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="absolute top-[5%] left-[55%] w-3 h-3 bg-orange-400 rounded-full"></span>
          <span className="absolute bottom-[5%] left-[45%] w-3 h-3 bg-purple-300 rounded-full"></span>
        </div>

      </div>
    </section>
  );
}
