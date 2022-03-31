import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../Redux/reducer/Constants/Header";
import { addCart, setProducts } from "../Redux/actions/productActions";
import Breadcrumb from "../Redux/reducer/Constants/Breadcrumb";

const ProductDetails = () => {
	const products = useSelector((state) => state.allProducts.products);
	const [selectedItem, setSelectedItem] = useState("");
	const [productRate, setProductRate] = useState();
	const { title, description, price, category, image } = selectedItem;
	const { state } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		state && fetchProducts();
	}, [state]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const response = await axios
			.get(`http://localhost:3001/products/${state}`)
			.catch((error) => console.log("Error : ", error));

		dispatch(setProducts(response.data));
		setSelectedItem(response.data);
		setProductRate(response.data.rating.rate);
	};

	const addToCart = (product) => {
		dispatch(addCart(product));
	};

	return (
		<>
			<Header />
			<Breadcrumb />
			<div className="p-10">
				<div className=" h-full w-full lg:max-w-full lg:flex bg-gray">
					<div
						className="h-100 lg:h-100 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border"
						title="Mountain"
					>
						<img src={image} alt={title} style={{ height: "4in" }} />
					</div>
					<div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
						<div className="mb-8">
							<div className="text-gray-900 font-bold text-xl mb-2">
								{title}
							</div>
							<div className="text-gray-900 text-base mb-2">
								<b>Catagory: </b>
								{category}
							</div>
							<p className="text-gray-700 text-base">
								<b>Product Description:</b> {description}
							</p>
						</div>
						<div>
							<div className="text-sm flex items-center mb-3">
								<p className="text-gray-900 leading-none" style={{ fontWeight: "600", color: "rgba(191, 34, 34, 1)", fontSize: 30 }}>
									<b>Price : </b>
								</p>
								<p className="text-gray-600" style={{ fontWeight: "600", color: "rgba(191, 34, 34, 1)", fontSize: 30 }}>{price}$</p>
							</div>
							<div className="text-sm flex items-center" >
								<p className="text-gray-900 leading-none" style={{ fontWeight: "600", color: "black", fontSize: 20 }}>
									<b>Rating : </b>
								</p>
								<p className="text-gray-600" style={{ fontWeight: "600", color: "black", fontSize: 20 }}>{productRate}/5</p>
							</div>
						</div>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={() => addToCart(products)}
						>Add to Cart</button>

					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
