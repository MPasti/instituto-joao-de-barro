import { Link } from "react-router-dom";
import logoUrl from "@images/logo-instituto.svg";
import Button from "../Button";
import { FaUserCircle } from "react-icons/fa";

export function Navbar() {
  return (
    <div>
      <div className="header-options">
        <div className="login-options">
          <Link to="/login" className="link">
            Acessar sua conta
          </Link>
          <FaUserCircle size={20} />
        </div>
      </div>
      <nav className="navbar justify-content-between">
        <div className="logo">
          <Link to="/" className="link logo-box">
            <img className="logo-icon" src={logoUrl} alt="Logo" />
            <div className="column justify-content-center">
              <span>INSTITUTO</span>
              <b>JOÃO DE BARRO</b>
            </div>
          </Link>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/voluntarios" className="link">
              Voluntários
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/beneficiarios" className="link">
              Beneficiários
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contatos" className="link">
              Contatos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sobre" className="link">
              Sobre o Instituto
            </Link>
          </li>
          <li>
            <Button type="button" variant="secondary">
              DOE AGORA
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
