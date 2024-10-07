import Utils from "../../utils";
import { IoIosArrowDropright } from "react-icons/io";
import placeholderImage from "@images/placeholder-image.png";

interface NewsCardProps {
  etiqueta?: string;
  titulo?: string;
  descricao?: string;
  data?: string;
  link?: string;
  image?: string;
}

const NewsCard = ({
  etiqueta = "Etiqueta",
  titulo = "Título da Notícia",
  descricao = "Descrição",
  data,
  link,
  image,
}: NewsCardProps) => {
  return (
    <div className="news-card">
      <div className="card-body">
        <div className="image-container">
          <div
            className="position-relative"
            style={{ width: "100%", height: "400px" }}
          >
            <img src={image || placeholderImage} alt="Notícia" />
            <div className="card-badge">{etiqueta || "Etiqueta"}</div>
            <div className="card-overlay"></div>
            <div className="title">{titulo}</div>
          </div>
        </div>

        <div className="content">
          <p className="description">{descricao || "Descrição"}</p>

          <div className="card-footer">
            <small>{Utils.formatDate(data) || "Data"}</small>

            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                <IoIosArrowDropright size={22} /> Ver mais
              </a>
            ) : null}
          </div>

          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
