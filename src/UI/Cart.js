import "./Cart.css";
import { cartContext } from "../Store/cartContext";
import { useContext } from "react";

const Cart = (props) => {
  const emptyCart = () => {
    cartCtx.emptyCart();
  };

  const cartCtx = useContext(cartContext);
  return (
    <div className="backdrop" onClick={props.onClose}>
      <div className="modal">
        {cartCtx.cartItems.map((item) => {
          return (
            <div>
              <li key={item.name}>
                {item.name} {item.large}
              </li>
            </div>
          );
        })}
        <button onClick={emptyCart}>Place order</button>
      </div>
    </div>
  );
};

export default Cart;
