import React from 'react'
import Navbar from '../../../Components/Navbar'
import Footer from '../../../Components/Footer'
import Slider2 from '../../../Components/Slider2'
import Stat from '../../../Components/Stat'
import Contributors from '../../../Components/Contributors'
import AboutBanner from '../../../Components/AboutBanner/Index'

export default function About() {
    return (
        <>
            {/* <Navbar /> */}
            <AboutBanner />
            <Contributors />
            <Stat />
            <Slider2 />
            {/* <Footer /> */}
        </>
    )
}
