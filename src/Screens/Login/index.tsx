import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import logoUrl from "@images/logo-instituto.svg";
import {BackButton} from "../../components/BackButton";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    console.log("Email:", email);
    console.log("Password:", password);

    navigate('/dashboard')
  };

  return (
    <div className="login-container justify-content-center align-items-center vh-100">
      <div className="position-relative">
        <div className="d-flex justify-content-start">
          <BackButton route='/'/>
        </div>

        <div className='login-content'>
          <div className="left-section">
            <div className="overlay">
              <img src={logoUrl} alt="Logo" className="logo"/>
              <h2>Juntos, podemos fazer a diferença!</h2>
              <button className="btn btn-secondary">Seja parte disso!</button>
            </div>
          </div>
          <div className="right-section card p-4">
            <h2 className="login-title text-center mb-4">Entrar na sua conta</h2>
            <LoginForm onLogin={handleLogin}/>
          </div>
        </div>
      </div>
    </div>
  );
};
