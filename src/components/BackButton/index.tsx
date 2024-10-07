import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface BackButtonProps {
  route: string;
}

export const BackButton = ({ route }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-start mb-3 m-3 back-button"
      onClick={() => navigate(route)}
    >
      <MdOutlineKeyboardArrowLeft size={32} />
      <p>Voltar</p>
    </div>
  );
};
