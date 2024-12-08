import ResultImage from "@images/institute/segunda-casa.jpg";

import antes from "@images/institute/antes.png";
import depois from "@images/institute/depois.png";

import Button from "../Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ResultsSection = () => {
  const navigate = useNavigate();
  const blockRef1 = useRef<HTMLDivElement | any>(null);
  const blockRef2 = useRef<HTMLDivElement | any>(null);

  return (
    <div className="results-container">
      <div className="results">
        <h2 className="mt-5 text-secondary">RESULTADOS DO IJB</h2>
        <div className="result-item">
          <div className="text-justify col-12 col-md-6">
            <p>
              Os resultados que alcançamos são refletidos nas histórias de
              superação e nas vidas que foram impactadas pelo nosso trabalho.
              Através de nossos esforços, conseguimos promover inclusão,
              oferecer apoio e criar oportunidades para quem mais precisa. Não é
              apenas sobre o que fazemos, mas sobre as mudanças que
              possibilitamos — mudanças que ecoam em toda a sociedade e geram um
              futuro mais solidário.
            </p>
            <Button
              outline
              variant="secondary"
              onClick={() => {
                navigate("/sobre");
              }}
            >
              SAIBA MAIS
            </Button>
          </div>
          <img
            className="col-12 col-md-6"
            src={ResultImage}
            alt="Resultado-IJB"
          />
        </div>

        <div className="mt-5">
          <h1 className="text-secondary mt-3 mb-5">Projeto Atual</h1>
          <div className="view">
            <div className="block" ref={blockRef1}>
              <h2>Antes</h2>
              <img src={antes} alt="Antes" />
            </div>
            <div className="block" ref={blockRef2}>
              <h2>Depois</h2>
              <img src={depois} alt="Depois" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResultsSection };
