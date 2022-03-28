import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../Redux/actions/productActions";

const Product = () => {
	const products = useSelector((state) => state.allProducts.products);
	const dispatch = useDispatch();
	const [flag, setFlag] = React.useState();
	const [data, setData] = React.useState(products);
	const [defaultValue, setDefaultValue] = React.useState(products);
	const navigate = useNavigate();

	const handleSort = (data) => {
		console.log(data);
		const sortedData = data.sort((first, second) => {
			var titleOfA = first.title.toUpperCase();
			var titleOfB = second.title.toUpperCase();
			if (titleOfA < titleOfB) {
				return -1;
			}
			if (titleOfA > titleOfB) {
				return 1;
			}
			return 0;
		});
		dispatch(setProducts(sortedData));
		// setData(sortedData);
		setFlag(!flag);
	};
	return (
		<>
			<div className="float-right mr-5">
				<button
					className="mt-3 bg-black hover:bg-white text-green-700 font-semibold hover:text-black py-2 px-4 rounded flex .content-end"
					onClick={() => handleSort(data)}
				>
					Sort
				</button>
			</div>
			<div className="container p-10 h-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{/* Cards */}
				{products &&
					products.map((item) => (
						<div key={item.id}>
							<div className="rounded bg-white">
								<img className="w-full" src={item.image} alt={item.title} />
								<div className="px-6 py-4">
									<div className="font-bold text-xl mb-2">{item.title}</div>
									{/* <p className="text-gray-700 text-base">{item.description}</p> */}
								</div>
								<div className="px-6 pt-4 pb-2">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										onClick={() =>
											navigate(`/ProductDetails/${item.id}`, {
												state: item.id,
											})
										}
									>
										Details
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Product;
