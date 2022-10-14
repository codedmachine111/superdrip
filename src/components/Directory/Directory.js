import { CategoryItem } from "../CategoryItem/CategoryItem";
import './Directory.scss'

export const Directory = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      img: "https://i.ibb.co/bLB646Z/red-beanie.png",
      route: "/shop/hats",
    },
    {
      id: 2,
      title: "Jackets",
      img: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
      route: "/shop/jackets",
    },
    {
      id: 3,
      title: "Sneakers",
      img: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
      route: "/shop/sneakers",
    },
    {
      id: 4,
      title: "Womens",
      img: 'https://i.ibb.co/KV18Ysr/floral-skirt.png',
      route: "/shop/womens",
    },
    {
      id: 5,
      title: "Mens",
      img: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
      route: "/shop/mens",
    },
  ];

  return (
    <>
      <div className="directory-container">
        {categories.map((element) => {
          return <CategoryItem img={element.img} title={element.title} route={element.route}/>;
        })}
      </div>
    </>
  );
};
