import { PartnersCarousel } from "../PartnersCarousel";
import ScrollEffect from "../ScrollComponent";
import { SwiperCarousel } from "../SwiperCarousel";
import { InfoSection } from "../InfoSection";
import { useState, useEffect } from "react";
import { getNews } from "../../services/newService.ts";
import { NewsSwiper } from "../NewsSwiper";

export function Main() {
  const [newsData, setNewsData] = useState<News[]>([]);

  const startComponent = async () => {
    try {
      const response = await getNews();
      if (response && response.data) {
        console.log(response.data);
        setNewsData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  const onMounted = async () => {
    await startComponent();
  };

  useEffect(() => {
    onMounted();
  }, []);

  return (
    <div className="pages">
      <SwiperCarousel />
      <InfoSection />
      <ScrollEffect />
      <NewsSwiper newsData={newsData} />
      <PartnersCarousel />
    </div>
  );
}
