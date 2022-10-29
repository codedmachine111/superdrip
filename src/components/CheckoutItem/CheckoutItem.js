import "./CheckoutItem.scss";
import { CartContext } from "../../App";
import { useContext } from "react";

export const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const cleartItemHandler = () => {
    clearItemFromCart(cartItem);
  };
  return (
    <>
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={name} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={()=> removeItemFromCart(cartItem)}>&#10094;</div>
          {quantity}
          <div className="arrow" onClick={() => addItemToCart(cartItem)}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={cleartItemHandler}>
          &#10005;
        </div>
      </div>
    </>
  );
};
