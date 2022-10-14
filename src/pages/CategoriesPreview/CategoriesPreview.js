import { useContext } from "react";
import { CategoriesContext } from "../../App";
import { CategoryPreview } from "../../components/CategoryPreview/CategoryPreview";

export const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
        {Object.keys(categoriesMap).map((title) => (
          <CategoryPreview
            key={title}
            title={title}
            items={categoriesMap[title]}
          />
        ))}
    </>
  );
};
