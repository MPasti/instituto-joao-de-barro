import { useNavigate } from "react-router-dom";
import "./beneficiarioPerfil.scss"; // Caso queira personalizar o estilo
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	BenefStatus,
	getBeneficiaryByUserId,
	updateBeneficiary,
} from "../../../services/beneficiaries/beneficiariesApi";
import { getFamilyMembersByBeneficiaryId } from "../../../services/beneficiaries/familyApi";

interface BeneficiarioPerfilProps {
	user: BenefUser;
	beneficiary: Beneficiary;
	familyMembers: FamilyMember[];
}

export function BeneficiarioPerfil() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState<BeneficiarioPerfilProps>();

	const getUserAndBeneficiaryData = async () => {
		const { user } = JSON.parse(localStorage.getItem("user") || "{}");
		if (!user?.id) {
			toast.error("Algo deu errado, tente acessar novamente.");
			navigate("/login");
			return;
		}

		try {
			const beneficiary = await getBeneficiaryByUserId(user.id);
			if (!beneficiary) {
				throw new Error("Beneficiário não encontrado");
			}

			const familyMembers = await getFamilyMembersByBeneficiaryId(
				beneficiary.id!
			);

			const data: BeneficiarioPerfilProps = {
				user,
				beneficiary,
				familyMembers,
			};

			setUserData(data);
		} catch (error) {
			console.log("Erro ao buscar o beneficiário", error);
			toast.error("Algo deu errado, tente acessar novamente.");
			navigate("/login");
		}
	};

	const requestUpdate = async () => {
		try {
			beneficiary.status = BenefStatus.NECESSITA_ATENCAO;
			await updateBeneficiary(beneficiary);
		} catch (error) {
			console.log("Erro ao solicitar atualização", error);
			toast.error("Erro ao solicitar atualização, tente novamente.");
		}
	};

	useEffect(() => {
		getUserAndBeneficiaryData();
	}, []);

	if (!userData) {
		return <p>Carregando... caso demore muito atualize a página</p>; // Mostra um feedback enquanto carrega os dados
	}

	const { user, beneficiary, familyMembers } = userData;

	return (
		<div className="beneficiario-perfil">
			<div>
				<h1>Perfil do Beneficiário</h1>
				<button onClick={requestUpdate}>
					Solicitar atualização de dados
				</button>
			</div>
			<section className="section">
				<h2>Dados do Usuário</h2>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>CPF:</strong> {user.cpf}
				</p>
			</section>

			<section className="section">
				<h2>Informações do Beneficiário</h2>
				<p>
					<strong>Nome:</strong> {beneficiary.name}
				</p>
				<p>
					<strong>Indicador:</strong> {beneficiary.indicatorName}
				</p>
				<p>
					<strong>Data de Indicação:</strong>{" "}
					{new Date(beneficiary.indicationDate).toLocaleDateString()}
				</p>
				<p>
					<strong>Situação da Moradia:</strong> {beneficiary.houseStatus}
				</p>
				<p>
					<strong>Como conheceu:</strong> {beneficiary.meetDescription}
				</p>
				<p>
					<strong>Renda Mensal:</strong> {beneficiary.monthlyIncome}
				</p>
				<p>
					<strong>Status:</strong> {beneficiary.status}
				</p>
			</section>

			<section className="section">
				<h2>Membros da Família</h2>
				{familyMembers.length === 0 ? (
					<p>Nenhum membro cadastrado.</p>
				) : (
					familyMembers.map((member, index) => (
						<div key={index} className="family-member">
							<p>
								<strong>Nome:</strong> {member.familyName}
							</p>
							<p>
								<strong>Parentesco:</strong> {member.kinship}
							</p>
							<p>
								<strong>Escolaridade:</strong> {member.scholarity}
							</p>
							<p>
								<strong>Renda:</strong> {member.income}
							</p>
							<p>
								<strong>Descrição da Renda:</strong>{" "}
								{member.incomeDescription}
							</p>
							<p>
								<strong>Problemas de Saúde:</strong>{" "}
								{member.healthyProblems}
							</p>
						</div>
					))
				)}
			</section>
		</div>
	);
}
