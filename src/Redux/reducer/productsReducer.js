import { ActionTypes } from "./Constants/action-types";

const initialState = {
	products: [],
	filterItem: [],
};
const cart = [];

export const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_PRODUCTS:
			return { ...state, products: payload, filterItem: payload };
		case ActionTypes.SEARCH_VALUES:
			return { ...state, filterItem: payload.products };
		default:
			return state;
	}
};

export const handleCart = (state = cart, action) => {
	const product = action.payload;
	console.log(product);
	switch (action.type) {
		case ActionTypes.ADD_CART:
			const exist = state.find((x) => x.id === product.id);
			if (exist) {
				return state.map((x) =>
					x.id === product.id ? { ...x, qty: x.qty + 1 } : x
				);
			} else {
				const product = action.payload;

				return [...state, { ...product, qty: 1 }];
			}

		case ActionTypes.DELETE_CART:
			const exist1 = state.find((x) => x.id === product.id);
			if (exist1.qty === 1) {
				return state.filter((x) => x.id !== exist1.id);
			} else {

				return state.map((x) =>
					x.id === product.id ? { ...x, qty: x.qty - 1 } : x
				);
			}

		default:
			return state;
	}
};