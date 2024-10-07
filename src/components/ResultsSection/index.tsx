import ResultImage from "@images/institute/segunda-casa.jpg";
import Button from "../Button";

const ResultsSection = () => {
  return (
    <div className="results-container">
      <div className="results">
        <h2>RESULTADOS DO IJB</h2>
        <div className="result-item">
          <div className="info-item">
            <p>
              Os resultados que alcançamos são refletidos nas histórias de
              superação e nas vidas que foram impactadas pelo nosso trabalho.
              Através de nossos esforços, conseguimos promover inclusão,
              oferecer apoio e criar oportunidades para quem mais precisa. Não é
              apenas sobre o que fazemos, mas sobre as mudanças que
              possibilitamos — mudanças que ecoam em toda a sociedade e geram um
              futuro mais solidário.
            </p>
            <Button outline variant="secondary">
              VER PROJETOS
            </Button>
          </div>
          <img src={ResultImage} alt="Resultado-IJB" />
        </div>
      </div>
    </div>
  );
};

export { ResultsSection };
