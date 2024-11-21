import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoUrl from "@images/logo-instituto.svg";
import Button from "../Button";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

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

        <button className="menu-button" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li className="nav-item">
            <Link to="/noticias" className="link">
              Notícias
            </Link>
          </li>
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
            <Link to="/sobre" className="link">
              Sobre nós
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contatos" className="link">
              Fale conosco
            </Link>
          </li>
          <li className="nav-item">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                navigate("/doacoes");
              }}
            >
              DOE AGORA
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
