import { useEffect, useState } from "react";
import NewsCard from "../../../components/NewsCard";
import { getNews } from "../../../services/newService";
import { toast } from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";

const NewsList = () => {
  const [newsList, setNewsList] = useState<News[]>([]); 
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [filterOption, setFilterOption] = useState("recent");

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

  // Função para aplicar o filtro
  const handleFilter = (option: string) => {
    setFilterOption(option); 
  };

 
  useEffect(() => {
    const applyFilter = () => {
      let filtered = [...newsList]; 

      
      if (filterOption === "recent") {
        filtered.sort((a, b) => {
          const dateA = new Date(a.data); 
          const dateB = new Date(b.data); 
          return dateB.getTime() - dateA.getTime(); 
        });
      } 
      
      else if (filterOption === "oldest") {
        filtered.sort((a, b) => {
          const dateA = new Date(a.data); 
          const dateB = new Date(b.data); 
          return dateA.getTime() - dateB.getTime(); 
        });
      }

      setFilteredNews(filtered); 
    };

  
    if (newsList.length > 0) {
      applyFilter();
    }
  }, [newsList, filterOption]); 

  return (
    <div className="news-section">
      <div className="container mt-4 mb-5">
        <h2 className="text-center text-secondary mb-4">Últimas Notícias</h2>

       
        <div className="d-flex justify-content-end mb-4">
          {/* Filtro Mais Recentes */}
          <div className="filter-item mx-2">
            <button
              className={`btn btn-sm ${filterOption === "recent" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => handleFilter("recent")}
              style={{
                padding: "6px 12px", 
                fontSize: "14px",
              }}
            >
              Mais Recentes
              {filterOption === "recent" && <IoIosArrowDown size={14} className="ms-2" />}
            </button>
          </div>

          {/* Filtro Mais Antigas */}
          <div className="filter-item mx-2">
            <button
              className={`btn btn-sm ${filterOption === "oldest" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => handleFilter("oldest")}
              style={{
                padding: "6px 12px", 
                fontSize: "14px",
              }}
            >
              Mais Antigas
              {filterOption === "oldest" && <IoIosArrowDown size={14} className="ms-2" />}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row g-4">
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
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
                ))
              ) : (
                <div className="col-12">
                  <p className="text-center">Nenhuma notícia encontrada.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="news-break" style={{ height: "50px" }}></div>
    </div>
  );
};

export default NewsList;

