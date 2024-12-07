import { useEffect, useState } from "react";
import main_imagem from "../../../../assets/images/voluntariado/people_stack.png";
import "@styles/voluntariosForm.scss";
import "@styles/global.scss";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { Modal } from "../../../../components/Modal/Modal";
import { Button } from "@headlessui/react";


export function VoluntariosForm() {
	const [nome, setNome] = useState("");
	const [sobrenome, setSobrenome] = useState("");
	const [telefone, setTelefone] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [senha, setSenha] = useState("");
	const [confsenha, setConfsenha] = useState("");
	const [hobby, setHobby] = useState("");
	const [intencao, setIntencao] = useState("");
	const [cargoDesejado, setCargoDesejado] = useState("");
	const [sobreVoce, setSobreVoce] = useState("");
	const [checkboxes, setCheckboxes] = useState({
        "politicas_privacidade": false,
    });
	const [error, setError] = useState("");
	const [invalidFields, setInvalidFields] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

	useEffect(() => {
		if (error) {
			console.log("Mensagem de erro atualizada:", error);
		}
	}, [error]);

	const isValidCPF = (cpf: string) => {
		cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos.
		if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
	
		let sum = 0;
		for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
		let mod = (sum * 10) % 11;
		if (mod === 10 || mod === 11) mod = 0;
		if (mod !== parseInt(cpf.charAt(9))) return false;
	
		sum = 0;
		for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
		mod = (sum * 10) % 11;
		if (mod === 10 || mod === 11) mod = 0;
	
		return mod === parseInt(cpf.charAt(10));
	};
	
	const validateForm = () => {
		const errors: string[] = [];
	
		if (!nome) errors.push("nome");
		if (!sobrenome) errors.push("sobrenome");
		if (!telefone) errors.push("telefone");
		if (!email) errors.push("email");
		if (!cpf) errors.push("cpf");
		if (!senha) errors.push("senha");
		if (senha !== confsenha) errors.push("confsenha");
		if (!cargoDesejado) errors.push("cargoDesejado");
		if (!sobreVoce) errors.push("sobreVoce");
	
		const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,30}$/;
		if (!senhaRegex.test(senha)) {
			errors.push("senha");
			errors.push("confsenha");
			toast.error("A senha deve ter entre 8-30 caracteres, incluir letras maiúsculas e caracteres especiais.");
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errors.push("email");
			toast.error("E-mail inválido!");
		}
		
		if (!checkboxes.politicas_privacidade) {
			setError("Você deve aceitar as Políticas de Privacidade.");
		} else {
			setError("");
		}

		if (!isValidCPF(cpf)) {
			errors.push("cpf");
			toast.error("CPF inválido!");
		}
		
		if (!checkboxes.politicas_privacidade) {
			errors.push("politicas_privacidade");
			toast.error("Você deve aceitar as Políticas de Privacidade.");
		}
		
		setInvalidFields(errors);
	
		return errors.length === 0;
	};
	
	const handleSubmit = async () => {
		const formIsValid = validateForm();

		if(!formIsValid) {
			console.log("Erro:", error);
			return;
		}
		
		try {
			const response = await new Promise((resolve) => {
				setTimeout(() => {
					resolve({ success: true });
				}, 2000);
			});
			
			//@ts-ignore
			if (response.success) {
				toast.success("Formulário enviado com sucesso!");
			} else {
				toast.error("Erro ao enviar o formulário.");
			}
		} catch (error) {
			toast.error("Erro na conexão com a API: " + error);
		}
	};

	return (
		<div className="parent-container">
			<div
				className="main-image-container"
				style={{ backgroundImage: `url(${main_imagem})` }}
			/>
			<div className="colaborador-yellow-box">
				<h1 className="title">JUNTE-SE A NOSSA FAMILIA</h1>
				<form
					action=""
					style={{ display: "flex", flexDirection: "column" }}
				>
					{error && <div className="error-message">{error}</div>}
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="nome">Nome*</label>
							<input
								maxLength={100}
								type="text"
								id="nome"
								name="nome"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								placeholder="Digite seu nome"
								className={invalidFields.includes("nome") ? "input-error" : ""}
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="sobrenome">Sobrenome*</label>
							<input
								maxLength={100}
								type="text"
								id="sobrenome"
								name="sobrenome"
								value={sobrenome}
								onChange={(e) => setSobrenome(e.target.value)}
								placeholder="Digite seu sobrenome"
								className={invalidFields.includes("sobrenome") ? "input-error" : ""}
							/>
						</div>
					</div>
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="telefone">Telefone*</label>
							<InputMask
								mask="(99) 99999-9999"
								type="tel"
								id="telefone"
								name="telefone"
								value={telefone}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)}
        						placeholder="Digite seu telefone"
								className={invalidFields.includes("telefone") ? "input-error" : ""}
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="email">Email*</label>
							<input
								maxLength={100}
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Digite seu email"
								className={invalidFields.includes("email") ? "input-error" : ""}
							/>
						</div>
					</div>
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="senha">Senha*</label>
							<input
								type="password"
								id="senha"
								name="senha"
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
								placeholder="Digite sua senha"
								className={invalidFields.includes("senha") ? "input-error" : ""}
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="confsenha">Confirmar Senha*</label>
							<input
								type="password"
								id="confsenha"
								name="confsenha"
								value={confsenha}
								onChange={(e) => setConfsenha(e.target.value)}
								placeholder="Confirme sua senha"
								className={invalidFields.includes("confsenha") ? "input-error" : ""}
							/>
						</div>
					</div>
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="cpf">CPF*</label>
							<InputMask
								mask="999.999.999-99"
								value={cpf}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
    							placeholder="Digite seu CPF"
								className={invalidFields.includes("cpf") ? "input-error" : ""}
							>
								{(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
									<input {...inputProps} />
								)}
							</InputMask>
						</div>
						<div className="form-input-c">
							<label htmlFor="hobby">Hobby</label>
							<input
								maxLength={150}
								type="text"
								id="hobby"
								name="hobby"
								value={hobby}
								onChange={(e) => setHobby(e.target.value)}
								placeholder="Digite seu hobby"
								className={invalidFields.includes("hobby") ? "input-error" : ""}
							/>
						</div>
					</div>
					<div className="form-group form-input-c">
						<label htmlFor="intencao">Intenção</label>
						<input
							maxLength={200}
							type="text"
							id="intencao"
							name="intencao"
							value={intencao}
							onChange={(e) => setIntencao(e.target.value)}
							placeholder="Digite sua intenção"
							className={invalidFields.includes("intencao") ? "input-error" : ""}
						/>
					</div>
					<div className="form-input-c">
						<label htmlFor="cargo-desejado">Cargo desejado*</label>
						<select
							id="cargo-desejado"
							name="cargo-desejado"
							value={cargoDesejado}
							onChange={(e) => setCargoDesejado(e.target.value)}
						>
							<option value="Voluntários">Voluntários</option>
							<option value="Estoque">Estoque</option>
							<option value="Financeiro">Financeiro</option>
							<option value="Eventos">Eventos</option>
							<option value="Obras">Obras</option>
							<option value="Noticias">Noticias</option>
						</select>
					</div>
					<div className="form-group form-input-c">
						<label htmlFor="sobreVoce">Sobre Você*</label>
						<textarea
							maxLength={240}
							id="sobreVoce"
							name="sobreVoce"
							value={sobreVoce}
							onChange={(e) => setSobreVoce(e.target.value)}
							placeholder="Fale um pouco sobre você"
							className={invalidFields.includes("sobreVoce") ? "input-error" : ""}
						/>
					</div>
					<div className="checkbox-container">
						<div>
							<input
								type="checkbox"
								name="politicas_privacidade"
								checked={checkboxes.politicas_privacidade}
								onChange={handleCheckboxChange}
							/>
							<span>
								Li e aceito as{" "}
								<a
									href="#"
									className="link"
									onClick={(e) => {
										e.preventDefault();
										openModal();
									}}
								>
									Políticas de Privacidade
								</a>
								.
							</span>
						</div>
					</div>

					<Modal isOpen={isModalOpen} onClose={closeModal} clickableBackdrop={true}>
						<h2>Políticas de Privacidade</h2>
						<p>
							Aqui você pode incluir as Políticas de Privacidade que o usuário deve
							ler e aceitar. Você também pode carregar este conteúdo de uma API ou
							arquivo.
						</p>
					</Modal>
				</form>
			</div>
			<Button className="btn-orange" type="button" onClick={handleSubmit}>
				Enviar
			</Button>
		</div>
	);
	
}