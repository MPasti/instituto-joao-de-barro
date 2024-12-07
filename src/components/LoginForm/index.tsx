import { useState } from "react";
import Button from "../Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginProps {
  onLogin: (userName: string, password: string) => void;
  onResetPassword: (email: string) => void;
}

const LoginForm = ({ onLogin, onResetPassword }: LoginProps) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userName, password);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResetPassword(email);
  };

  return (
    <div className="right-section card p-4">
      {resetPassword ? (
        <>
          <h2 className="text-center mb-4">Redefinir senha</h2>
          <form onSubmit={handleResetSubmit} className="form-control border-0">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email cadastrado
              </label>
              <input
                type="email"
                className="form-control w-100"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Insira o email cadastrado"
              />
            </div>
            <Button type="submit" className="w-100">
              Enviar email de redefinição
            </Button>
          </form>
          <div
            className="mt-3 text-secondary text-center cursor-pointer"
            onClick={() => setResetPassword(false)}
          >
            Voltar para login
          </div>
        </>
      ) : (
        <>
          <h2 className="text-primary text-center mb-4">Entrar na sua conta</h2>
          <form onSubmit={handleLoginSubmit} className="form-control border-0">
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Usuário
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Entre com seu CPF ou Email"
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Entre com a sua senha"
                />
                <span
                  className="input-group-text cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div
              className="forgot-password mt-1 mb-3 text-secondary text-center cursor-pointer"
              onClick={() => setResetPassword(true)}
            >
              Esqueci minha senha
            </div>
            <Button type="submit" className="w-100">
              Login
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
