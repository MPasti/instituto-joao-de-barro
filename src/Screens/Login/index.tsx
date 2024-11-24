import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import logoUrl from "@images/logo-instituto.svg";
import { BackButton } from "../../components/BackButton";
import { isAuthenticated, login } from "../../services/authService.ts";
import { toast } from "react-hot-toast";
import Button from "../../components/Button";

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
    <div className="login-container">
      <div className="position-relative">
        <div className="d-flex justify-content-start">
          <BackButton route="/" />
        </div>

        <div className="login-content">
          <div className="left-section">
            <div className="overlay d-flex flex-column justify-content-center align-items-center">
              <img src={logoUrl} alt="Logo" className="logo" />
              <h2>Juntos, podemos fazer a diferença!</h2>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  navigate("/voluntarios");
                }}
              >
                Se torne um voluntário
              </Button>
            </div>
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};
