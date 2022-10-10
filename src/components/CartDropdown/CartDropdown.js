import './CartDropdown.scss'
import { Button } from '../Button/Button'
import { CartItem } from '../CartItem/CartItem'
import { CartContext } from '../../App'
import { useContext } from 'react'

export const CartDropdown = ()=>{
    const {cartItems} = useContext(CartContext);
    return (
        <>
            <div className="cart-dropdown-container">
                <div className="cart-items">
                    {cartItems.length ? (cartItems.map((item)=>{
                        return <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} img={item.img}/>
                    })) : <span className="empty-message">Your cart is empty</span>}
                    <Button title="Go to checkout" id="checkout"/>
                </div>    
            </div>
        </>
    )
}