import main_imagem from "../../../assets/images/colaborador/main_imagem.svg";
import image from "../../../assets/images/colaborador/image.svg";
import "./style.css";

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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Pellentesque et.
					</div>
					<div className="text-container">
						<img
							src={image}
							alt="Right Top Image"
							className="right-image-top"
						/>
						<div>
							<h1 className="info-title">
								O que significa ser Colaborador?
							</h1>
							<p className="paragraph">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Nulla suscipit recusandae, earum molestiae neque enim
								maiores labore et commodi consequatur magni quaerat
								tempore autem esse accusantium? Numquam quibusdam ipsam
								magnam.
							</p>
						</div>
					</div>
					<button className="voluntario-btn"> Seja um Colaborador!</button>
					<div className="yellow-container">
						<div className="yellow-box">
							<div>
								<h1 className="yellow-title">
									SUA PARTE COMO APOIADOR
								</h1>
								<p className="paragraph">
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Quas fugit accusantium iure minus vitae error
									dolore qui eaque esse voluptate possimus
									necessitatibus explicabo blanditiis exercitationem
									fuga, asperiores pariatur quisquam ut.
								</p>
							</div>
							<button className="voluntario-btn-orange">
								{" "}
								Seja um Colaborador!
							</button>
						</div>
						<div className="yellow-box">
							<div>
								<h1 className="yellow-title">SUA PARTE MONETÁRIA</h1>
								<p className="paragraph">
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Quas fugit accusantium iure minus vitae error
									dolore qui eaque esse voluptate possimus
									necessitatibus explicabo blanditiis exercitationem
									fuga, asperiores pariatur quisquam ut.
								</p>
							</div>
							<button className="voluntario-btn-orange">
								{" "}
								Seja um Colaborador!
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
