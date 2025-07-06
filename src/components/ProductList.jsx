import { useCart } from "../Context/CartContext";
import { useEffect, useState } from "react";

export default function ProductList() {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  async function fetchProducts() {
    setLoading(true);
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleIncrease(id) {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }

  function handleDecrease(id) {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  }

  const cardStyle = {
    width: "250px",
    padding: "16px",
    margin: "10px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "12px",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  };

  const priceStyle = {
    fontSize: "16px",
    color: "#ff9a8b",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#ff9a8b",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <>
      <h1>Products</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div style={cardStyle} key={product.id}>
              <img src={product.image} alt={product.title} style={imageStyle} />
              <h2 style={titleStyle}>{product.title}</h2>
              <p style={priceStyle}>₹{product.price}</p>
              <button
                style={buttonStyle}
                onClick={() =>
                  setCart([...cart, { ...product, quantity: quantities[product.id] || 1 }])
                }
              >
                Add to Cart
              </button>
              <br />
              <button onClick={() => handleIncrease(product.id)}>+</button>
              <input
                type="text"
                value={quantities[product.id] || 1}
                readOnly
                style={{ width: "30px", textAlign: "center" }}
              />
              <button onClick={() => handleDecrease(product.id)}>-</button>
            </div>
          ))
        ) : (
          <p>No products found...</p>
        )}
      </div>
    </>
  );
}
