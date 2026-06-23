import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
const CartContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:1000";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0)
  const [grandTotalPrice,setGrandTotal] = useState(0)
  const token = localStorage.getItem("token");

  const getCart = async () => {
    try {
      const result = await axios.get(`${API_URL}/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(result.data.data.rows);
      setCartCount(result.data.data.count);
        setTotalPrice(result.data.data.totalPrice);
setGrandTotal(result.data.data.grandTotalPrice)
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (slug, quantity) => {
    try {
      const result = await axios.post(
        `${API_URL}/api/v1/cart`,
        {
          slug,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("cart added",result.data)
          toast.success("Product added to cart!");

      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        getCart,
        totalPrice,
        grandTotalPrice,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);