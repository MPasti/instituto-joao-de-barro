import { useState } from "react";
import main_imagem from "../../../../assets/images/voluntariado/people_stack.png";
import "@styles/voluntariosForm.scss";
import "@styles/global.scss";

export function VoluntariosForm() {
	const [nome, setNome] = useState("");
	const [sobrenome, setSobrenome] = useState("");
	const [telefone, setTelefone] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [hobby, setHobby] = useState("");
	const [intencao, setIntencao] = useState("");
	const [cargoDesejado, setCargoDesejado] = useState("");
	const [sobreVoce, setSobreVoce] = useState("");
	const [checkboxes, setCheckboxes] = useState({
        "politicas_privacidade": false,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

	const existingCpfs = ["12345678900", "98765432100"]; // Trocar pelo CPF do banco de dados

	const validateForm = () => {
		if (existingCpfs.includes(cpf)) {  // verificar se o cpf está no array existingCpfs
			alert("Você já enviou um form.");
			return false;
		}
		// Basic validation for required fields
		if (
			!nome ||
			!sobrenome ||
			!telefone ||
			!email ||
			!cpf ||
			!cargoDesejado ||
			!sobreVoce
		) {
			alert("Por favor, preencha todos os campos obrigatórios.");
			return false;
		}

		// Check if privacy policy is accepted
		if (!checkboxes.politicas_privacidade) {
			alert("Você deve aceitar as Políticas de Privacidade.");
			return false;
		}

		return true;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			try {
				// Simulando uma chamada à API
				const response = await new Promise((resolve) => {
					setTimeout(() => {
						resolve({ success: true });
					}, 2000); // Simulando um atraso de 2 segundos
				});
				
				//@ts-ignore
				if (response.success) {
					console.log("Formulário enviado com sucesso!");
					// Atualizar o estado ou realizar outras ações necessárias
				} else {
					console.error("Erro ao enviar o formulário.");
				}
			} catch (error) {
				console.error("Erro na conexão com a API:", error);
			}
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
					
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="nome">Nome</label>
							<input
								type="text"
								id="nome"
								name="nome"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								placeholder="Digite seu nome"
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="sobrenome">Sobrenome</label>
							<input
								type="text"
								id="sobrenome"
								name="sobrenome"
								value={sobrenome}
								onChange={(e) => setSobrenome(e.target.value)}
								placeholder="Digite seu sobrenome"
							/>
						</div>
					</div>
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="telefone">Telefone</label>
							<input
								type="tel"
								id="telefone"
								name="telefone"
								value={telefone}
								onChange={(e) => setTelefone(e.target.value)}
								placeholder="Digite seu telefone"
							/>
						</div>
						<div className="form-input-c">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Digite seu email"
							/>
						</div>
					</div>
					<div className="form-group double-input-container-c">
						<div className="form-input-c">
							<label htmlFor="cpf">CPF</label>
							<input
								type="text"
								id="cpf"
								name="cpf"
								value={cpf}
								onChange={(e) => setCpf(e.target.value)}
								placeholder="Digite seu CPF"
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
						/>
					</div>
					<div className="form-group form-input-c">
						<label htmlFor="cargo-desejado">Cargo desejado</label>
						<input
							type="text"
							id="cargo-desejado"
							name="cargo-desejado"
							value={cargoDesejado}
							onChange={(e) => setCargoDesejado(e.target.value)}
							placeholder="Digite o cargo desejado"
						/>
					</div>
					<div className="form-group form-input-c">
						<label htmlFor="sobre-voce">Sobre você</label>
						<input
							type="text"
							id="sobre-voce"
							name="sobre-voce"
							value={sobreVoce}
							onChange={(e) => setSobreVoce(e.target.value)}
							placeholder="Fale um pouco sobre você"
						/>
					</div>
				<label>Politicas de Privacidade</label>
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
            <button className="btn-orange" onClick={handleSubmit}>Enviar</button>
    </div>
    );
}