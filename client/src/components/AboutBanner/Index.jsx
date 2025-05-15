import React from 'react';
import bg from '../../assets/images/aboutBanner.png';
import bg2 from '../../assets/images/gridImage.png';

export default function AboutBanner() {
  return (
    <>
      {/* Heading */}
      <div className="text-2xl md:text-5xl text-center py-5 font-bold">
        Love png love design
      </div>

      {/* Description Text */}
      <div className=" md:px-[150px] px-[20px] py-5">
        <p className="text-center">
          Pngtree has tens of millions of PNG images and other graphic resources for everyone to download.
          Our aim is to build a largest free PNG image platform in the world, serve for all the professional
          designer and people who have design skills. Helping users save time and improving their projects
          efficiently is our duty.
        </p>
      </div>

      {/* Banner Section */}
      <div className="relative w-full h-[300px] mb-[50px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
        />

        {/* SVG Shape */}
        <svg
          className="absolute bottom-0 w-full h-auto -z-10"
          viewBox="0 0 1920 234"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1920 63.7385C1863.86 28.6312 1788.98 0.281107 1710 0.28125C1676.71 0.281311 1653.95 4.74154 1633.41 13.5872C1614.73 21.6313 1598.08 33.2465 1577.38 47.6948L1577.34 47.7187C1575.54 48.9768 1573.71 50.2564 1571.84 51.5569C1525.09 84.1007 1453.79 131.878 1290.27 192.669C1208.86 222.932 1149.95 227.966 1103.15 218.623C1056.37 209.285 1020.98 185.451 986.733 156.513C975.886 147.349 965.156 137.66 954.224 127.789C896.243 75.4361 832.585 17.9575 715.857 6.42606C647.021 -0.374243 594.81 4.38804 552.056 15.6233C509.298 26.8593 476.278 44.4991 445.855 63.0566C437.933 67.8887 430.195 72.7746 422.511 77.6267L422.509 77.6278C371.195 110.029 322.255 140.931 236.745 144.348C107.609 149.51 32.9712 101.521 0 64.2461V80.235C38.6052 118.329 114.68 160.236 237.184 155.34C325.781 151.799 377.117 119.348 428.538 86.8431L428.54 86.8419L428.54 86.8415C436.179 82.0131 443.819 77.1836 451.583 72.4474C481.589 54.1447 513.567 37.1109 554.852 26.2621C596.139 15.4124 647.013 10.6785 714.776 17.3728C827.645 28.5231 888.501 83.3886 946.391 135.58L946.392 135.581C957.467 145.565 968.433 155.452 979.633 164.915C1014.45 194.329 1051.54 219.538 1101 229.41C1150.43 239.278 1211.49 233.691 1294.1 202.979C1458.62 141.819 1530.73 93.5748 1578.12 60.5851C1579.93 59.329 1581.69 58.0981 1583.42 56.8922C1604.43 42.2381 1620.15 31.2705 1637.76 23.6901C1656.58 15.5826 1677.79 11.2813 1710 11.2812C1787.47 11.2811 1861.28 39.515 1916.34 74.4339C1917.57 75.2135 1918.79 75.9962 1920 76.7818V63.7385Z"
            fill="#E5F4E9"
          />
        </svg>

        {/* Grid Overlay Image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center md:px-[120px] pointer-events-none">
          <img
            src={bg2}
            alt="Grid overlay"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </div>
    </>
  );
}
