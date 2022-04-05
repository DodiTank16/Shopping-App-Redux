import { ActionTypes } from "../reducer/Constants/action-types";

export const setProducts = (products) => {
	return {
		type: ActionTypes.SET_PRODUCTS,
		payload: products,
	};
};

export const searchProduct = (products, search) => {
	return {
		type: ActionTypes.SEARCH_VALUES,
		payload: {
			products: search === "" ? products : products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
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
