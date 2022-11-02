import "./CategoryItem.scss";
import { useNavigate } from "react-router-dom";

export const CategoryItem = (props) => {

  const navigate = useNavigate();

  const onClickHandler=()=>{
    navigate(props.route);
  }
  return (
    <>
      <div className="category-container" onClick={onClickHandler}>
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
