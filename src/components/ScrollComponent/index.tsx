import { useState, useEffect, useRef } from "react";
import FirstImage from "@images/institute/joaodebarro.jpg";
import SecondImage from "@images/institute/institute-3.png";
import ThirdImage from "@images/institute/institute-4.png";

const ScrollEffect = () => {
  const [currentImage, setCurrentImage] = useState(FirstImage);

  // Refs for content blocks
  const blockRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = blockRefs.current.findIndex(
              (block) => block === entry.target,
            );
            switch (index) {
              case 0:
                setCurrentImage(FirstImage);
                break;
              case 1:
                setCurrentImage(SecondImage);
                break;
              case 2:
                setCurrentImage(ThirdImage);
                break;
              default:
                break;
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    blockRefs.current.forEach((block) => block && observer.observe(block));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="scroll-section">
      <div className="row w-100">
        <div className="left-image col-6 left-content">
          <img src={currentImage} alt="Imagem Fixa" className="img-fluid" />
        </div>

        <div className="right-content col-6">
          <div
            className="content-block block-1 p-3 content bg-color-first"
            ref={(el: never) => (blockRefs.current[0] = el!)}
          >
            <div className="content-text">
              <h1>Quem nós ajudamos</h1>
              <p>
                Nosso auxílio vai além de proporcionar uma moradia digna às
                famílias carentes. Nós buscamos melhorar a qualidade de vida
                dessas famílias, oferecendo moradia, apoio psicológico e
                melhorias em suas condições. Promovendo a transformação social e
                a melhoria contínua da qualidade de vida de nossa comunidade.
              </p>
            </div>
          </div>
          <div
            className="content-block block-2 p-3 content bg-color-second text-black"
            ref={(el: never) => (blockRefs.current[1] = el!)}
          >
            <div className="content-text">
              <h1>Porque nós ajudamos</h1>
              <p>
                Nós ajudamos porque acreditamos no poder da compaixão, da
                solidariedade e da ação coletiva para criar mudanças duradouras.
                E acima de tudo, ajudamos porque sabemos que, juntos, podemos
                construir um mundo mais justo, onde todos tenham a chance de
                viver com dignidade e esperança.
              </p>
            </div>
          </div>
          <div
            className="content-block block-3 p-3 content bg-color-third"
            ref={(el: never) => (blockRefs.current[2] = el!)}
          >
            <div className="content-text">
              <h1>Como ajudamos</h1>
              <p>
                Apoiamos famílias em situação de vulnerabilidade, oferecendo
                doações, moradias dignas e promovendo eventos para o bem-estar
                de toda a comunidade na cidade de Franca.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollEffect;
