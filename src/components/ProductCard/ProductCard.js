import './ProductCard.scss'
import { Button } from '../Button/Button'

export const ProductCard=(props)=>{
    return (
        <>
            <div className="product-card-container">
                <img src={props.img} alt="" />    
                <div className="card-footer">
                    <span className='name'>{props.name}</span>
                    <span className='price'>{props.price} INR</span>
                </div>
                <Button id="inverted" title="Add to cart"/>
            </div>
        </>
    )
}