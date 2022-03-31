import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../Redux/reducer/Constants/Breadcrumb'
import Header from '../Redux/reducer/Constants/Header'
import { deleteCart } from '../Redux/actions/productActions';
import { useNavigate } from 'react-router-dom';


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
                        <div className="p-10">
                            <div className="max-w-sm rounded  shadow-lg bg-white">
                                <img className="w-full" src={item.image} alt={item.title} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{item.title}</div>
                                    <p className="text-gray-700 text-base">
                                        {item.description}
                                    </p>
                                    <p className="text-gray-700 text-base">
                                        {item.price}$
                                    </p>
                                </div>
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        +
                                    </button></div>
                                <div className="px-6 pt-4 pb-2">
                                    <button className="inline-block bg-red-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                        onClick={() => handleDeleteButton(item)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>))
                ) : (
                    <div id="main">
                        <div className="fof">
                            <h1>Ooops!! Cart is empty!</h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cart