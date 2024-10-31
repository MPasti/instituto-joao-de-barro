import { useEffect, useState } from "react";
import NewsCard from "../../../components/NewsCard";
import { getNews } from "../../../services/newService";
import { toast } from "react-hot-toast";

const NewsList = () => {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await getNews();
        setNewsList(response.data);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
        toast.error("Erro ao carregar notícias");
      }
    };

    loadNews();
  }, []);

  return (
    <div className="news-section">
      <div className="container mt-4 mb-5">
        <h2 className="text-center text-secondary mb-4">Últimas Notícias</h2>
        <div className="row g-4">
          {newsList.map((news) => (
            <div key={news.id} className="col-md-4">
              <NewsCard
                etiqueta={news.etiqueta}
                titulo={news.titulo}
                descricao={news.descricao}
                data={news.data}
                link={news.link}
                image={news.image}
              />
            </div>
          ))}
        </div>
      </div>
     
      <div className="news-break" style={{ height: "50px" }}></div>
    </div>
  );
};

export default NewsList;
