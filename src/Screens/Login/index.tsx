import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import logoUrl from "@images/logo-instituto.svg";
import { BackButton } from "../../components/BackButton";
import { isAuthenticated, login } from "../../services/authService.ts";
import { toast } from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (userName: string, password: string) => {
    console.log("Username:", userName);
    console.log("Password:", password);

    const response = await login(userName, password);
    if (response?.success) {
      navigate("/dashboard");
    } else {
      toast.error(response?.message || "Falha ao realizar Login");
    }
  };

  useEffect(() => {
    const isAuth = isAuthenticated();

    if (isAuth) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-container justify-content-center align-items-center vh-100">
      <div className="position-relative">
        <div className="d-flex justify-content-start">
          <BackButton route="/" />
        </div>

        <div className="login-content">
          <div className="left-section">
            <div className="overlay">
              <img src={logoUrl} alt="Logo" className="logo" />
              <h2>Juntos, podemos fazer a diferença!</h2>
              <button className="btn btn-secondary">Seja parte disso!</button>
            </div>
          </div>
          <div className="right-section card p-4">
            <h2 className="login-title text-center mb-4">
              Entrar na sua conta
            </h2>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
