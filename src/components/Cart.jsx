import { useCart } from "../Context/CartContext";

export default function Cart() {
  const { cart, setCart } = useCart();

  function handleDelete(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function handleIncrease(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function handleDecrease(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} — ₹{item.quantity * item.price}
              <span>
                <button onClick={() => handleIncrease(item.id)}>+</button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  style={{ width: "30px", textAlign: "center" }}
                />
                <button onClick={() => handleDecrease(item.id)}>-</button>
                <button onClick={() => handleDelete(item.id)}>Remove</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
