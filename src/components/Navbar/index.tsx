import { Link } from "react-router-dom";
import logoUrl from "@images/logo-instituto.svg";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="link logo-box">
          <img className="logo-icon" src={logoUrl} alt="Logo" />
          <div className="column justify-content-center">
            <span>INSTITUTO</span>
            <b>JOÃO DE BARRO</b>
          </div>
        </Link>
      </div>
      <ul className="navLinks">
        <li className="navItem">
          <Link to="/voluntarios" className="link">
            Voluntários
          </Link>
        </li>
        <li className="navItem">
          <Link to="/beneficiarios" className="link">
            Beneficiários
          </Link>
        </li>
        <li className="navItem">
          <Link to="/contatos" className="link">
            Contatos
          </Link>
        </li>
        <li className="navItem">
          <Link to="/sobre" className="link">
            Sobre o Instituto
          </Link>
        </li>
        <li className="navItem">
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
