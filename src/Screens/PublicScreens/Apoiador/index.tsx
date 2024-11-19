import main_imagem from "../../../assets/images/apoiador/main_image.png";
import "@styles/voluntariosInfo.scss";
import "@styles/global.scss";
import { Link } from "react-router-dom";

export function Apoiador() {
  return (
    <>
      <div className="parent-container">
        <div
          className="main-image-container"
          style={{ backgroundImage: `url(${main_imagem})` }}
        />
        <div className="content-container">
          <h1 className="title">O QUE FAZEMOS?</h1>
          <div className="info-box">
            No Instituto João de Barro, transformamos vidas construindo lares
            para famílias em situação de vulnerabilidade. Nossa missão é
            garantir que todos tenham um lugar seguro para viver, proporcionando
            esperança e dignidade. Com o apoio de voluntários e parceiros,
            oferecemos a base para que essas famílias construam um futuro
            melhor. Junte-se a nós e ajude a criar lares e mudar vidas.
          </div>

          <Link to="/apoiador/form" className="voluntario-btn"> Seja um Apoiador!</Link>
          <div className="yellow-container">
            <div className="yellow-box">
              <div>
                <h1 className="yellow-title">DOAÇÕES MONETÁRIAS</h1>
                <p className="paragraph">
				Sua contribuição nos ajuda a construir lares para famílias em situação de vulnerabilidade.
				 Com cada doação, adquirimos materiais e garantimos que mais pessoas tenham um lar seguro.
				  Doe e faça parte dessa transformação!
                </p>
              </div>
              <Link to="/doacoes" className="voluntario-btn-orange">
                {"Faça sua doação!"}
                
              </Link>
            </div>
            <div className="yellow-box">
              <div>
                <h1 className="yellow-title">DOAÇÕES MATERIAIS</h1>
                <p className="paragraph">
				Doações de materiais como tijolos, cimento e ferramentas são essenciais para nossas construções. 
				Cada item doado ajuda a reduzir custos e a levar dignidade a quem mais precisa.
                </p>
              </div>
              <Link to="/apoiador/form" className="voluntario-btn-orange">
                {"Faça uma doação!"}
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
