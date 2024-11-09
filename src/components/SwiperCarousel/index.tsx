import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/parallax";

import ijbImage from "../../assets/images/institute/joaodebarro.jpg";
import ijbComemoration from "../../assets/images/institute/segunda-casa.jpg";

export const SwiperCarousel = () => {
  const slides = [
    {
      image: ijbImage,
      title: "Título 1",
      description: "Descrição da imagem 1",
      text: "Saiba mais",
    },
    {
      image: ijbComemoration,
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
      image: ijbComemoration,
      title: "Título 4",
      description: "Descrição da imagem 4",
      text: "Saiba mais",
    },
  ];

  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax]}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={3000}
        navigation
        parallax={true}
        className="custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-container">
              <img
                src={slide.image}
                alt={`Image ${index + 1}`}
                className="slide-image"
                data-swiper-parallax="-100"
              />
              <div
                className="slide-content"
                data-swiper-parallax="-500"
                data-swiper-parallax-opacity="0.5"
              >
                <h2 data-swiper-parallax="-300">{slide.title}</h2>
                <p data-swiper-parallax="-300">{slide.description}</p>
                <button className="slide-button" data-swiper-parallax="-300">
                  {slide.text}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
