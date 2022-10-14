import { ProductCard } from "../ProductCard/ProductCard";
import "./CategoryPreview.scss";
import { Link } from "react-router-dom";

export const CategoryPreview = ({ title, items }) => {
  return (
    <>
      <div className="category-preview-container">
        <h2>
          <Link to={`/shop/${title}`} className="title">{title.toUpperCase()}</Link>
        </h2>
        <hr id="line"/>
        <div className="preview">
          {items
            .filter((_, idx) => idx < 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </div>
    </>
  );
};
