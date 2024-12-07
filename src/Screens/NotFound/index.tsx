import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center p-5">
      <h1>404 - Página não encontrada</h1>
      <p>A rota que você tentou acessar não existe.</p>
      <Button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Voltar para a página inicial
      </Button>
    </div>
  );
};
