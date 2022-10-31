import "./CheckoutItem.scss";
import {addItemToCart,removeItemFromCart,clearItemFromCart} from '../../store/cart/cart.actions'
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

export const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const cleartItemHandler = () => {
    dispatch(clearItemFromCart(cartItems,cartItem));
  };
  return (
    <>
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={name} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={()=> dispatch(removeItemFromCart(cartItems,cartItem))}>&#10094;</div>
          {quantity}
          <div className="arrow" onClick={() => dispatch(addItemToCart(cartItems,cartItem))}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={cleartItemHandler}>
          &#10005;
        </div>
      </div>
    </>
  );
};
