import { CategoryItem } from "../CategoryItem/CategoryItem";
import img1 from '../../media/dubai.jpg'
import img2 from '../../media/europebg.jpg'
import img3 from '../../media/goa.jpg'
import img4 from '../../media/himachalbg.jpg'
import img5 from '../../media/himachalbg.jpg'
import './Directory.scss'

export const Directory = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      img: img1,
    },
    {
      id: 2,
      title: "Jackets",
      img: img2,
    },
    {
      id: 3,
      title: "Sneakers",
      img: img3,
    },
    {
      id: 4,
      title: "Womens",
      img: img4,
    },
    {
      id: 5,
      title: "Mens",
      img: img5,
    },
  ];

  return (
    <>
      <div className="directory-container">
        {categories.map((element) => {
          return <CategoryItem img={element.img} title={element.title} />;
        })}
      </div>
    </>
  );
};
