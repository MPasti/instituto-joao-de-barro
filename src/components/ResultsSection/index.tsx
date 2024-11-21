import ResultImage from "@images/institute/segunda-casa.jpg";
import AnotherImage from "@images/institute/casa-3.png";
import Button from "../Button";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ResultsSection = () => {
  const navigate = useNavigate();
  const blockRef1 = useRef<HTMLDivElement>(null);
  const blockRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateOnScroll = () => {
      [blockRef1, blockRef2].forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;

          if (inView) {
            ref.current.classList.add("fadeIn");
            ref.current.classList.remove("fadeOut");
          } else {
            ref.current.classList.add("fadeOut");
            ref.current.classList.remove("fadeIn");
          }
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

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
          <img src={ResultImage} alt="Resultado-IJB" className="img-fluid" />
        </div>

        <div className="view">
          <div className="block fadeOut" ref={blockRef1}>
            <img src={ResultImage} alt="Imagem de Resultado 1" />
          </div>
          <div className="block fadeOut" ref={blockRef2}>
            <img src={AnotherImage} alt="Imagem de Resultado 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResultsSection };
