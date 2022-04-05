import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../Redux/reducer/Constants/Breadcrumb'
import Header from '../Redux/reducer/Constants/Header'
import { deleteCart } from '../Redux/actions/productActions';
import { useNavigate } from 'react-router-dom';
import EmptyCart from "../Empty Cart.png"


const Cart = () => {
    const products = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("LoginToken");

    useEffect(() => {
        if (!token) navigate("/");
        document.title = "HomePage";
    }, []);

    const handleDeleteButton = (products) => {
        dispatch(deleteCart(products));
    };

    return (
        <>
            <Header />
            <Breadcrumb />
            <div className='flex'>
                {products && products.length ? (
                    products.map((item) => (
                        <div className=" flex p-10">
                            <div className="max-w-sm rounded  shadow-lg bg-white">
                                <img className="w-50 ml-24" src={item.image} alt={item.title} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{item.title}</div>
                                    <p className="text-gray-700 text-base">
                                        {item.description}
                                    </p>
                                    <p className="text-gray-700 text-basemt-5" style={{ fontWeight: "600", color: "rgba(191, 34, 34, 1)", fontSize: 30 }}>
                                        Price: {item.price}$
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <button className="inline-block bg-red-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                        onClick={() => handleDeleteButton(item)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>))
                ) : (
                    <div className='flex justify-center items-center h-96 '>
                        {/* <div className='mt-5 ml-60 pl-60'> */}
                        <div
                            className="flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                            title="Mountain"
                        >
                            <img src={EmptyCart} alt='Cart is Empty' className='pl-20' />

                            <p
                                className='text-white text-2xl h-fit'
                            >Your Cart is Empty..!</p>
                            <p>Looks like you have not added anyting to your cart.Go ahead and explore top items. </p>
                        </div>
                    </div>
                    // </div>
                )
                }
            </div >
        </>
    )
}

export default Cart