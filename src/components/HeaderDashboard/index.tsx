import { Link } from "react-router-dom";
import logoUrl from "@images/logo-instituto.svg";
import { useState, useEffect, useRef } from "react";
import { logout } from "../../services/authService.ts";
import { userService } from "../../services/userService.ts";
import profileAvatar from "@images/placeholder-avatar.png";
import { TbLogout } from "react-icons/tb";

export function HeaderDashboard() {
  const [userProfile, setUserProfile] = useState<string>(profileAvatar);
  const [userName, setUserName] = useState<string>("Usuário");
  const [role, setRole] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    const user = userService.getUser();
    if (user) {
      setUserProfile(user.profileImage || profileAvatar);
      setUserName(user.username || "Usuário");
      setRole((user.roles && user.roles[0]) || "");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  async function handleLogout() {
    await logout();
  }

  return (
    <nav className="navbar d-flex align-items-center">
      <div className="logo d-flex align-items-center">
        <Link
          to="/dashboard"
          className="link logo-box d-flex align-items-center"
        >
          <img className="logo-icon" src={logoUrl} alt="Logo" />
          <div className="d-flex flex-column justify-content-center">
            <span>INSTITUTO</span>
            <b>JOÃO DE BARRO</b>
          </div>
        </Link>
      </div>

      <div className="d-flex position-relative me-5" ref={dropdownRef}>
        <div className="d-flex flex-column">
          {userName && (
            <span
              className="me-3 text-white text-end fw-bold"
              style={{ fontSize: "1rem" }}
            >
              {userName || "Não definido"}
            </span>
          )}
          {role && (
            <span
              className="me-3 text-white text-end fw-bold"
              style={{ fontSize: "1rem" }}
            >
              {role || "Não definido"}
            </span>
          )}
        </div>
        <img
          src={userProfile}
          alt="User Profile"
          className="rounded-circle"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={toggleDropdown}
        />

        {dropdownOpen && (
          <div
            className="dropdown-menu show position-absolute end-0 mt-2"
            style={{ minWidth: "150px" }}
          >
            <Link className="dropdown-item" to="/perfil">
              Perfil
            </Link>
            <Link className="dropdown-item" to="/config">
              Configurações
            </Link>
            <button className="dropdown-item" onClick={handleLogout}>
              <TbLogout /> Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
