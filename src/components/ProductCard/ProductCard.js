import './ProductCard.scss'
import { Button } from '../Button/Button'
import {addItemToCart} from '../../store/cart/cart.actions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

export const ProductCard=({ product })=>{
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const addProductToCart = ()=>{
        dispatch(addItemToCart(cartItems,product))
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