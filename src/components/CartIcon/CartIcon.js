import './CartIcon.scss'
import {ReactComponent as Shoppingicon} from '../../assets/shopping-bag.svg'
import {useContext} from "react";
import { CartContext } from '../../App';

export const CartIcon =()=>{
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleCart = ()=>{
        setIsCartOpen(!isCartOpen);
    }
    return (
        <>
            <div className="cart-icon-container" onClick={toggleCart}>
                <Shoppingicon className="shopping-icon"/>
                <span className='item-count'>{cartCount}</span>
            </div>
        </>
    )
}