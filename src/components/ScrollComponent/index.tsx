import { useEffect } from "react";
import ijbImage from "@images/institute/joaodebarro.jpg";

const ScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const blocks = document.querySelectorAll(".content-block");
      blocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          (block as HTMLElement).style.transform = "translateY(0)";
        } else {
          (block as HTMLElement).style.transform = "translateY(50px)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-section">
      <div className="row">
        <div className="left-image col-6 left-content">
          <img src={ijbImage} alt="Imagem Fixa" className="img-fluid" />
        </div>
        <div className="right-content col-6">
          <div className="content-block block-1 p-3 content bg-color-first">
            <h1>Quem nós ajudamos</h1>
            <p>
              Nosso auxilio vai além de proporcionar uma moradia digna à
              famílias carentes, nós buscamos melhorar a qualidade de vida
              dessas famílias, oferecendo moradia, apoio psicológico e melhorar
              suas condições. Promovendo a transformação social e a melhoria
              contínua da qualidade de vida de nossa comunidade.
            </p>
          </div>
          <div className="content-block block-2 p-3 content bg-color-second">
            <h1>Porque nós ajudamos</h1>
            <p>
              Nós ajudamos porque acreditamos no poder da compaixão, da
              solidariedade e da ação coletiva para criar mudanças duradouras. E
              acima de tudo, ajudamos porque sabemos que, juntos, podemos
              construir um mundo mais justo, onde todos tenham a chance de viver
              com dignidade e esperança.
            </p>
          </div>
          <div className="content-block block-3 p-3 content bg-color-third">
            <h1>Como ajudamos</h1>
            <p>
              Apoiamos famílias em situação de vulnerabilidade, necessidade,
              oferecendo doações, oferecendo moradias dignas, promovendo eventos
              para o bem estar de toda a comunidade na cidade de Franca.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollEffect;
