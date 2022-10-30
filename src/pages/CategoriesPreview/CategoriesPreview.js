import { CategoryPreview } from "../../components/CategoryPreview/CategoryPreview";
import { useSelector } from "react-redux";

export const CategoriesPreview = () => {
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
  
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
