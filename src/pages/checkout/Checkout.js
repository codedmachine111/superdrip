import './Checkout.scss';
import {selectCartItems, selectCartTotal} from '../../store/cart/cart.selector';
import React from 'react'
import { CheckoutItem } from '../../components/CheckoutItem/CheckoutItem';
import { useSelector } from 'react-redux';
 
export const Checkout=()=> {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
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
  )
}
