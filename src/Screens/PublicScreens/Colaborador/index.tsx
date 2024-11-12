import main_imagem from "../../../assets/images/colaborador/main_imagem.svg";
import image from "../../../assets/images/colaborador/image.svg";
import "./style.scss";

export function Colaborador() {
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
					No Instituto João de Barro, transformamos vidas construindo lares para famílias em situação de vulnerabilidade. 
					Nossa missão é garantir que todos tenham um lugar seguro para viver, proporcionando esperança e dignidade. 
					Com o apoio de voluntários e parceiros, oferecemos a base para que essas famílias construam um futuro melhor.
                    Junte-se a nós e ajude a criar lares e mudar vidas.
					</div>
					<div className="text-container">
						<img
							src={image}
							alt="Right Top Image"
							className="right-image-top"
						/>
						<div>
							<h1 className="info-title">
								O que significa ser Voluntario-Apoiador?
							</h1>
							<p className="paragraph">
							Ser Voluntário-Apoiador é exercer um papel fundamental no Instituto João de Barro, combinando a dedicação nas construções com o apoio financeiro aos nossos projetos. 
							Você contribui com seu tempo e recursos para transformar vidas e construir lares.
							</p>
						</div>
					</div>
					<button className="voluntario-btn"> Seja um Voluntario-Apoiador!</button>
					<div className="yellow-container">
						<div className="yellow-box">
							<div>
								<h1 className="yellow-title">
									SUA PARTE COMO VOLUNTARIO-APOIADOR
								</h1>
								<p className="paragraph">
								Como Voluntário-Apoiador, você participa ativamente das obras e ainda ajuda a financiar a construção de novas casas. 
								Seu envolvimento impacta diretamente a vida de famílias que precisam de um lar seguro e digno. 
								Junte-se a nós e faça a diferença de duas formas!
								</p>
							</div>
							<button className="voluntario-btn-orange">
								{" "}
								Seja um Voluntario-Apoiador!
							</button>
						</div>
						<div className="yellow-box">
							<div>
								<h1 className="yellow-title">SUA PARTE MONETÁRIA</h1>
								<p className="paragraph">
								Sua contribuição nos ajuda a construir lares para famílias em situação de vulnerabilidade. 
								Com cada doação, adquirimos materiais e garantimos que mais pessoas tenham um lar seguro. 
								Doe e faça parte dessa transformação!
								</p>
							</div>
							<button className="voluntario-btn-orange">
								{" "}
								Seja um Voluntario-Apoiador!
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
