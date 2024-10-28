import '@styles/global.scss';
import '@styles/atualizarInformacoes.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { getBeneficiario, updateBeneficiario } from '../../../services/beneficiaries/beneficiariesApi';

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

const AtualizarInformacoes = () => {
    const navigate = useNavigate();
    const { familiaId } = useParams();

    const [nomeFamilia, setNomeFamilia] = useState('');
    const [statusFamilia, setStatusFamilia] = useState('');
    const [nomePrincipal, setNomePrincipal] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [rendaMensal, setRendaMensal] = useState(0);
    const [telefone1, setTelefone1] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [comoChegou, setComoChegou] = useState('');
    const [familiarExtras, setFamiliarExtras] = useState('');
    const [dadosImovel, setDadosImovel] = useState('');
    const [necessidadeFamilia, setNecessidadeFamilia] = useState('');
    const [members, setMembers] = useState([]); // Example placeholder for family members

    useEffect(() => {
        const fetchFamilia = async () => {
            try {
                if (familiaId) {
                    const familia = await getBeneficiario(familiaId);
                    if (!familia) {
                        console.error("Family data not found (404): Invalid familiaId.");
                        return;
                    }
                    setNomeFamilia(familia.nomeFamilia || "");
                    setStatusFamilia(familia.statusFamilia || "");
                    setNomePrincipal(familia.nomePrincipal || "");
                    setCpf(familia.cpf || "");
                    setEndereco(familia.endereco || "");
                    setCep(familia.cep || "");
                    setRendaMensal(familia.rendaMensal || 0);
                    setTelefone1(familia.telefone1 || "");
                    setTelefone2(familia.telefone2 || "");
                    setComoChegou(familia.comoChegou || "");
                    setFamiliarExtras(familia.familiarExtras || "");
                    setDadosImovel(familia.dadosImovel || "");
                    setNecessidadeFamilia(familia.necessidadeFamilia || "");
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    console.error(`Error fetching family data: ${err.response?.status} - ${err.message}`);
                } else {
                    console.error("Unknown error occurred: ", err);
                }
            }
        };
        fetchFamilia();
    }, [familiaId]);

    const validateData = () => {
        if (!nomeFamilia || !statusFamilia || !nomePrincipal || !cpf || !endereco || !cep || !rendaMensal || !telefone1 || !familiarExtras || !dadosImovel || !necessidadeFamilia) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }
        if (cpf.length !== 11) {
            alert('CPF deve ter 11 caracteres.');
            return false;
        }
        if (cep.length !== 8) {
            alert('CEP deve ter 8 caracteres.');
            return false;
        }
        return true;
    };

    const atualizarFamilia = async () => {
        if (!validateData()) {
            return;
        }

        const data = {
            nomeFamilia,
            statusFamilia,
            nomePrincipal,
            cpf,
            endereco,
            cep,
            rendaMensal,
            telefone1,
            telefone2,
            comoChegou,
            familiarExtras,
            dadosImovel,
            necessidadeFamilia,
        };

        try {
            if (familiaId) {
                const response = await updateBeneficiario(familiaId, data, members);
                console.log("Família atualizada com sucesso!", response);

                if (location.pathname.includes("dashboard")) {
                    navigate('/dashboard/beneficiarios');
                } else {
                    navigate('/beneficiarios');
                }
            }
        } catch (err) {
            console.error("Erro ao atualizar os dados: " + err);
            alert('Erro ao atualizar os dados.');
        }
    };

    const resetForm = () => {
        setNomeFamilia("");
        setStatusFamilia("");
        setNomePrincipal("");
        setCpf("");
        setEndereco("");
        setCep("");
        setRendaMensal(0);
        setTelefone1("");
        setTelefone2("");
        setComoChegou("");
        setFamiliarExtras("");
        setDadosImovel("");
        setNecessidadeFamilia("");
        if (location.pathname.includes("dashboard")) {
            navigate('/dashboard/beneficiarios');
        } else {
            navigate('/beneficiarios');
        }
    };

    return (
        <div className="atualizar-informacoes">
            <h1 className="subtitle">Atualizar Informações da Família</h1>
            <p className="description">
                Preencha os campos abaixo para atualizar as informações da família.
            </p>
            <div className="form-control">
                <div className='input-group'>
                    <label>Nome da Família:</label>
                    <input
                        type="text"
                        value={nomeFamilia}
                        onChange={(e) => setNomeFamilia(e.target.value)}
                        placeholder="Nome da Família"
                    />
                    
                    <label>Nome Principal:</label>
                    <input
                        type="text"
                        value={nomePrincipal}
                        onChange={(e) => setNomePrincipal(e.target.value)}
                        placeholder="Nome Principal"
                    />

                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="CPF"
                    />

                    <label>Endereço:</label>
                    <input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Endereço"
                    />

                    <label>CEP:</label>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="CEP"
                    />

                    <label>Renda Mensal:</label>
                    <input
                        type="number"
                        value={rendaMensal}
                        onChange={(e) => setRendaMensal(Number(e.target.value))}
                        placeholder="Renda Mensal"
                    />

                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone1}
                        onChange={(e) => setTelefone1(e.target.value)}
                        placeholder="Telefone"
                    />

                    <label>Telefone 2:</label>
                    <input
                        type="text"
                        value={telefone2}
                        onChange={(e) => setTelefone2(e.target.value)}
                        placeholder="Telefone 2"
                    />

                    <label>Como chegou ao instituto:</label>
                    <input
                        type="text"
                        value={comoChegou}
                        onChange={(e) => setComoChegou(e.target.value)}
                        placeholder="Como chegou ao instituto"
                    />
                </div>

                <div className='dropdown-button-group'>
                    <div className="dropdown-group">
                        <label>Status da Família:</label>
                        <select value={statusFamilia} onChange={(e) => setStatusFamilia(e.target.value)} >
                            <option value="">Selecione uma opção</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Negado">Negado</option>
                            <option value="Em análise">Em análise</option>
                        </select>

                        <label>Familiar Extras</label>
                        <select value={familiarExtras} onChange={(e) => setFamiliarExtras(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                        </select>

                        <label>Dados do imóvel</label>
                        <select value={dadosImovel} onChange={(e) => setDadosImovel(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Alugado">Alugado</option>
                            <option value="Outro">Outro</option>
                        </select>

                        <label>Necessidade da Família</label>
                        <select value={necessidadeFamilia} onChange={(e) => setNecessidadeFamilia(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Construção">Construção</option>
                            <option value="Só reforma">Só reforma</option>
                            <option value="Reforma e ampliação">Reforma e ampliação</option>
                            <option value="Doação de materiais de construção">Doação de materiais de construção</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div className='button-group'>
                        <button className="button confirm-btn" onClick={atualizarFamilia}>Confirmar</button>
                        <button className="button discard-btn" onClick={resetForm}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtualizarInformacoes;
