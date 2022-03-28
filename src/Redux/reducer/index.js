import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";

const reducer = combineReducers({
	allProducts: productsReducer,
});

export default reducer;
