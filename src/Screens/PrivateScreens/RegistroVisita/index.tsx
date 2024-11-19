import { useEffect, useState } from 'react';
import '@styles/global.scss';
import './registroVisita.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerVisit } from '../../../services/beneficiaries/visitApi';
import { getBeneficiaries } from '../../../services/beneficiaries/beneficiariesApi';
import toast from 'react-hot-toast';

const RegistroVisita = () => {
    const navigate = useNavigate();

    const [beneficiarios, setBeneficiarios] = useState<Beneficiary[]>([]);
    const [beneficiarioName, setBeneficiarioName] = useState('');
    const [beneficiary, setBeneficiary] = useState<Beneficiary>();
    const [nomeVoluntario, setNomeVoluntario] = useState('');
    const [relatorio, setRelatorio] = useState('');
    const [imagens, setImagens] = useState<File[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagens(Array.from(e.target.files));
        }
    };

    const handleImageUpload = async (images: File[]) => {
        const formData = new FormData();
        images.forEach(image => {
            formData.append("files", image);
        });

        try {
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Imagens enviadas com sucesso", response.data);
            return response.data; // Retorne os dados da resposta, caso precise de algo do servidor
        } catch (error) {
            console.error("Erro ao enviar as imagens", error);
            throw new Error("Erro ao enviar as imagens");
        }
    };

    const createVisita = async () => {
        if (!beneficiary || !relatorio || !nomeVoluntario || imagens.length === 0) {
            alert('Por favor, preencha todos os campos e adicione as imagens.');
            return;
        }

        try {
            // Enviar as imagens primeiro
            const imagensEnviadas = await handleImageUpload(imagens);

            // Agora, enviar os outros dados da visita junto com o link das imagens ou qualquer dado retornado do upload
            const data = {
                beneficiaryId: beneficiary.id,
                report: relatorio,
                visitDate: new Date(),
                firstImage: imagensEnviadas[0] ?? undefined,
                secondImage: imagensEnviadas[1] ?? undefined,
                thirdImage: imagensEnviadas[2] ?? undefined,
                fourthImage: imagensEnviadas[3] ?? undefined,
                fifthImage: imagensEnviadas[4] ?? undefined,
            };

            //@ts-ignore
            await registerVisit(data); // Chama sua função de registrar visita no backend
            navigateToBeneficiarios();
        } catch (err) {
            console.log('Erro durante o registro: ' + err);
        }
    };

    const navigateToBeneficiarios = () => {
        if (location.pathname.includes("dashboard")) {
            navigate('/dashboard/beneficiarios');
        } else {
            navigate('/beneficiarios');
        }
    };

    const resetForm = () => {
        setBeneficiary(undefined);
        setNomeVoluntario('');
        setRelatorio('');
        setImagens([]);
        navigateToBeneficiarios();
    };

    const fetchBeneficiarios = async () => {
        try {
            const beneficiariosResponse = await getBeneficiaries();
            if (!beneficiariosResponse) {
                toast.error('Erro ao buscar famílias');
                return;
            }
            const activeFamilies = beneficiariosResponse.filter(
                (beneficiario: Beneficiary) => beneficiario.status !== Status.INATIVO && beneficiario.name.includes(beneficiarioName)
            );
            setBeneficiarios(activeFamilies);
        } catch (err) {
            toast.error("Erro ao buscar beneficiários: " + err);
        }
    };


    useEffect(() => {
        fetchBeneficiarios();
    }, [])

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
                        value={beneficiarioName}
                        onChange={(e) => setBeneficiarioName(e.target.value)}
                    />
                    <select >
                        <option>Selecione um Beneficiário</option>
                        {beneficiarios.map((beneficiario) => (
                            <option key={beneficiario.id} value={beneficiario.id} onClick={() => setBeneficiary(beneficiario)}>
                                {beneficiario.name}
                            </option>
                        ))}
                    </select>

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
                    <button onClick={createVisita} className="button confirm-btn">CONFIRMAR</button>
                    <button onClick={resetForm} className="button discard-btn">DESCARTAR</button>
                </div>
            </div>
        </div>
    );
};

export default RegistroVisita;
