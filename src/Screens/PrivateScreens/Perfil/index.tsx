import main_imagem from "../../../assets/images/perfil/main_image.png";
import "@styles/global.scss";
import "@styles/Perfil.scss";

export function Perfil() {
  const user = {
    name: "Teste",
    funcao: "Voluntário",
    genero: "Masculino",
    aniversario: "01/01/2000",
    localizacao: "Franca - SP",
    email: "teste@teste.com.br",
    telefone: "19-99999-9999",
    profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45iQj2fcsxmcYxFHonYE6UG3uaFPMQpJr5Q&s",
  };

  return (
    <>
    <div className="perfil-container">
      <div className="parent-container">
        <div
          className="main-image-container"
          style={{ backgroundImage: `url(${main_imagem})` }}
        />
        <div className="content-container">
          <div className="profile_header">
            <div className="profile_pic" style={{ backgroundColor: "red" }}>
              <img src={user.profilePicture} alt="Perfil" />
            </div>
            <div className="profile name and options">
              <div className="profile_name">
                <h1 className="title">SEJA BEM VINDO(A),</h1>
                <span className="sub_title">{user.name}</span>
                <span className="sub_sub_title">{user.funcao}</span>
                <div className="profile_options">
                  <button className="voluntario-btn">Editar perfil</button>
                  <button className="voluntario-btn">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 9H7V7H17V9Z" fill="currentColor" />
                      <path d="M7 13H17V11H7V13Z" fill="currentColor" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 18V2H22V18H16V22H14C11.7909 22 10 20.2091 10 18H2ZM12 16V18C12 19.1046 12.8954 20 14 20V16H20V4H4V16H12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <button className="voluntario-btn">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14 3V3.28988C16.8915 4.15043 19 6.82898 19 10V17H20V19H4V17H5V10C5 6.82898 7.10851 4.15043 10 3.28988V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3ZM7 17H17V10C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10V17ZM14 21V20H10V21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="yellow-container">
            <div className="yellow-box">
              <div className="yellow-title">SOBRE</div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                    fill="currentColor"
                  />
                </svg> {user.genero}
                
              </div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 10C4.44772 10 4 10.4477 4 11C4 11.5523 4.44772 12 5 12H19C19.5523 12 20 11.5523 20 11C20 10.4477 19.5523 10 19 10H5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4 15C4 14.4477 4.44772 14 5 14H19C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18H5Z"
                    fill="currentColor"
                  />
                </svg> {user.aniversario}
              </div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                    fill="currentColor"
                  />
                </svg> {user.localizacao}
              </div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                    fill="currentColor"
                  />
                </svg> {user.email}
              </div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 10.6868 21.7413 9.38647 21.2388 8.1731C20.7362 6.95996 19.9997 5.85742 19.0711 4.92896C18.1425 4.00024 17.0401 3.26367 15.8268 2.76123C14.6136 2.25854 13.3132 2 12 2V4C13.0506 4 14.0909 4.20703 15.0615 4.60889C16.0321 5.01099 16.914 5.60034 17.6569 6.34326C18.3997 7.08594 18.989 7.96802 19.391 8.93848C19.7931 9.90918 20 10.9495 20 12H22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2 10V5C2 4.44775 2.44772 4 3 4H8C8.55228 4 9 4.44775 9 5V9C9 9.55225 8.55228 10 8 10H6C6 14.4182 9.58173 18 14 18V16C14 15.4478 14.4477 15 15 15H19C19.5523 15 20 15.4478 20 16V21C20 21.5522 19.5523 22 19 22H14C7.37259 22 2 16.6274 2 10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17.5433 9.70386C17.8448 10.4319 18 11.2122 18 12H16.2C16.2 11.4485 16.0914 10.9023 15.8803 10.3928C15.6692 9.88306 15.3599 9.42017 14.9698 9.03027C14.5798 8.64014 14.1169 8.33081 13.6073 8.11963C13.0977 7.90869 12.5515 7.80005 12 7.80005V6C12.7879 6 13.5681 6.15527 14.2961 6.45679C15.024 6.7583 15.6855 7.2002 16.2426 7.75732C16.7998 8.31445 17.2418 8.97583 17.5433 9.70386Z"
                    fill="currentColor"
                  />
                </svg> {user.telefone}
              </div>
            </div>
            <div className="yellow-box">
              <div className="yellow-title">FORMAÇÃO</div>
              <div className="form-input-c">
                <label htmlFor="">Instituição de Ensino</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Instituição de Ensino"
                />
              </div>
              <div className="form-input-c">
                <label htmlFor="">Diploma</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Diploma"
                />
              </div>
              <div className="form-input-c">
                <label htmlFor="">Área de Estudo</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Área de Estudo"
                />
              </div>
            </div>
          </div>
          <div className="yellow-box">
            <div className="yellow-title">EXPERIÊNCIAS E HABILIDADES</div>
            <div className="form-group double-input-container-c">
              <div className="form-input-c">
                <label htmlFor="">Experiências</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Experiências"
                />
              </div>
              <div className="form-input-c">
                <label htmlFor="">Habilidades</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Habilidades"
                />
              </div>
            </div>
            <div className="form-group double-input-container-c">
              <div className="form-input-c">
                <label htmlFor="">Hobby</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Hobby"
                />
              </div>
              <div className="form-input-c">
                <label htmlFor="">Intenção</label>
                <input
                  // type="email"
                  // id="email"
                  // name="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Intenção"
                />
              </div>
            </div>
          </div>
          <button className="voluntario-btn">Salvar modificações</button>
          {/* <h1 className="title">EVENTOS</h1>
          <div className="event-cards">
            <div className="event-card">
              <div className="icon">
                🗓️
              </div>
              <div className="details">
                <h3>Nome Evento - Data | Hora</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>

            <div className="event-card">
              <div className="icon">
                🗓️
                </div>
                <div className="details">
                <h3>Nome Evento - Data | Hora</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
}
