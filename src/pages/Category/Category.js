import "./Category.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";

export const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector((state)=>state.category.categoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
    <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-products-container">
        {products &&
          products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
      </div>
    </>
  );
};
