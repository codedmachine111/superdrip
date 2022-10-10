import './Shop.scss'
import {useContext} from  "react";
import { ProductContext } from '../../App';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const Shop =()=>{
    const { products } = useContext(ProductContext)
    return (
        <>
            <div className="item-container">
                {products.map((item)=>{
                    return <ProductCard name={item.name} img={item.img} price={item.price} product={item}/>
                })}    
            </div>

        </>
    )
}