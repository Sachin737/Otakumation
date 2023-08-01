import axios from "axios";
import { useContext } from "react";
import { useEffect, useState, createContext } from "react";
import { AuthContext } from "./auth";

const CartContext = createContext();

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

  const getCartProduct = async () => {
    try {
      const headers = {
        authorization: auth?.token,
      };
      // //console.log("fkk", headers);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-cart`,
        { headers }
      );

      setCart(data?.cart);
      localStorage.setItem("cart", JSON.stringify(data?.cart));
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    getCartProduct();
  }, [auth,setCart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
