import React from 'react'
import { RiFireFill } from "react-icons/ri";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import card1 from '../../assets/images/s5.png'
import card2 from '../../assets/images/s2.png'
import card3 from '../../assets/images/s3.png'
import card4 from '../../assets/images/s4.png'
import card5 from '../../assets/images/s5.png'


export default function CardsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <>
      <div className="text-start font-bold ms-5 text-2xl md:text-4xl text-[#000]">
        Marketing Calendar
      </div>

      <div className="my-8 px-3 md:px-8">
        <Slider {...settings}>
          {[
            {
              title: "International Nurses...",
              date: "12 May 2025",
              bg: "bg-[#FFECEC]",
              border: "border-[#FFB2B2]",
              img: card1
            },
            {
              title: "Free Ai templates",
              date: "Design work More Efficiently",
              bg: "bg-[#FFECEC]",
              border: "border-[#FFB2B2]",
              img: card2

            },
            {
              title: "Mother's day",
              date: "12 May 2025",
              bg: "bg-[#FFECEC]",
              border: "border-[#FFB2B2]",
              img: card3

            },
            {
              title: "Ascension Day",
              date: "29 May 2025",
              bg: "bg-[#FFECEC]",
              border: "border-[#FFB2B2]",
              img: card4

            },
            {
              title: "Islamic pilgrimage",
              date: "24 June 2025",
              bg: "bg-[#EBFBF0]",
              border: "border-[#CDEBDA]",
              img: card5

            }
          ].map((card, index) => (
            <div key={index} className="px-2 ">
              <div className={`w-full rounded-2xl ${card.bg} overflow-hidden sm:py-[auto] sm:px-[auto] py-4 px-6 border-t-4 ${card.border}`}>
                <div className="text-[16px] md:text-2xl font-semibold">
                  {card.title}
                </div>
                <span className='text-gray-400 text-sm block mt-2'>
                  {card.date}
                </span>
                <div className="flex justify-between mt-4 text-red-700 text-lg">
                  <div className="flex md:gap-1 sm:gap-auto items-center">
                    <RiFireFill />
                    <RiFireFill />
                    <RiFireFill />
                    <RiFireFill />
                    <RiFireFill />
                  </div>
                  <div className="w-[70px] h-[70px] sm:h-[auto] sm:w-[auto] rounded-3xl">
                    <img src={card.img} alt="..." className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
