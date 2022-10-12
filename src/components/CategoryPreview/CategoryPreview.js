import { ProductCard } from "../ProductCard/ProductCard";
import './CategoryPreview.scss';

export const CategoryPreview = ({ title, items }) => {
  return (
    <>
      <div className="category-preview-container">
        <h1>
          <span className="title">{title.toUpperCase()}</span>
        </h1>
        <div className="preview">
          {items
            .filter((_, idx) => idx < 4)
            .map((item) => (
              <ProductCard id={item.id} product={item} />
            ))}
        </div>
      </div>
    </>
  );
};
