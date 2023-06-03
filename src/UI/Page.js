import { useContext, useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { cartContext } from "../Store/cartContext";
import axios from "axios";

const Page = () => {
  const url = "https://crudcrud.com/api/2f1980258af94cf68b99c64cb217968a";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${url}/products`);

      setProducts(res.data);
    };
    getData();
  }, []);

  const [showCart, setShowCart] = useState(false);
  const cartCtx = useContext(cartContext);
  const name = useRef();
  const desc = useRef();
  const price = useRef();
  const large = useRef();
  const medium = useRef();
  const small = useRef();

  const showCartFunc = () => {
    setShowCart(true);
  };

  const closeCartFunction = () => {
    setShowCart(false);
  };

  const addToCart = (product) => {
    cartCtx.addToCart(product);
    axios.post(`${url}/cart`, {
      product,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      name: name.current.value,
      desc: desc.current.value,
      price: price.current.value,
      large: large.current.value,
      medium: medium.current.value,
      small: small.current.value,
    };
    setProducts((prevProducts) => {
      return [...prevProducts, obj];
    });
    axios.post(`${url}/products`, {
      ...obj,
    });
  };

  return (
    <div>
      {showCart && <Cart onClose={closeCartFunction} />}
      <nav>
        <button onClick={showCartFunc}>Cart</button>
      </nav>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
        <input ref={name} id="name" type="text" required />
        <br />
        <label htmlFor="desc">Description:</label>
        <input ref={desc} id="desc" type="text" required />
        <br />
        <label htmlFor="price">Price:</label>
        <input ref={price} id="price" type="text" required />
        <br />
        <label htmlFor="size">Size: </label>
        <label htmlFor="large">L </label>
        <input ref={large} id="large" type="text" size="2" required />
        <label htmlFor="medium">M </label>
        <input ref={medium} id="medium" type="text" size="2" required />
        <label htmlFor="small">S </label>
        <input ref={small} id="small" type="text" size="2" required />
        <br />
        <button type="submit">Add Product</button>
      </form>
      {products.map((product) => {
        return (
          <li key={product.name}>
            {`${product.name} ${product.desc}`}
            <button
              onClick={() => addToCart(product)}
            >{`Buy large (${product.large})`}</button>
            <button>{`Buy medium (${product.medium})`}</button>
            <button>{`Buy small (${product.small})`}</button>
          </li>
        );
      })}
    </div>
  );
};

export default Page;
