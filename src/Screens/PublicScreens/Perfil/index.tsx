import main_imagem from "../../../assets/images/apoiador/main_image.svg";
import './style.css'

export function Perfil() {

  const user = {
    name: "teste"
  }

  return (
    <>
    <div className="parent-container">
				<div
					className="main-image-container"
					style={{ backgroundImage: `url(${main_imagem})` }}
				/>
				<div className="content-container">
					<div className="profile_header">
            <div className="profile_pic" style={{backgroundColor: "black"}}/>
            <div className="profile name and options">
              <div className="profile_name">
                <h1 className="title">SEJA BEM VINDO(A),</h1>
                <span className="sub_title">{user.name}</span>
                <div className="profile_options">
                <button className="voluntario-btn">
								Editar perfil
							</button>
              <button className="voluntario-btn">
								icone 1
							</button>
              <button className="voluntario-btn">
								icone 2
							</button>
                </div>
              </div>
            </div>
          </div>
				</div>
			</div> 
    </>
  )
}
