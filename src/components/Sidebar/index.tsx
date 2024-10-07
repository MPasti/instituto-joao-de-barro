import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { logout } from "../../services/authService.ts";
import { TbLogout } from "react-icons/tb";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

async function handleLogout() {
  await logout();
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <IoClose
            size={32}
            color="#FFF"
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <div className="sidebar-content">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="perfil">Perfil</Link>
        </div>
        <div className="sidebar-footer">
          <hr />
          <button className="logout-button" onClick={handleLogout}>
            <TbLogout size={24} /> Sair
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
