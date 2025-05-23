import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CardSlider.css';
import card1 from "../../assets/images/burger.png";
import card2 from "../../assets/images/car.avif";
import card3 from "../../assets/images/flower.jpg";
import card4 from "../../assets/images/travel.jpg";
import card5 from "../../assets/images/eid.jpg";
import card6 from "../../assets/images/fathers day.jpg";

const images = [
  { src: card1, label: "PNG Images" },
  { src: card2, label: "WEBP Images" },
  { src: card3, label: "JPG Images" },
  { src: card4, label: "JPEG Images" },
  { src: card5, label: "Occasional Images" },
  { src: card6, label: "Fathers Day" },
];
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 bg-[#333] p-2 rounded-full shadow cursor-pointer hover:bg-[#4eaa76cb]"
      onClick={onClick}
    >
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}


function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 bg-[#333] p-2 rounded-full shadow cursor-pointer hover:bg-[#4eaa76cb]"
      onClick={onClick}
    >
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.707 14.707a1 1 0 010-1.414L9.414 10l3.293-3.293a1 1 0 10-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}



function CardsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    
    ],
  };

  return (
    <>
    
    <div className="relative px-8">
  <Slider {...settings} >
  {images.map((img, index) => (
    <div key={index} className="px-4">
      <div
        className="relative h-64 bg-cover bg-center bg-no-repeat rounded-md transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer group"
        style={{ backgroundImage: `url(${img.src})` }}
      >
        <div className="absolute inset-0 bg-[#00000031] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full h-[60px] flex items-center justify-center text-black bg-transparent group-hover:text-white transition-all duration-300 z-20">
          {img.label}
        </div>

        <div className="absolute top-2 left-2 text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          3,120 images
        </div>

        <div className="absolute top-2 right-2 text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          abc
        </div>
      </div>
    </div>
  ))}
</Slider>

    </div>
 
</>
  );
}

export default CardsSlider;
