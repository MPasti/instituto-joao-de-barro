import { PartnersCarousel } from "../PartnersCarousel";
import ScrollEffect from "../ScrollComponent";
import { SwiperCarousel } from "../SwiperCarousel";
import { InfoSection } from "../InfoSection";
import { useState, useEffect } from "react";
import { getNews } from "../../services/newService.ts";
import { NewsSwiper } from "../NewsSwiper";
import { toast } from "react-hot-toast";
import { ResultsSection } from "../ResultsSection";
import { HelpSection } from "../HelpSection";

export function Main() {
  const [newsData, setNewsData] = useState<News[]>([]);

  const startComponent = async () => {
    try {
      const response = await getNews();
      if (response && response.data) {
        setNewsData(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao buscar notícias");
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
      <ResultsSection />
      <ScrollEffect />
      <HelpSection />
      <NewsSwiper newsData={newsData} />
      <PartnersCarousel />
    </div>
  );
}
