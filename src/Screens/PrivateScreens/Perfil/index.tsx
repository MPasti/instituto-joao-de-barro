import { Button } from "@headlessui/react";
import main_imagem from "../../../assets/images/perfil/main_image.png";
import "@styles/global.scss";
import "@styles/Perfil.scss";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

// Função para validar CPF
const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let mod = (sum * 10) % 11;
  if (mod === 10 || mod === 11) mod = 0;
  if (mod !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  mod = (sum * 10) % 11;
  if (mod === 10 || mod === 11) mod = 0;

  return mod === parseInt(cpf.charAt(10));
};

export function Perfil() {
  const [user, setUser] = useState(null); // Dados do usuário
  const [isEditing, setIsEditing] = useState(false); // Estado de edição
  const [editedUser, setEditedUser] = useState({}); // Dados editados
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  }); // Campos de senha

  useEffect(() => {
    // Simula uma API call para carregar os dados do usuário
    setTimeout(() => {
      const userData = {
        nome: "Teste",
        sobrenome: "Silva",
        cargo: "Voluntário",
        email: "joao@exemplo.com",
        telefone: "(19) 99999-9999",
        cpf: "123.456.789-00",
        sobre_voce: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius officiis consequuntur ullam alias voluptas voluptate, illum nesciunt, quis doloribus, reprehenderit ipsum mollitia sapiente et quidem delectus natus repudiandae quas quam.",
        hobby: "Ler e caminhar",
        intencao: "Contribuir com a comunidade",
        senha: "********", // Exibição da senha mascarada no modo normal
        profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45iQj2fcsxmcYxFHonYE6UG3uaFPMQpJr5Q&s",
      };
      setUser(userData);
      setEditedUser(userData); // Inicializa os dados editáveis com os dados do usuário
    }, 1000); // Simula um atraso de 1 segundo
  }, []);

  // Função para alternar o estado de edição
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Limpa os campos de nova senha ao iniciar a edição
      setPasswords({ newPassword: "", confirmPassword: "" });
    }
  };

  // Função para atualizar os valores dos campos de edição
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Função para atualizar os valores dos campos de senha
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Função para salvar as alterações
  const saveChanges = () => {
    const errors = [];
    const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Valida a senha e a confirmação de senha
    if (passwords.newPassword && !senhaRegex.test(passwords.newPassword)) {
      errors.push("newPassword");
      errors.push("confirmPassword");
      alert(
        "A nova senha deve ter entre 8-30 caracteres, incluir letras maiúsculas e caracteres especiais."
      );
    }

    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      errors.push("confirmPassword");
      alert("As senhas não coincidem!");
    }

    // Valida o CPF
    if (!isValidCPF(editedUser.cpf)) {
      errors.push("cpf");
      alert("CPF inválido!");
    }

    // Valida o e-mail
    if (!emailRegex.test(editedUser.email)) {
      errors.push("email");
      alert("E-mail inválido!");
    }

    // Se houver erros, não salva as alterações
    if (errors.length > 0) {
      return;
    }

    // Atualiza os dados do usuário
    const updatedUser = { ...editedUser };
    if (passwords.newPassword) {
      updatedUser.senha = "********"; // Atualiza a senha mascarada
    }

    setUser(updatedUser); // Salva os dados atualizados
    setIsEditing(false); // Sai do modo de edição
    alert("Perfil atualizado com sucesso!");
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className="perfil-container">
        <div className="parent-container">
          <div
            className="main-image-container"
            style={{ backgroundImage: `url(${main_imagem})` }}
          />
          <div className="content-container">
            <div className="profile_header">
              <div className="profile_pic" style={{ backgroundColor: "red" }}>
                <img src={user.profilePicture} alt="Perfil" />
              </div>
              <div className="profile name and options">
                <div className="profile_name">
                  <h1 className="title">SEJA BEM VINDO(A),</h1>
                  <span className="sub_title">{user.nome} {user.sobrenome}</span>
                  <span className="sub_sub_title">{user.cargo}</span>
                  <div className="profile_options">
                    <Button className="voluntario-btn" onClick={toggleEdit}>
                      {isEditing ? "Cancelar" : "Editar perfil"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="yellow-container">
              <div className="yellow-box">
                <div className="yellow-title">SOBRE</div>
                {isEditing ? (
                  <>
                    <label>
                      Nome:
                      <input
                        type="text"
                        maxLength={100}
                        name="nome"
                        value={editedUser.nome}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Sobrenome:
                      <input
                        type="text"
                        maxLength={100}
                        name="sobrenome"
                        value={editedUser.sobrenome}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      CPF:
                      <InputMask
                        mask="999.999.999-99"
                        value={editedUser.cpf}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, cpf: e.target.value })
                        }
                      >
                        {(inputProps) => <input {...inputProps} type="text" />}
                      </InputMask>
                    </label>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Telefone:
                      <InputMask
                        mask="(99) 99999-9999"
                        name="telefone"
                        value={editedUser.telefone}
                        onChange={handleChange}
                      >
                        {(inputProps) => <input {...inputProps} type="tel" />}
                      </InputMask>
                    </label>
                    <label>
                      Nova senha:
                      <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </label>
                    <label>
                      Confirmar nova senha:
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div><strong>Nome: </strong>{user.nome}</div>
                    <div><strong>Sobrenome: </strong>{user.sobrenome}</div>
                    <div><strong>CPF: </strong>{user.cpf}</div>
                    <div><strong>Email: </strong>{user.email}</div>
                    <div><strong>Senha: </strong>{user.senha}</div>
                    <div><strong>Telefone: </strong>{user.telefone}</div>
                  </>
                )}
              </div>
              <div className="yellow-box">
                <div className="yellow-title">PESSOAL</div>
                {isEditing ? (
                  <>
                    <label>
                      Intenção:
                      <input
                        type="text"
                        maxLength={200}
                        name="intencao"
                        value={editedUser.intencao}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Hobby:
                      <input
                        type="text"
                        maxLength={150}
                        name="hobby"
                        value={editedUser.hobby}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Sobre você:
                      <textarea
                        maxLength={240}
                        name="sobre_voce"
                        value={editedUser.sobre_voce}
                        onChange={handleChange}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div><strong>Intenção: </strong>
                    {user.intencao}
                    </div>
                    <div><strong>Hobby: </strong>
                    {user.hobby}
                    </div>
                    <div><strong>Sobre Você: </strong></div>
                    <div>
                    {user.sobre_voce}
                    </div>
                  </>
                )}
              </div>
            </div>
            {isEditing && (
              <Button className="voluntario-btn" onClick={saveChanges}>
                Salvar modificações
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
