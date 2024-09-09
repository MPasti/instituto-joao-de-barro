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
    <div className="scroll-section container">
      <div className="row">
        <div className="left-image col-6 left-content">
          <img src={ijbImage} alt="Imagem Fixa" className="img-fluid" />
        </div>
        <div className="right-content col-6">
          <div className="content-block block-1 mb-4 p-3 bg-light">
            <h2>Conteúdo 1</h2>
            <p>lorem</p>
          </div>
          <div className="content-block block-2 mb-4 p-3 bg-light">
            <h2>Conteúdo 2</h2>
            <p>Texto sobre o conteúdo 2.</p>
          </div>
          <div className="content-block block-3 mb-4 p-3 bg-light">
            <h2>Conteúdo 3</h2>
            <p>Texto sobre o conteúdo 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollEffect;
