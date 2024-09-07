import { Carousel } from "../Carousel";

export function Main() {
  const images = [
    "https://via.placeholder.com/800x400?text=First+Slide",
    "https://via.placeholder.com/800x400?text=Second+Slide",
    "https://via.placeholder.com/800x400?text=Third+Slide",
  ];

  return (
    <div className="main">
      <Carousel images={images} />
    </div>
  );
}
