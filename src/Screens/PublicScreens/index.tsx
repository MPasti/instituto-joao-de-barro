
import NewsCard from '../components/NewsCard'; 

const noticias = [
  {
    etiqueta: '',
    titulo: '',
    descricao: '',
    data: '',
    link: '',
    image: '',
  },
  

];

const PublicNoticias: React.FC = () => {
  return (
    <div className="noticias-container">
      <h1>Últimas Notícias</h1>
      {noticias.map((noticia, index) => (
        <NewsCard
          key={index}
          etiqueta={noticia.etiqueta}
          titulo={noticia.titulo}
          descricao={noticia.descricao}
          data={noticia.data}
          link={noticia.link}
          image={noticia.image}
        />
      ))}
    </div>
  );
};

export default PublicNoticias;
