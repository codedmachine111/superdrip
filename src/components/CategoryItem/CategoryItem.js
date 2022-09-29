import "./CategoryItem.scss";

export const CategoryItem = (props) => {
  return (
    <>
      <div className="category-container">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${props.img})` }}
        />
        <div className="category-body-container">
          <h2>{props.title}</h2>
          <p>Shop now</p>
        </div>
      </div>
    </>
  );
};
