import { FaFacebook, FaInstagram } from "react-icons/fa6";
import logoUrl from "@images/black-white-logo.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container-fluid">
        <footer className="py-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <img className="footer-logo mb-3" src={logoUrl} alt="Logo" />
              <h5 className="text-uppercase fw-bolder">
                Instituto João de Barro
              </h5>
              <p>Grupo Solidário de Apoio à Moradia</p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="fw-bold">Instituto João de Barro</h5>
              <p>Rua Tiburcio Barbosa Sandoval, 204, Vila Nicacio</p>
              <p>Franca - SP, 14405-108</p>
              <p>CNPJ: 26.345.732/0001-07</p>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="fw-bold">Atalhos</h5>
              <ul className="nav flex-column">
                <li className="mb-2">
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/beneficiarios" className="link">
                    Voluntários
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/voluntarios" className="link">
                    Voluntários
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/sobre" className="link">
                    Sobre o Instituto
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contatos" className="link">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="fw-bold">Siga-nos</h5>
              <ul className="list-unstyled d-flex">
                <li>
                  <a
                    className="link-emphasis text-light"
                    href="https://www.facebook.com/joao.de.barro.franca/"
                  >
                    <FaFacebook size={28} />
                  </a>
                </li>
                <li className="ms-3">
                  <a
                    className="link-emphasis text-light"
                    href="https://www.instagram.com/instituto_joaodebarro_franca/"
                  >
                    <FaInstagram size={28} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2024 Instituto João de Barro. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
