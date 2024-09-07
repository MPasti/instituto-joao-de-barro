import { PartnersCarousel } from "../PartnersCarousel";
import { SwiperCarousel } from "../SwiperCarousel";

export function Main() {
  return (
    <div className="pages">
      <SwiperCarousel />
      <PartnersCarousel />
    </div>
  );
}
