import { PartnersCarousel } from "../PartnersCarousel";
import ScrollEffect from "../ScrollComponent";
import { SwiperCarousel } from "../SwiperCarousel";

export function Main() {
  return (
    <div className="pages">
      <SwiperCarousel />
      <ScrollEffect />
      <PartnersCarousel />
    </div>
  );
}
