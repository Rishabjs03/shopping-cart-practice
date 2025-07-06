import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartProvider from "./Context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<CartProvider>
		<App />
	</CartProvider>,
);
