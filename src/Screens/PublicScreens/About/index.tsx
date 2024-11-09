import Button from "../../../components/Button";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  FaHandFist,
  FaHandHoldingHeart,
  FaHandshakeAngle,
  FaUsers,
} from "react-icons/fa6";

export function About() {
  return (
    <div className="pages about-page">
      <div
        className="d-flex flex-column flex-md-row"
        style={{ minHeight: "420px" }}
      >
        <div className="col-12 col-md-6 p-5 align-self-center">
          <h1>
            O que é o{" "}
            <span className="text-secondary">Instituto João de Barro?</span>
          </h1>
        </div>
        <div className="col-12 col-md-5 p-5 align-self-center">
          <p>
            O Instituto João de Barro atua na cidade de Franca - SP, com o
            objetivo de ajudar famílias em situação de vulnerabilidade,
            necessidade, entre outros; oferecendo doações de recursos
            financeiros, criando moradias, promovendo eventos para o bem estar
            social da cidade de Franca.
          </p>
          <Button outline type="button" variant="secondary">
            VER PROJETOS
          </Button>
        </div>
      </div>

      <div className="quotes d-flex flex-wrap align-items-center p-4">
        <div className="col-12 col-md-5 d-flex justify-content-md-end justify-content-center p-3">
          <RiDoubleQuotesL className="quote-icon" />
        </div>
        <div className="col-12 col-md-7 content-text text-md-start text-center">
          <h3>
            “O Instituto João de Barro é uma organização onde pessoas podem
            exercitar a cidadania, servir a comunidade e praticar o princípio
            cristão da caridade”
          </h3>
          <span className="text-secondary d-block">Carlos Tavares</span>
          <p>Idealizador do IJB</p>
        </div>
      </div>

      <div className="video-container text-center">
        <h3 className="fw-bold">Saiba mais sobre nossa missão!</h3>
        <iframe
          src="https://www.youtube-nocookie.com/embed/Sh6ekQzXmfI?si=zegdyOdfGJ9rjKMu"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mission text-white text-center">
        <div className="col-12 col-md-6 p-3">
          <div className="mission-value">
            <h1>Missão</h1>
            <p>
              Nossa missão é promover a inclusão social e o desenvolvimento
              sustentável, oferecendo suporte a famílias e indivíduos em
              situação de vulnerabilidade por meio do auxílio. Buscamos
              construir uma comunidade mais justa e solidária, onde cada pessoa
              tenha a oportunidade de viver uma vida digna.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <div className="mission-value">
            <h1>Visão</h1>
            <p>
              Ser referência no desenvolvimento social e comunitário em Franca e
              região, transformando vidas por meio de iniciativas que promovam a
              dignidade e o bem-estar. Nosso objetivo é inspirar e mobilizar a
              sociedade para agir de forma colaborativa, criando um impacto
              duradouro e positivo em cada pessoa e família assistida.
            </p>
          </div>
        </div>
      </div>

      <div className="values-section text-center">
        <h1 className="text-secondary fw-bold">VALORES</h1>
        <div className="values-container">
          <div className="value-item">
            <FaHandHoldingHeart size={68} className="text-secondary" />
            <h2 className="fw-bold">Solidariedade</h2>
            <p>
              Acreditamos na força da cooperação e no apoio mútuo para
              transformar a vida de pessoas e comunidades.
            </p>
          </div>
          <div className="value-item">
            <FaHandshakeAngle size={68} className="text-secondary" />
            <h2 className="fw-bold">Compromisso Social</h2>
            <p>
              Trabalhamos para criar impacto positivo na vida das pessoas, com
              dedicação às causas que promovem o bem-estar e o desenvolvimento
              comunitário.
            </p>
          </div>
          <div className="value-item">
            <FaHandFist size={68} className="text-secondary" />
            <h2 className="fw-bold">Convicção</h2>
            <p>
              Nós sabemos que através do nosso trabalho, podemos melhorar nossa
              comunidade.
            </p>
          </div>
          <div className="value-item">
            <FaUsers size={68} className="text-secondary" />
            <h2 className="fw-bold">Inclusão</h2>
            <p>
              Defendemos a igualdade de oportunidades, trabalhando para garantir
              que todos tenham acesso aos recursos necessários para uma vida
              digna.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
