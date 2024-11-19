import people_stack from "../../../assets/images/voluntariado/people_stack.png";
import grid_image_a from "../../../assets/images/voluntariado/grid_image_a.svg";
import grid_image_b from "../../../assets/images/voluntariado/grid_image_b.svg";
import grid_image_c from "../../../assets/images/voluntariado/grid_image_c.svg";
import "@styles/global.scss";
import "@styles/voluntariosInfo.scss";
import { Link } from "react-router-dom";

export function Voluntarios() {
	return (
		<>
			<div className="parent-container">
				<div
					className="main-image-container"
					style={{ backgroundImage: `url(${people_stack})` }}
				/>
				<div className="content-container">
					<h1 className="title">O QUE FAZEMOS?</h1>
					<div className="info-box">
					No Instituto João de Barro, transformamos vidas construindo lares para famílias em situação de vulnerabilidade. 
					Nossa missão é garantir que todos tenham um lugar seguro para viver, proporcionando esperança e dignidade. 
					Com o apoio de voluntários e parceiros, oferecemos a base para que essas famílias construam um futuro melhor.
                     Junte-se a nós e ajude a criar lares e mudar vidas.
					</div>
					<Link to="/voluntarios/form" className="voluntario-btn"> Seja um Voluntário!</Link>
					<h1 className="title">CONHEÇA A EQUIPE!</h1>
					<div className="grid-container">
						<img
							src={grid_image_a}
							alt="Left Image"
							className="left-image"
						/>
						<div className="right-container">
							<img
								src={grid_image_b}
								alt="Right Top Image"
								className="right-image-top"
							/>
							<img
								src={grid_image_c}
								alt="Right Bottom Image"
								className="right-image-bottom"
							/>
						</div>
					</div>
                    <p className="last-paragraph">
					Nossa equipe é formada por voluntários dedicados, apoiadores comprometidos e voluntários-apoiadores que unem forças para transformar vidas. 
					Cada pessoa contribui com seu tempo, talento e recursos para construir lares e oferecer dignidade a famílias em situação de vulnerabilidade. 
					Juntos, criamos um impacto que vai além das paredes de cada casa. 
                    </p>
				</div>
			</div>
		</>
	);
}
