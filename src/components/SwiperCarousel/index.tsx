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
      title: "Construindo Sonhos, Transformando Vidas",
      description:
        "O Instituto João de Barro acredita no poder da união para proporcionar moradias dignas às famílias necessitadas. Junte-se a nós e seja parte dessa transformação.",
      text: "Saiba mais",
    },
    {
      image: ijbComemoration,
      title: "Descubra o Instituto João de Barro",
      description:
        "Saiba mais sobre nossa missão, projetos e como você pode fazer parte dessa iniciativa. Juntos, podemos transformar vidas e comunidades.",
      text: "Saiba mais",
    },
    {
      image: ijbImage,
      title: "Moradia Digna é um Direito de Todos",
      description:
        "O Instituto João de Barro trabalha para construir um futuro mais justo, proporcionando lares dignos às famílias que necessitam. Cada casa entregue é um passo em direção a uma sociedade mais solidária e humana.",
      text: "Saiba mais",
    },
    {
      image: ijbComemoration,
      title: "Histórias que Inspiram",
      description:
        "O Instituto João de Barro transforma vidas em Franca-SP ao construir lares para famílias necessitadas. Descubra nossas iniciativas e junte-se à causa.",
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
                <p className="w-75" data-swiper-parallax="-300">
                  {slide.description}
                </p>
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
