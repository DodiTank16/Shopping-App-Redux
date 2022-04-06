import { ActionTypes } from "../reducer/Constants/action-types";

export const setProducts = (products) => {
	return {
		type: ActionTypes.SET_PRODUCTS,
		payload: products,
	};
};

export const searchProduct = (products, search) => {
	console.log(search === "" ? products : products.filter((item) => item.title.toLowerCase().includes(search.trimStart().toLowerCase())));
	return {
		type: ActionTypes.SEARCH_VALUES,
		payload: {
			products: search === "" ? products : products.filter((item) => item.title.toLowerCase().includes(search.trimStart().toLowerCase()))
		}
	};
};

export const removeSelectedProduct = () => {
	return {
		type: ActionTypes.REMOVE_SELECTED_PRODUCT,
	}
}

export const addCart = (products) => {
	console.log(products);
	return {
		type: ActionTypes.ADD_CART,
		payload: products
	}
}

export const deleteCart = (products) => {
	return {
		type: ActionTypes.DELETE_CART,
		payload: products
	}
}

export const filterByCategory = (filterData, data) => {
	return {
		type: ActionTypes.FILTER_BY_CATEGORY,
		payload: {
			products: data.filter((item) => filterData.includes(item.category)),
		},
	};
};
