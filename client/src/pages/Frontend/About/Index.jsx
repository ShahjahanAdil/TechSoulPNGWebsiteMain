import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Slider2 from '../../../components/Slider2'
import Stat from '../../../components/Stat'
import Contributors from '../../../components/Contributors'
import AboutBanner from '../../../components/AboutBanner/index'

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
