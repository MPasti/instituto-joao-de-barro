import Button from "../../../components/Button";
import { RiDoubleQuotesL } from "react-icons/ri";

export function About() {
  return (
    <div className="pages about-page">
      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-6 p-5">
          <h1>
            O que é o{" "}
            <span className="text-secondary">Instituto João de Barro?</span>
          </h1>
        </div>
        <div className="col-12 col-md-5 p-5">
          <p>
            O Instituto João de Barro é uma ONG que atua na cidade de Franca -
            SP, com o objetivo de ajudar famílias em situação de
            vulnerabilidade, necessidade, entre outros; oferecendo doações de
            recursos financeiros, criando moradias, promovendo eventos para o
            bem estar social da cidade de Franca.
          </p>
          <Button outline type="button" variant="secondary">
            VER PROJETOS
          </Button>
        </div>
      </div>
      <div className="quotes">
        <div className="col-4 d-flex justify-content-end p-5">
          <RiDoubleQuotesL size={120} />
        </div>
        <div className="d-flex flex-column col-8 text-justify content-text">
          <h3>
            “O Instituto João de Barro é uma organização onde pessoas podem
            exercitar a cidadania, servir a comunidade e praticar o princípio
            cristão da caridade”
          </h3>
          <span className="text-secondary">Carlos Tavares</span>
          <p>Idealizador do IJB</p>
        </div>
      </div>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/Sh6ekQzXmfI?si=zegdyOdfGJ9rjKMu"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
