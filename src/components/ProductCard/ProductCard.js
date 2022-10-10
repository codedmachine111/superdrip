import './ProductCard.scss'
import { Button } from '../Button/Button'
import { CartContext } from '../../App'
import { useContext } from 'react'

export const ProductCard=(props)=>{
    const {addItemToCart} = useContext(CartContext);
    const addProductToCart = ()=>{
        console.log(props.product);
        addItemToCart(props.product);
    }
    return (
        <>
            <div className="product-card-container">
                <img src={props.img} alt="" />    
                <div className="card-footer">
                    <span className='name'>{props.name}</span>
                    <span className='price'>{props.price} INR</span>
                </div>
                <Button id="inverted" title="Add to cart" onClick={addProductToCart}/>
            </div>
        </>
    )
}