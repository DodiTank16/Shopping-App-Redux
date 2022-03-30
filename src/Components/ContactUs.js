import React from 'react'
import Breadcrumb from '../Redux/reducer/Constants/Breadcrumb'
import Header from '../Redux/reducer/Constants/Header'
import Building from "../BuildingVector.jpg"


const ContactUs = () => {
    return (
        <>
            <Header />
            <Breadcrumb />
            <div className='flex'>


                <div className='mt-5 mr-2' style={{ width: "4in" }} >
                    <img src={Building} alt={"Avtar"} style={{ height: "4in" }} />
                </div>
                <div className='mt-5 bg-white w-100'>
                    <div className=" text-gray-900 font-bold text-xl mb-2 pt-2 pl-3">Dodi Tank <span className='text-gray-900 text-base mb-2'> (React Intern) </span></div>
                    <div>
                        <label class="text-black font-dark ml-3">E-mail Address:</label>
                        <input type='text' value={"DodiTank@gmail.com"} label="Hello" class="w-50 mt-2 mb-6 ml-4 px-4 py-2 border rounded-lg text-lg text-gray-700 focus:outline-none " readOnly />
                    </div>
                    <div>
                        <label class="text-black font-dark ml-3">Company Name:</label>
                        <input type='text' value={"Drc Systems Pvt. Ltd."} label="Hello" class="w-50 mt-2 mb-6 ml-3 px-4 py-2 border border-black rounded-lg text-lg text-gray-700 focus:outline-none " readOnly />
                    </div>
                    <div>
                        <label class="text-black font-dark ml-3">Contact Number:</label>
                        <input type='text' value={"98*8*7*007"} label="Hello" class="w-50 mt-2 mb-6 ml-2 px-4 py-2 border rounded-lg text-lg text-gray-700 focus:outline-none " readOnly />
                    </div>
                    <div>
                        <label class="text-black font-dark ml-3">Address:</label>
                        <input type='text' value={"Gift City, Gandhinager, Gujarat, 382355"} label="Hello" class="w-50 mt-2 mb-6 ml-10 px-4 py-2 border rounded-lg text-lg text-gray-700 focus:outline-none " readOnly />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs