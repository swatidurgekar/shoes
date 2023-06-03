import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  emptyCart: () => {},
});

const CartContextProvider = (props) => {
  const url = "https://crudcrud.com/api/2f1980258af94cf68b99c64cb217968a";
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${url}/cart`);
      res.data.map((item) => {
        setItems(item.product);
      });
    }
    fetchData();
  }, []);

  const addToCart = (product) => {
    setItems((items) => {
      return [...items, product];
    });
  };

  const emptyCart = () => {
    setItems([]);
  };

  const cartcontext = {
    cartItems: items,
    addToCart: addToCart,
    emptyCart: emptyCart,
  };

  return (
    <cartContext.Provider value={cartcontext}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
