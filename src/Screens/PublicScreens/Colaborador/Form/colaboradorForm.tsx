import { useEffect, useState } from "react";
import main_imagem from "../../../../assets/images/voluntariado/people_stack.png";
import "@styles/voluntariosForm.scss";
import "@styles/global.scss";

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
	
		const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
		if (!senhaRegex.test(senha)) {
			errors.push("senha");
			errors.push("confsenha");
		}
	
		if (!checkboxes.politicas_privacidade) {
			setError("Você deve aceitar as Políticas de Privacidade.");
		} else {
			setError(""); // Limpa a mensagem geral de erro
		}
	
		setInvalidFields(errors); // Atualiza os campos inválidos
	
		// Retorna falso se houver erros
		return errors.length === 0;
	};
	
	const handleSubmit = async () => {
		const formIsValid = validateForm();

		if(!formIsValid) {
			console.log("Erro:", error);
			return;
		}
		
		try {
			// Simulando uma chamada à API
			const response = await new Promise((resolve) => {
				setTimeout(() => {
					resolve({ success: true });
				}, 2000); // Simulando um atraso de 2 segundos
			});
			
			//@ts-ignore
			if (response.success) {
				alert("Formulário enviado com sucesso!");
				// Atualizar o estado ou realizar outras ações necessárias
			} else {
				console.error("Erro ao enviar o formulário.");
			}
		} catch (error) {
			console.error("Erro na conexão com a API:", error);
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
							<input
								type="tel"
								id="telefone"
								name="telefone"
								value={telefone}
								onChange={(e) => setTelefone(e.target.value)}
								placeholder="Digite seu telefone"
								className={invalidFields.includes("telefone") ? "input-error" : ""}
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="email">Email*</label>
							<input
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
							<input
								type="text"
								id="cpf"
								name="cpf"
								value={cpf}
								onChange={(e) => setCpf(e.target.value)}
								placeholder="Digite seu CPF"
								className={invalidFields.includes("cpf") ? "input-error" : ""}
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="hobby">Hobby</label>
							<input
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
							<span>Li e aceito as Políticas de Privacidade.</span>
						</div>
					</div>
				</form>
			</div>
			<button className="btn-orange" type="button" onClick={handleSubmit}>
				Enviar
			</button>
		</div>
	);
	
}