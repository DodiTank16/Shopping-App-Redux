import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import ProductListing from "./Components/productListing";
import ProductDetails from "./Components/ProductDetails";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Cart from "./Components/Cart";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/HomePage" element={<HomePage />} />
				<Route path="/ProductListing" element={<ProductListing />} />
				<Route path="/ProductListing/ProductDetails/:id" element={<ProductDetails />} />
				<Route path="/Cart" element={<Cart />} />
				<Route path="/AboutUs" element={<AboutUs />} />
				<Route path="/ContactUs" element={<ContactUs />} />
			</Routes>
		</Router>
	);
}

export default App;
