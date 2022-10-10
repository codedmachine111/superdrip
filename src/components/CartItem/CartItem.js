import './CartItem.scss';
import React from 'react'


export const CartItem = (props) => {
  return (
    <>
      <div className='cart-item-container'>
         <img src={props.img} alt={""} />
         <div className='item-details'>
           <span className='name'>{props.name}</span>
           <span className='price'>
             {props.quantity} x ${props.price}
           </span>
         </div>
       </div>
    </>
  )
};
