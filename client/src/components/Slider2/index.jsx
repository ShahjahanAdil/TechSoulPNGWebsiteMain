import React from 'react'
import card1 from '../../assets/images/rev1.jpg'
import card2 from '../../assets/images/rev2.jpg'
import card3 from '../../assets/images/rev3.jpg'
import card4 from '../../assets/images/rev4.jpg'
import card5 from '../../assets/images/rev5.jpg'
import card6 from '../../assets/images/rev7.jpg'
import card7 from '../../assets/images/rev8.jpg'
import card9 from '../../assets/images/rev9.jpg'
import card10 from '../../assets/images/rev10.jpg'
import card11 from '../../assets/images/rev11.jpg'
import card12 from '../../assets/images/rev12.jpg'
import card13 from '../../assets/images/rev13.jpg'
import card14 from '../../assets/images/rev14.jpg'
import card15 from '../../assets/images/rev15.jpg'
import card16 from '../../assets/images/rev16.jpg'
import card17 from '../../assets/images/rev17.jpg'
import card18 from '../../assets/images/rev18.jpg'
import card19 from '../../assets/images/rev19.jpg'
import card20 from '../../assets/images/rev20.jpg'
import card21 from '../../assets/images/rev1.jpg'
import card22 from '../../assets/images/rev2.jpg'
import card23 from '../../assets/images/rev3.jpg'
import card24 from '../../assets/images/rev4.jpg'
import card25 from '../../assets/images/rev5.jpg'
import card26 from '../../assets/images/rev7.jpg'
import card27 from '../../assets/images/rev8.jpg'
import card29 from '../../assets/images/rev9.jpg'
import card30 from '../../assets/images/rev10.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Slider2() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000, // <-- smoother animation
        autoplay: true,
        autoplaySpeed: 0, // continuous autoplay
        cssEase: "linear", // makes it smooth and continuous
        slidesToShow: 15,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 10,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 499,
                settings: {
                    slidesToShow: 5,
                },
            },
        ],
    };

    const getTranslateclassName = (index) => {
        const positions = ['translate-y-4', 'translate-y-0', '-translate-y-4', 'translate-y-6', '-translate-y-6']
        return positions[index % positions.length]
    }

    return (
       <>
  <div className="md:text-[30px] text-2xl font-semibold my-9 text-center">
    Join tens of millions of designers worldwide
  </div>

  <section className="relative pb-5 pt-6 overflow-hidden">
    <Slider {...settings}>
      {[card1, card2, card3, card4, card5, card6, card7, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19, card20, card21, card22, card23, card24, card25, card26, card27, card29, card30].map((card, i) => (
        <div key={i} className="flex items-center justify-center h-full mt-10">
          <div className={`w-[80px] h-[200px] flex ${getTranslateclassName(i)} justify-center`}>
            <img
              src={card}
              alt="review"
              className="w-[60px] h-[60px] rounded-[15px] object-cover"
            />
          </div>
        </div>
      ))}
    </Slider>
    <div className='text-center'>
      <button className='bg-[#4EAA76] font-semibold text-white px-6 py-2 rounded-[7px]'>
        Veiw All
      </button>
    </div>

    {/* Responsive Overlays */}
    <div className="slider-left-overlay absolute left-0 top-0 opacity-50 bg-white h-full 
                    w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] pointer-events-none z-10"></div>

    <div className="slider-right-overlay absolute right-0 top-0 opacity-50 bg-white h-full 
                    w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] pointer-events-none z-10"></div>
  </section>
</>

    )
}
