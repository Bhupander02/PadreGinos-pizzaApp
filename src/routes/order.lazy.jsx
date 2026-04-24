import { useContext, useState, useEffect } from "react";
import Pizza from "../components/Pizza";
import { createLazyFileRoute } from "@tanstack/react-router";
import Cart from "../components/Cart";
import { CartContext } from "../contexts";
import toast from "react-hot-toast";
import axios from "axios";
import CustomSelect from "../components/CustomSelect"; // Import custom select

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

// Use environment variable or default to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  async function checkout() {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setCheckingOut(true);
    try {
      const response = await axios.post(`${API_URL}/api/order`, { cart });

      if (response.data.success) {
        toast.success(`Order placed! Order #${response.data.orderNumber}`);
        setCart([]);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setCheckingOut(false);
    }
  }

  function removeItem(index) {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    toast.success("Item removed from cart");
  }

  let price, selectedPizza;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    try {
      const response = await axios.get(`${API_URL}/api/pizzas`);
      setPizzaTypes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch pizzas:", error);
      toast.error("Failed to load pizzas");
      setLoading(false);
    }
  }

  function addToCart(e) {
    e.preventDefault();
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
    toast.success(`${selectedPizza.name} (${pizzaSize}) added to cart!`);
  }

  // Convert pizzaTypes to options format for CustomSelect
  const pizzaOptions = pizzaTypes.map((pizza) => ({
    value: pizza.id,
    label: pizza.name,
  }));

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <h3>Loading delicious pizzas...</h3>
      </div>
    );
  }

  return (
    <div className="order">
      <h2>Create Your Order</h2>
      <form onSubmit={addToCart}>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="pizza-type">Choose Your Pizza</label>
            {/* REPLACED: Native select with CustomSelect */}
            <CustomSelect
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
              options={pizzaOptions}
              name="pizza-type"
              id="pizza-type"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pizza-size">Select Size</label>
            <div className="size-options">
              <div className="size-option">
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </div>
              <div className="size-option">
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </div>
              <div className="size-option">
                <input
                  onChange={(e) => setPizzaSize(e.target.value)}
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </div>
            </div>
          </div>

          <button type="submit">Add to Cart</button>
        </div>

        <div className="order-pizza">
          <Pizza
            name={selectedPizza.name}
            description={selectedPizza.description}
            image={selectedPizza.image}
          />
          <p>{price}</p>
        </div>
      </form>

      <Cart
        checkout={checkout}
        cart={cart}
        removeItem={removeItem}
        isCheckingOut={checkingOut}
      />
    </div>
  );
}
