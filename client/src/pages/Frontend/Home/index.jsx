import React from "react";
import Banner from "../../../Components/Banner";
import CardsSlider from "../../../Components/CardsSlider";
import Cards from "../../../Components/Cards";
import Stat from "../../../Components/Stat";
import Testimonials from "../../../Components/Testimonials";
import Contributors from "../../../Components/Contributors";
import Section2 from "../../../Components/Section2";
import Section3 from "../../../Components/Section3";
import Background from "../../../Components/Background";
import Slider2 from "../../../Components/Slider2";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <CardsSlider />
      <Cards />
      <Section2 />
      <Section3 />
      <Background />
      <Contributors />
      <Slider2 />
      <Testimonials />
      <Stat />
    </div>
  );
}
