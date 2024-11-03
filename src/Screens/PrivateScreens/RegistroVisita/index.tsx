import { useState } from 'react';
import '@styles/global.scss';
import './registroVisita.scss';
import { useNavigate } from 'react-router-dom';
import { registerVisita } from '../../../services/beneficiaries/visitApi';

const RegistroVisita = () => {
    const navigate = useNavigate();

    const [nomeBeneficiario, setNomeBeneficiario] = useState(''); 
    const [nomeVoluntario, setNomeVoluntario] = useState(''); 
    const [relatorio, setRelatorio] = useState('');

    const createVisita = async () => {
        if (!nomeBeneficiario || !relatorio || !nomeVoluntario) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            name: nomeBeneficiario,
            data: new Date().toISOString(), // Adjust as necessary for your backend
            nomeFamilia: nomeBeneficiario,
            relatorio,
            nomeVoluntario,
        };

        try {
            await registerVisita(data);
            navigateToBeneficiarios();
        } catch (err) {
            console.log('Erro durante o registro: ' + err);
        }
    };

    const navigateToBeneficiarios = () => {
        if(location.pathname.includes("dashboard")) {
            navigate('/dashboard/beneficiarios');
        } else {
            navigate('/beneficiarios');
        }
    };

    const resetForm = () => {
        setNomeBeneficiario('');
        setNomeVoluntario('');
        setRelatorio('');
        navigateToBeneficiarios();
    };

    return (
        <div className="registro-visita">
            <h1 className="subtitle">Registro de Visita</h1>
            <p className="description">
                Preencha os campos abaixo para registrar uma visita.
            </p>
            <div className="form-control">
                <div className="input-group">
                    <label>Nome Principal do Beneficiário:</label>
                    <input
                        type="text"
                        placeholder="Nome do Beneficiário"
                        value={nomeBeneficiario}
                        onChange={(e) => setNomeBeneficiario(e.target.value)}
                    />

                    <label>Nome dos Voluntários:</label>
                    <input
                        type="text"
                        placeholder="Nome dos Voluntários"
                        value={nomeVoluntario}
                        onChange={(e) => setNomeVoluntario(e.target.value)}
                    />

                    <label>Relatório:</label>
                    <textarea
                        placeholder="Digite seu relatório aqui..."
                        rows={5}
                        style={{ width: '100%' }}
                        value={relatorio}
                        onChange={(e) => setRelatorio(e.target.value)}
                    />
                </div>

                    <div className="button-group">
                        <button onClick={createVisita} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={resetForm} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
    );
};

export default RegistroVisita;
