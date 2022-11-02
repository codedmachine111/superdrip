import "./CartDropdown.scss";
import { Button } from "../Button/Button";
import { CartItem } from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <>
      <div className="cart-dropdown-container">
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  imgUrl={item.imageUrl}
                />
              );
            })
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        <Link to="/checkout">
            <Button title="Go to checkout" id="checkout" />
          </Link>
      </div>
    </>
  );
};
