import main_imagem from "../../../assets/images/apoiador/main_image.svg";
import "./style.css";

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
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
						Reprehenderit consequatur placeat deleniti est veniam necessitatibus facilis fugiat? 
						Blanditiis, voluptates modi commodi fugiat laudantium aperiam. 
						Incidunt aperiam quas similique eius! Exercitationem.
					</div>
					
					<button className="voluntario-btn"> Seja um Apoiador!</button>
					<div className="yellow-container">
						<div className="yellow-box">
							<div>
								<h1 className="yellow-title">
									DOAÇÕES MONETÁRIAS
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
								Faça sua doação!
							</button>
						</div>
						<div className="yellow-box">
							<div>
								<h1 className="yellow-title">DOAÇÕES MATERIAIS</h1>
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
								Fça uma doação!
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
