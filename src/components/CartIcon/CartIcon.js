import './CartIcon.scss'
import {ReactComponent as Shoppingicon} from '../../assets/shopping-bag.svg'
export const CartIcon =()=>{
    return (
        <>
            <div className="cart-icon-container">
                <Shoppingicon className="shopping-icon"/>
                <span className='item-count'>10</span>
            </div>
        </>
    )
}