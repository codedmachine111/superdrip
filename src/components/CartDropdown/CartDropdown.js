import './CartDropdown.scss'
import { Button } from '../Button/Button'

export const CartDropdown = ()=>{
    return (
        <>
            <div className="cart-dropdown-container">
                <div className="cart-items">
                    <Button title="Go to checkout"/>
                </div>    
            </div>
        </>
    )
}