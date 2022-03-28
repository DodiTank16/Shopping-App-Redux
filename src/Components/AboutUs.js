import React from 'react'
import Breadcrumb from '../Redux/reducer/Constants/Breadcrumb'
import Header from '../Redux/reducer/Constants/Header'

const AboutUs = () => {
    return (
        <>
            <Header />
            <Breadcrumb />

            AboutUs
            <div>
                <img src={'../Avtar.jpg'} alt={"Avtar"} style={{ height: "4in" }} />
            </div>
        </>
    )
}

export default AboutUs