import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import NewsCard from "../NewsCard";

export const NewsSwiper = ({ newsData }) => {
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
          pagination={{ clickable: true }}
          grabCursor={false}
          className="news-swiper"
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
    </div>
  );
};
