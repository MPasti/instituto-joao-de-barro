import { Link } from "react-router-dom";
import logoUrl from "@images/logo-instituto.svg";

export function HeaderDashboard() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/dashboard" className="link logo-box">
                    <img className="logo-icon" src={logoUrl} alt="Logo" />
                    <div className="column justify-content-center">
                        <span>INSTITUTO</span>
                        <b>JOÃO DE BARRO</b>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
