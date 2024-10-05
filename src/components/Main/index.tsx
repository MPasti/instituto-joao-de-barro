import { PartnersCarousel } from "../PartnersCarousel";
import ScrollEffect from "../ScrollComponent";
import { SwiperCarousel } from "../SwiperCarousel";
import {InfoSection} from "../InfoSection";

export function Main() {
  return (
    <div className="pages">
      <SwiperCarousel />
      <InfoSection />
      <ScrollEffect />
      <PartnersCarousel />
    </div>
  );
}
