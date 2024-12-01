import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/global.scss';
import './atualizarInformacoesVisitas.scss';
import { getVisitById, updateVisit } from '../../../services/beneficiaries/visitApi';
import { getBeneficiaryById } from '../../../services/beneficiaries/beneficiariesApi';
import toast from 'react-hot-toast';

const AtualizarInformacoesVisitas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [visit, setVisit] = useState<Visit | undefined>(undefined);
    const [nomeFamilia, setNomeFamilia] = useState<string>('');
    const [relatorio, setRelatorio] = useState<string>('');
    const [imagens, setImagens] = useState<File[]>([]);
    const [familiaId, setFamiliaId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchVisita = async () => {
            try {
                const visita = await getVisitById(Number(id));

                if (!visita) {
                    throw new Error('Visita não encontrada');
                }

                setFamiliaId(visita.beneficiaryId);
                setRelatorio(visita.report);
                setVisit(visita);
                // Buscar os nomes dos voluntário e família por ID
                const familia = await getBeneficiaryById(visita.beneficiaryId);

                if (familia) setNomeFamilia(familia.name);
            } catch (err) {
                console.log('Erro ao buscar visita: ' + err);
            }
        };

        fetchVisita();
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagens(Array.from(e.target.files));
        }
    };

    const handleUpdate = async () => {
        if (!familiaId || !relatorio || imagens.length === 0) {
            toast.error('Por favor, preencha todos os campos e adicione as imagens.');
            return;
        }

        try {
            // Aqui, enviar as imagens para o servidor e obter os links para elas
            const formData = new FormData();
            imagens.forEach(image => {
                formData.append("files", image);
            });

            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });
            const imagensEnviadas = await response.json();

            const data: Visit = {
                id: Number(id),
                visitDate: visit?.visitDate ??  new Date(), // or use the actual visit date if available
                beneficiaryId: familiaId,
                report: relatorio,
                firstImage: imagensEnviadas[0] ?? undefined,
                secondImage: imagensEnviadas[1] ?? undefined,
                thirdImage: imagensEnviadas[2] ?? undefined,
                fourthImage: imagensEnviadas[3] ?? undefined,
                fifthImage: imagensEnviadas[4] ?? undefined,
            };

            await updateVisit(data);
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
                        disabled
                    />

                    <label>Relatório:</label>
                    <textarea
                        placeholder="Digite seu relatório aqui..."
                        rows={5}
                        style={{ width: '100%' }}
                        value={relatorio}
                        onChange={(e) => setRelatorio(e.target.value)}
                    />

                    <label>Imagens:</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagens.length > 0 && (
                        <div className="image-preview">
                            <h4>Imagens Selecionadas:</h4>
                            <ul>
                                {imagens.map((image, index) => (
                                    <li key={index}>
                                        <span>{image.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="button-group">
                    <button onClick={handleUpdate} className="btn-primary">CONFIRMAR</button>
                    <button onClick={handleDiscard} className="btn-secondary">DESCARTAR</button>
                </div>
            </div>
        </div>
    );
};

export default AtualizarInformacoesVisitas;
