import { useState } from 'react';
import '@styles/global.scss';
import '@styles/registro.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerBeneficario } from '../../../services/beneficiaries/beneficiariesApi';

const Registro = () => {
    const navigate = useNavigate();
    const location = useLocation();

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

    const validateForm = () => {
        if (
            !nomeFamilia ||
            !statusFamilia ||
            !nomePrincipal ||
            !cpf ||
            !endereco ||
            !cep ||
            !rendaMensal ||
            !telefone1 ||
            !familiarExtras ||
            !dadosImovel ||
            !necessidadeFamilia
        ) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }

        if (cpf.length !== 11) {
            alert('O CPF deve ter 11 dígitos.');
            return false;
        }

        if (cep.length !== 8) {
            alert('O CEP deve ter 8 dígitos.');
            return false;
        }

        return true;
    };

    const createFamilia = async () => {
        if (!validateForm()) return;

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
            status: 'ATIVO',
        };

        console.log("Data being sent:", data);

        try {
            await registerBeneficario(data)
            if (location.pathname.includes("dashboard")) {
                navigate('/dashboard/beneficiarios');
            } else {
                navigate('/beneficiarios');
            }
        } catch (err) {
            console.log('Erro durante o registro: ' + err);
        }
    };


    // Resetar form
    const resetForm = () => {
        setNomeFamilia('');
        setStatusFamilia('');
        setNomePrincipal('');
        setCpf('');
        setEndereco('');
        setCep('');
        setRendaMensal(0);
        setTelefone1('');
        setTelefone2('');
        setComoChegou('');
        setFamiliarExtras('');
        setDadosImovel('');
        setNecessidadeFamilia('');

        if (location.pathname.includes("dashboard")) {
            navigate('/dashboard/beneficiarios');
        } else {
            navigate('/beneficiarios');
        }
    };

    return (
        <div className="registro">
            <h1 className="subtitle">Registro</h1>
            <p className="description">
                Por favor, preencha os detalhes abaixo para registrar uma família no programa de assistência habitacional.
            </p>
            <div className="form-control">
                <div className="input-group">
                    <label>Nome da Família:</label>
                    <input
                        type="text"
                        placeholder="Nome da Família"
                        value={nomeFamilia}
                        onChange={(e) => setNomeFamilia(e.target.value)}
                    />

                    <label>Nome Principal:</label>
                    <input
                        type="text"
                        placeholder="Nome Principal"
                        value={nomePrincipal}
                        onChange={(e) => setNomePrincipal(e.target.value)}
                    />

                    <label>CPF:</label>
                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />

                    <label>Endereço:</label>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />

                    <label>CEP:</label>
                    <input
                        type="text"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />

                    <label>Renda Mensal:</label>
                    <input
                        type="number"
                        placeholder="Renda Mensal"
                        value={rendaMensal}
                        onChange={(e) => setRendaMensal(Number(e.target.value))}
                    />

                    <label>Telefone:</label>
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={telefone1}
                        onChange={(e) => setTelefone1(e.target.value)}
                    />

                    <label>Telefone 2:</label>
                    <input
                        type="text"
                        placeholder="Telefone 2"
                        value={telefone2}
                        onChange={(e) => setTelefone2(e.target.value)}
                    />

                    <label>Como chegou ao instituto:</label>
                    <input
                        type="text"
                        placeholder="Como chegou ao instituto"
                        value={comoChegou}
                        onChange={(e) => setComoChegou(e.target.value)}
                    />
                </div>

                <div className="dropdown-button-group">
                    <div className="dropdown-group">
                        <label>Status da Família:</label>
                        <select value={statusFamilia} onChange={(e) => setStatusFamilia(e.target.value)}>
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

                        <label>Qual a necessidade da família?</label>
                        <select value={necessidadeFamilia} onChange={(e) => setNecessidadeFamilia(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Construção">Construção</option>
                            <option value="Só reforma">Só reforma</option>
                            <option value="Reforma e ampliação">Reforma e ampliação</option>
                            <option value="Doação de materiais de construção">Doação de materiais de construção</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="button-group">
                        <button onClick={createFamilia} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={resetForm} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;
