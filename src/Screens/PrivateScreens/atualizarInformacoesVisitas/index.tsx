import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/global.scss';
import './atualizarInformacoesVisitas.scss';
import { getVisita, updateVisita } from '../../../services/beneficiaries/visitApi';

const AtualizarInformacoesVisitas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nomeFamilia, setNomeFamilia] = useState('');
    const [nomeVoluntario, setNomeVoluntario] = useState('');
    const [relatorio, setRelatorio] = useState('');

    useEffect(() => {
        const fetchVisita = async () => {
            try {
                const visita = await getVisita(String(id));

                if (!visita) {
                    throw new Error('Visita não encontrada');
                }

                setNomeFamilia(visita.nomeFamilia);
                setNomeVoluntario(visita.nomeVoluntario);
                setRelatorio(visita.relatorio);
            } catch (err) {
                console.log('Erro ao buscar visita: ' + err);
            }
        };

        fetchVisita();
    }, [id]);

    const handleUpdate = async () => {
        const data = {
            nomeFamilia,
            nomeVoluntario,
            relatorio,
            name: '',
            data: '',
        };
    
        console.log('Atualizando visita com os dados:', data);
    
        try {
            await updateVisita(String(id), data);
            navigate('/dashboard/beneficiarios'); 
        } catch (err) {
            console.log('Erro ao atualizar visita: ' + err);
        }
    };
    

    const handleDiscard = () => {
        navigate('/dashboard/beneficiarios');
    };

    return (
        <div className="atualizar-informacoes-visitas">
            <h1 className="subtitle">Atualizar Informações da Visita</h1>
            <p className="description">
                Preencha os campos abaixo para atualizar as informações da visita.
            </p>
            <div className="form-control">
                <div className='input-group'>
                    <label>Nome da Família:</label>
                    <input
                        type="text"
                        placeholder="Nome da Família"
                        value={nomeFamilia}
                        onChange={(e) => setNomeFamilia(e.target.value)}
                    />

                    <label>Nome do Voluntário:</label>
                    <input
                        type="text"
                        placeholder="Nome do Voluntário"
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
                        <button onClick={handleUpdate} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={handleDiscard} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
    );
};

export default AtualizarInformacoesVisitas;
