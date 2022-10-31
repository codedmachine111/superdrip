import './CartIcon.scss'
import {ReactComponent as Shoppingicon} from '../../assets/shopping-bag.svg'
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount} from '../../store/cart/cart.selector'
import {setIsCartOpen} from '../../store/cart/cart.actions'
import { useContext } from 'react';
import { ToggleCartContext } from '../../App';

export const CartIcon =()=>{
    
    const cartCount = useSelector(selectCartCount);
    const {isCartOpen, setIsCartOpen} = useContext(ToggleCartContext)

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