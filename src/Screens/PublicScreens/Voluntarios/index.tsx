import people_stack from "../../../assets/images/voluntariado/people_stack.svg";
import grid_image_a from "../../../assets/images/voluntariado/grid_image_a.svg";
import grid_image_b from "../../../assets/images/voluntariado/grid_image_b.svg";
import grid_image_c from "../../../assets/images/voluntariado/grid_image_c.svg";
import "./style.css";

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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Pellentesque et.
					</div>
					<button className="voluntario-btn"> Seja um Voluntário!</button>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </p>
				</div>
			</div>
		</>
	);
}
