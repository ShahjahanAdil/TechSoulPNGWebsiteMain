
import React from 'react';
import test1 from '../../assets/images/test 1.png'
import test2 from '../../assets/images/test 2.png'
import test3 from '../../assets/images/test 3.png'
import { TiStarFullOutline } from "react-icons/ti";

const Testimonials = () => {
  return (
    <div className="bg-green-50 p-8 ">
      <h2 className="md:text-[35px] text-xl font-bold text-center mb-8">
        Find out why pngtree is trusted by users
      </h2>

      <div className="flex flex-col lg:flex-row items-start gap-12 mainContainer">

        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {/* User 1 */}
          <div className="hover:bg-white rounded-xl hover:shadow cursor-pointer p-2 transition-all duration-500 flex items-center gap-4">
           <div className="img">
           <img src={test1} alt="Asikur Rahman" className="w-16 h-16 rounded-full" />
           </div>
            <div>
              <h4 className="font-bold text-lg">Asikur Rahman</h4>
              <p className="text-sm text-gray-600">Intermediate designer</p>
            </div>
          </div>

          {/* User 2 */}
          <div className="hover:bg-white rounded-xl hover:shadow cursor-pointer p-2 transition-all duration-500 flex items-center gap-4">
          <div className="img">
          <img src={test2} alt="Asikur Rahman" className="w-16 h-16 rounded-full" />
           </div>
            <div>
              <h4 className="font-bold">Want</h4>
              <p className="text-sm text-gray-600">Senior designer + Illustrator</p>
            </div>
          </div>

          {/* User 3 */}
          <div className="hover:bg-white rounded-xl hover:shadow cursor-pointer p-2 transition-all duration-500 flex items-center gap-4">
          <div className="img">
          <img src={test3} alt="Asikur Rahman" className="w-16 h-16 rounded-full" />
           </div>
            <div>
              <h4 className="font-bold">Irene Adler</h4>
              <p className="text-sm text-gray-600">UI designer + Illustrator</p>
            </div>
          </div>

         
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 mt-3">
          <blockquote className="text-[30px] font-semibold mb-2">
            “I recommend pngtree to anyone who…”
          </blockquote>
          <p className="text-gray-700 text-sm mb-4">
            Pngtree is a PNG stock images market but also you can find lot of interesting Templates and Backgrounds.
            I have been using the site for more than 3 years now. The staff are nice and reply in time.
            The Graphics are good enough and you can almost find anything you looking for.
            That said, I recommend PngTree For Anyone who's looking for Stock Graphics especially with transparent background.
            They know what they are doing and it's even FREE to preview and USE PNG.
          </p>
          <div className="flex gap-1 text-yellow-400 text-xl">
          <TiStarFullOutline className=' bg-[#FFEECC] p-1 rounded-[5px]' /><TiStarFullOutline className=' bg-[#FFEECC] p-1 rounded-[5px]' /><TiStarFullOutline className=' bg-[#FFEECC] p-1 rounded-[5px]' /><TiStarFullOutline className=' bg-[#FFEECC] p-1 rounded-[5px]' /><TiStarFullOutline className=' bg-[#FFEECC] p-1 rounded-[5px]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
