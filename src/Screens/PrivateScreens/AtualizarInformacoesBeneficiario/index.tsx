import '@styles/global.scss';
import './atualizarInformacoes.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { BenefStatus, getBeneficiaryById, getUserByBeneficiaryId, updateBeneficiary } from '../../../services/beneficiaries/beneficiariesApi';
import { getFamilyMembersByBeneficiaryId } from '../../../services/beneficiaries/familyApi';
import toast from "react-hot-toast";

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

const AtualizarInformacoes = () => {
    const navigate = useNavigate();
    const { familiaId } = useParams();

    // Estados para todos os campos do formulário
    const [nomeFamilia, setNomeFamilia] = useState<string>('');
    const [statusFamilia, setStatusFamilia] = useState<BenefStatus>(BenefStatus.ATIVO);
    const [nomePrincipal, setNomePrincipal] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [rendaMensal, setRendaMensal] = useState<number>(0);
    const [telefone1, setTelefone1] = useState<string>('');
    const [telefone2, setTelefone2] = useState<string>('');
    const [comoChegou, setComoChegou] = useState<string>('');
    const [familiarExtras, setFamiliarExtras] = useState<string>('');
    const [dadosImovel, setDadosImovel] = useState<string>('');
    const [necessidadeFamilia, setNecessidadeFamilia] = useState<string>('');
    const [members, setMembers] = useState<FamilyMember[]>([]);

    useEffect(() => {
        const fetchFamilia = async () => {
            try {
                if (familiaId) {
                    // Pegar o beneficiário
                    const familia = await getBeneficiaryById(Number(familiaId));
                    if (!familia) {
                        console.error("Beneficiário não encontrado");
                        return;
                    }

                    // Setando os dados do beneficiário
                    setNomeFamilia(familia.name || "");
                    setStatusFamilia(familia.status || BenefStatus.ATIVO);
                    setNomePrincipal(familia.indicatorName || "");
                    setCpf(familia.userId?.toString() || "");
                    setEndereco(familia.houseStatus || "");
                    setCep(familia.indicationDate.toString() || "");
                    setRendaMensal(familia.monthlyIncome || 0);

                    // Carregar dados do usuário associado ao beneficiário
                    const user = await getUserByBeneficiaryId(familia.userId!);
                    if (user) {
                        setTelefone1(user.userInfo.phone1 || "");
                        setTelefone2(user.userInfo.phone2 || "");
                    }

                    // Carregar membros da família
                    const membros = await getFamilyMembersByBeneficiaryId(Number(familiaId));
                    setMembers(membros);
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error("Erro ao buscar dados:", error.message);
                } else {
                    console.error("Erro desconhecido:", error);
                }
            }
        };

        fetchFamilia();
    }, [familiaId]);

    // Função para atualizar dados do beneficiário
    const handleUpdateBeneficiary = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedBeneficiary = {
                name: nomeFamilia,
                status: statusFamilia,
                meetDescription: comoChegou,
                indicatorName: nomePrincipal,
                monthlyIncome: rendaMensal,
                indicationDate: new Date(),
                houseStatus: endereco,
                phone1: telefone1,
                phone2: telefone2,
                zipCode: cep,
                extraInfo: familiarExtras,
                propertyInfo: dadosImovel,
                familyNeed: necessidadeFamilia
            };

            if (familiaId) {
                await updateBeneficiary(updatedBeneficiary);
                toast.error('Informações do beneficiário atualizadas com sucesso!');
                navigate(`/detalhes-familia/${familiaId}`);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                console.error("Erro ao atualizar as informações do beneficiário:", error.message);
            } else {
                console.error("Erro desconhecido:", error);
            }
        }
    };

    // Função para editar dados de um membro da família
    const handleEditFamilyMember = (memberId: number) => {
        navigate(`/editar-membro/${memberId}`);
    };

    return (
        <div className="atualizar-informacoes">
            <h1>Atualizar Informações do Beneficiário</h1>
            <form onSubmit={handleUpdateBeneficiary}>
                {/* Campos para os dados do beneficiário */}
                <label htmlFor="nomeFamilia">Nome da Família:</label>
                <input
                    type="text"
                    id="nomeFamilia"
                    value={nomeFamilia}
                    onChange={(e) => setNomeFamilia(e.target.value)}
                />
                
                <label htmlFor="statusFamilia">Status da Família:</label>
                <select
                    id="statusFamilia"
                    value={statusFamilia}
                    onChange={(e) => setStatusFamilia(e.target.value as BenefStatus)}
                >
                    <option value={BenefStatus.ATIVO}>Ativo</option>
                    <option value={BenefStatus.INATIVO}>Inativo</option>
                </select>

                <label htmlFor="nomePrincipal">Nome do Responsável:</label>
                <input
                    type="text"
                    id="nomePrincipal"
                    value={nomePrincipal}
                    onChange={(e) => setNomePrincipal(e.target.value)}
                />

                <label htmlFor="cpf">CPF do Responsável:</label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <label htmlFor="endereco">Endereço:</label>
                <input
                    type="text"
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />

                <label htmlFor="cep">CEP:</label>
                <input
                    type="text"
                    id="cep"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />

                <label htmlFor="rendaMensal">Renda Mensal:</label>
                <input
                    type="number"
                    id="rendaMensal"
                    value={rendaMensal}
                    onChange={(e) => setRendaMensal(Number(e.target.value))}
                />

                <label htmlFor="telefone1">Telefone 1:</label>
                <input
                    type="text"
                    id="telefone1"
                    value={telefone1}
                    onChange={(e) => setTelefone1(e.target.value)}
                />

                <label htmlFor="telefone2">Telefone 2:</label>
                <input
                    type="text"
                    id="telefone2"
                    value={telefone2}
                    onChange={(e) => setTelefone2(e.target.value)}
                />

                <label htmlFor="comoChegou">Como chegou ao programa:</label>
                <input
                    type="text"
                    id="comoChegou"
                    value={comoChegou}
                    onChange={(e) => setComoChegou(e.target.value)}
                />

                <label htmlFor="familiarExtras">Informações extras da família:</label>
                <input
                    type="text"
                    id="familiarExtras"
                    value={familiarExtras}
                    onChange={(e) => setFamiliarExtras(e.target.value)}
                />

                <label htmlFor="dadosImovel">Informações do imóvel:</label>
                <input
                    type="text"
                    id="dadosImovel"
                    value={dadosImovel}
                    onChange={(e) => setDadosImovel(e.target.value)}
                />

                <label htmlFor="necessidadeFamilia">Necessidades da família:</label>
                <input
                    type="text"
                    id="necessidadeFamilia"
                    value={necessidadeFamilia}
                    onChange={(e) => setNecessidadeFamilia(e.target.value)}
                />

                <button type="submit">Salvar alterações</button>
            </form>

            <h2>Membros da Família</h2>
            <ul>
                {members.map((member) => (
                    <li key={member.id}>
                        <span>{member.familyName}</span>
                        <button onClick={() => handleEditFamilyMember(member.id!)}>Editar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AtualizarInformacoes;
