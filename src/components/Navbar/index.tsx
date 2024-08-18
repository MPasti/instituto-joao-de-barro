import logoUrl from "@images/logo-instituto.svg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#home" className="link logo-box">
          <img className="logo-icon" src={logoUrl} alt="Logo" />
          <div className="column justify-content-center">
            <span>INSTITUTO </span>
            <b>JOÂO DE BARRO</b>
          </div>
        </a>
      </div>
      <ul className="navLinks">
        <li className="navItem">
          <a href="#about" className="link">
            Voluntários
          </a>
        </li>
        <li className="navItem">
          <a href="#projects" className="link">
            Beneficiários
          </a>
        </li>
        <li className="navItem">
          <a href="#skills" className="link">
            Contatos
          </a>
        </li>
        <li className="navItem">
          <a href="#contact" className="link">
            Sobre o Instituto
          </a>
        </li>
        <li className="navItem">
          <a href="#contact" className="link">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}
