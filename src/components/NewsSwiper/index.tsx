import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import NewsCard from "../NewsCard";
import Button from "../Button";

export const NewsSwiper = ({ newsData }) => {
  const breakpoints = {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  };

  return (
    <div className="news-container">
      <h2>Últimas notícias</h2>
      <div className="news-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          speed={1500}
          navigation
          grabCursor={false}
          className="news-swiper"
          breakpoints={breakpoints}
        >
          {newsData.map((news, index) => (
            <SwiperSlide key={index}>
              <NewsCard
                key={index}
                etiqueta={news.etiqueta}
                titulo={news.titulo}
                descricao={news.descricao}
                data={news.data}
                link={news.link}
                image={news.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="d-flex justify-content-center">
        <Button outline={true} variant="secondary">
          VER MAIS NOTÍCIAS
        </Button>
      </div>
    </div>
  );
};
