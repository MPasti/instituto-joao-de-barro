import { useState } from "react";
import "@styles/global.scss";
import "./registro.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { registerBeneficiaryAndUser } from "../../../services/beneficiaries/beneficiariesApi";
import toast from "react-hot-toast";

const Registro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // User states
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UserInfo states
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdayDate, setBirthdayDate] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  // Beneficiary states
  const [indicatorName, setIndicatorName] = useState("");
  const [indicationDate, setIndicationDate] = useState(new Date());
  const [houseStatus, setHouseStatus] = useState("");
  const [meetDescription, setMeetDescription] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [status, setStatus] = useState<BenefStatus>();

  // Family members
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  const validateForm = () => {
    if (!email || !cpf || !password || !confirmPassword) {
      toast.error("Preencha todos os campos obrigatórios do usuário.");
      return false;
    }
    if (!name || !lastName || !birthdayDate || !phone1) {
      toast.error("Preencha todos os campos obrigatórios do UserInfo.");
      return false;
    }
    if (
      !indicatorName ||
      !indicationDate ||
      !houseStatus ||
      !meetDescription ||
      !monthlyIncome ||
      !status
    ) {
      toast.error("Preencha todos os campos obrigatórios do beneficiário.");
      return false;
    }
    if (cpf.length !== 11) {
      toast.error("O CPF deve ter 11 dígitos.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return false;
    }
    return true;
  };

  const [privacyChecked, setPrivacyChecked] = useState(false);

  const createFamilia = async () => {
    if (!validateForm()) return;

    const userInfo: UserInfo = {
      name,
      lastName,
      birthdayDate: new Date(birthdayDate),
      phone1,
      phone2,
      createdAt: new Date(),
      active: true,
      profilePic: new Uint8Array(0),
    };

    const benefUser: BenefUser = {
      email,
      cpf,
      password,
      createdAt: new Date(),
      userInfo,
    };

    const beneficiary: Beneficiary = {
      name,
      indicatorName,
      indicationDate,
      houseStatus,
      meetDescription,
      monthlyIncome,
      status: status ?? BenefStatus.NECESSITA_ATENCAO,
    };

    try {
      await registerBeneficiaryAndUser({
        benefUser,
        beneficiary,
        familyMembers,
      });
      if (location.pathname.includes("dashboard")) {
        navigate("/dashboard/beneficiarios");
      } else {
        navigate("/beneficiarios");
      }
    } catch (err) {
      console.error("Erro durante o registro:", err);
      toast.error("Erro ao registrar a família.");
    }
  };

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      {
        familyName: "",
        kinship: "",
        scholarity: "",
        income: 0,
        incomeDescription: "",
        healthyProblems: "",
      },
    ]);
  };

  const updateFamilyMember = (
    index: number,
    field: keyof FamilyMember,
    value: any,
  ) => {
    const updatedMembers = familyMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member,
    );
    setFamilyMembers(updatedMembers);
  };

  return (
    <div className="registro">
      <h1 className="subtitle">Registro</h1>
      <p className="description">
        Preencha os detalhes abaixo para registrar uma família no programa de
        assistência.
      </p>
      <div className="form-control">
        {/* Campos do usuário */}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Campos do UserInfo */}
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Sobrenome:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={birthdayDate}
          onChange={(e) => setBirthdayDate(e.target.value)}
        />

        <label>Telefone 1:</label>
        <input
          type="text"
          value={phone1}
          onChange={(e) => setPhone1(e.target.value)}
        />

        <label>Telefone 2:</label>
        <input
          type="text"
          value={phone2}
          onChange={(e) => setPhone2(e.target.value)}
        />

        {/* Campos do beneficiário */}
        <label>Nome do Indicador:</label>
        <input
          type="text"
          value={indicatorName}
          onChange={(e) => setIndicatorName(e.target.value)}
        />

        <label>Data da Indicação:</label>
        <input
          type="date"
          value={indicationDate.toISOString().split("T")[0]}
          onChange={(e) => setIndicationDate(new Date(e.target.value))}
        />

        <label>Situação da Moradia:</label>
        <input
          type="text"
          value={houseStatus}
          onChange={(e) => setHouseStatus(e.target.value)}
        />

        <label>Como conheceu o programa:</label>
        <input
          type="text"
          value={meetDescription}
          onChange={(e) => setMeetDescription(e.target.value)}
        />

        <label>Renda Mensal:</label>
        <input
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />

        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as BenefStatus)}
        >
          <option value="">Selecione</option>
          <option value={"NECESSITA_ATENCAO"}>Necessita Atenção</option>
          <option value={"EM_ANALISE"}>Em Análise</option>
          <option value={"APROVADO"}>Aprovado</option>
        </select>

        {/* Membros da família */}
        <label>Membros da Família:</label>
        {familyMembers.map((member, index) => (
          <div key={index} className="family-member">
            <input
              type="text"
              placeholder="Nome"
              value={member.familyName}
              onChange={(e) =>
                updateFamilyMember(index, "familyName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Parentesco"
              value={member.kinship}
              onChange={(e) =>
                updateFamilyMember(index, "kinship", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Escolaridade"
              value={member.scholarity}
              onChange={(e) =>
                updateFamilyMember(index, "scholarity", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Renda"
              value={member.income}
              onChange={(e) =>
                updateFamilyMember(index, "income", Number(e.target.value))
              }
            />
            <input
              type="text"
              placeholder="Descrição da Renda"
              value={member.incomeDescription}
              onChange={(e) =>
                updateFamilyMember(index, "incomeDescription", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Problemas de Saúde"
              value={member.healthyProblems}
              onChange={(e) =>
                updateFamilyMember(index, "healthyProblems", e.target.value)
              }
            />
          </div>
        ))}

        <div className="privacy-policy-container">
          <input
            type="checkbox"
            id="privacy-policy"
            className="privacy-policy"
            checked={privacyChecked}
            onChange={(e) => setPrivacyChecked(e.target.checked)}
          />
          <label htmlFor="privacy-policy">
            Eu concordo com as políticas de privacidade.
          </label>
        </div>
        <button className="btn-secondary" onClick={addFamilyMember}>
          + Adicionar Membro
        </button>

        <button
          className="btn-primary"
          onClick={createFamilia}
          disabled={!privacyChecked}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Registro;
