import React from "react";
import bg1 from "../../assets/images/bg1.jpg";
import bg2 from "../../assets/images/bg2.jpg";
import bg3 from "../../assets/images/bg3.jpg";
import bg4 from "../../assets/images/bg4.jpg";
import bg5 from "../../assets/images/bg5.jpg";
import bg6 from "../../assets/images/bg6.jpg";

import cbg1 from "../../assets/images/cbg1.jpg";
import cbg2 from "../../assets/images/cbg2.jpg";
import cbg3 from "../../assets/images/cbg3.jpg";
import cbg4 from "../../assets/images/cbg4.jpg";
import cbg5 from "../../assets/images/cbg5.jpg";
import cbg6 from "../../assets/images/cbg6.jpg";

const categories = [
  {
    title: "Great photos for every moment",
    items: [
      { name: "Business", imageCount: "3776", image: bg1 },
      { name: "Beauty", imageCount: "2738", image: bg2 },
      { name: "Technology", imageCount: "2036", image: bg3 },
      { name: "Promotional", imageCount: "8187", image: bg4 },
      { name: "Fantasy", imageCount: "4558", image: bg5 },
      { name: "Tourism", imageCount: "2135", image: bg6 },
    ],
  },
  {
    title: "Best creative background images",
    items: [
      { name: "Sandstone camo", imageCount: "1889", image: cbg1 },
      { name: "Brushed green camo", imageCount: "2372", image: cbg2 },
      { name: "Eid Mubarak", imageCount: "205", image: cbg3 },
      { name: "Red", imageCount: "188547", image: cbg4 },
      { name: "Mother's Day", imageCount: "2709", image: cbg5 },
      { name: "Rustic", imageCount: "832", image: cbg6 },
    ],
  },
];

const Background = () => {
  return (
    <div className="p-6 space-y-10 mainContainer">
      {categories.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="h-40 rounded-xl shadow-md overflow-hidden relative hover:scale-102 transition-all duration-500 ease-in-out "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-2 "  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>
                  <div className="text-lg font-bold">{item.name}</div>
                  <div className="text-sm">{item.imageCount} images</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Background;
