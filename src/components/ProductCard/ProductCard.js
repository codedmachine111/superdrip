import './ProductCard.scss'
import { Button } from '../Button/Button'
import { CartContext } from '../../App'
import { useContext } from 'react'

export const ProductCard=({ product })=>{
    const { name, price, imageUrl } = product;
    const {addItemToCart} = useContext(CartContext);
    const addProductToCart = ()=>{
        addItemToCart(product);
    }
    return (
        <>
            <div className="product-card-container">
                <img src={imageUrl} alt="" />    
                <div className="card-footer">
                    <span className='name'>{name}</span>
                    <span className='price'>{price} INR</span>
                </div>
                <Button id="inverted" title="Add to cart" onClick={addProductToCart}/>
            </div>
        </>
    )
}