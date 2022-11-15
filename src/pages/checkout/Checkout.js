import './Checkout.scss';
import { selectCartTotal} from '../../store/cart/cart.selector';
import { CheckoutItem } from '../../components/CheckoutItem/CheckoutItem';
import { useSelector } from 'react-redux';
import carticon from '../../media/cartempty.png';
 
export const Checkout=()=> {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
       {cartItems.length ? (
            <div className='checkout-container'>
            <div className='checkout-header'>
              <div className='header-block'>
                <span>Product</span>
              </div>
              <div className='header-block'>
                <span>Description</span>
              </div>
              <div className='header-block'>
                <span>Quantity</span>
              </div>
              <div className='header-block'>
                <span>Price</span>
              </div>
              <div className='header-block'>
                <span>Remove</span>
              </div>
            </div>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className='total'>TOTAL: ${cartTotal}</div>
      
            {/* <PaymentForm /> */}
          </div>
          ) : (
            <div className='empty-cart'>
              <img src={carticon} alt='cart icon'/>
              <p className='empty-message'>Your cart is empty</p>
            </div>
          )}
    </>
  )
  
}
