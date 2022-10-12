import "./Shop.scss";
import { useContext } from "react";
import { CategoriesContext } from "../../App";
import { CategoryPreview } from "../../components/CategoryPreview/CategoryPreview";

export const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      <div className="shop-container">
        {Object.keys(categoriesMap).map((title) => (
          <CategoryPreview
            key={title}
            title={title}
            items={categoriesMap[title]}
          />
        ))}
      </div>
    </>
  );
};
