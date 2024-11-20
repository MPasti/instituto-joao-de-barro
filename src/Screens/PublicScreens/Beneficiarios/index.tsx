import { useLocation, useNavigate } from 'react-router-dom';
import './visualizarInfo.scss';
import { useEffect, useState } from 'react';
import { registerUserAsBeneficiary } from '../../../services/beneficiaries/beneficiariesApi';
import toast from 'react-hot-toast';

export function Beneficiarios() {
    const navigate = useNavigate();
    const location = useLocation();

    // User states
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UserInfo states
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rg, setRg] = useState('');
    const [birthdayDate, setBirthdayDate] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');

    // useEffect(() => {
    //     const {user} = JSON.parse(localStorage.getItem('user') || '{}');
    //     if(user.id) {
    //         if(window.confirm('Você já está logado, deseja acessar seus dados?')) {
    //             navigate('/dashboard/beneficiarios/data');
    //         }
    //     }
    // })

    const validateForm = () => {
        if (!email || !cpf || !password || !confirmPassword) {
            toast.error('Preencha todos os campos obrigatórios do usuário.');
            return false;
        }
        if (!name || !lastName || !rg || !birthdayDate || !phone1) {
            toast.error('Preencha todos os campos obrigatórios do UserInfo.');
            return false;
        }
        if (cpf.length !== 11) {
            toast.error('O CPF deve ter 11 dígitos.');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem.');
            return false;
        }
        return true;
    };

    const registrarUser = async () => {
        if (!validateForm()) return;

        const userInfo: UserInfo = {
            name,
            lastName,
            rg,
            birthdayDate: new Date(birthdayDate),
            phone1,
            phone2,
            createdAt: new Date(),
            active: true,
            profilePic: new Uint8Array(),
        };

        const benefUser: BenefUser = {
            email,
            cpf,
            password,
            createdAt: new Date(),
            userInfo,
        };

        try {
            await registerUserAsBeneficiary(benefUser);
            if (location.pathname.includes("dashboard")) {
                navigate('/dashboard/beneficiarios/perfil');
            } else {
                navigate('/beneficiarios');
            }
        } catch (err) {
            console.error('Erro durante o registro:', err);
            toast.error('Erro ao registrar.');
        }
    };

    return (
        <div className="registro">
            <h1 className="subtitle">Registro</h1>
            <p className="description">
                Preencha os detalhes abaixo para registrar uma família no programa de assistência.
            </p>
            <div className="benefFormControl">
                {/* Campos do usuário */}
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>CPF:</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />

                <label>Senha:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Confirmar Senha:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                {/* Campos do UserInfo */}
                <label>Nome:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Sobrenome:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label>RG:</label>
                <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} />

                <label>Data de Nascimento:</label>
                <input type="date" value={birthdayDate} onChange={(e) => setBirthdayDate(e.target.value)} />

                <label>Telefone 1:</label>
                <input type="text" value={phone1} onChange={(e) => setPhone1(e.target.value)} />

                <label>Telefone 2:</label>
                <input type="text" value={phone2} onChange={(e) => setPhone2(e.target.value)} />

                <button className="benefconfirm-btn" onClick={registrarUser}>Confirmar</button>
            </div>
        </div>
    );
}
