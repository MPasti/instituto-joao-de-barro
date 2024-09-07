import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import ijbImage from "../../assets/images/institute/joaodebarro.jpg";
export const SwiperCarousel = () => {
  const slides = [
    {
      image: ijbImage,
      title: "Título 1",
      description: "Descrição da imagem 1",
      text: "Saiba mais",
    },
    {
      image: ijbImage,
      title: "Título 2",
      description: "Descrição da imagem 2",
      text: "Saiba mais",
    },
    {
      image: ijbImage,
      title: "Título 3",
      description: "Descrição da imagem 3",
      text: "Saiba mais",
    },
    {
      image: ijbImage,
      title: "Título 4",
      description: "Descrição da imagem 4",
      text: "Saiba mais",
    },
  ];

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1500}
        navigation
        pagination={{ clickable: true }}
        className="custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-container">
              <img
                src={slide.image}
                alt={`Image ${index + 1}`}
                className="slide-image"
              />
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button className="slide-button">{slide.text}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
