import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import logoFacef from "../../assets/images/partners/unifacef_logo.png";

export const PartnersCarousel = () => {
  const logos = [logoFacef, logoFacef, logoFacef, logoFacef];

  return (
    <div className="partners">
      <h2>Empresas apoiadoras</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode]}
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        freeMode={true}
        grabCursor={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        speed={3000}
        onSwiper={() => {}}
        onSlideChange={() => {}}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              style={{ width: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
