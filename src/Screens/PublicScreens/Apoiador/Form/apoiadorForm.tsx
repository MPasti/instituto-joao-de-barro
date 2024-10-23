import { useState } from "react";
import main_imagem from "../../../../assets/images/apoiador/main_image.svg";
import "./formStyle.css";

export function ApoiadorForm() {
	const [nomeCompleto, setNomeCompleto] = useState("");
	const [telefone, setTelefone] = useState("");
	const [email, setEmail] = useState("");
	const [telefone2, setTelefone2] = useState("");
	const [cpf, setCpf] = useState("");
	const [hobby, setHobby] = useState("");
	const [intencao, setIntencao] = useState("");
	const [cargoDesejado, setCargoDesejado] = useState("");
	const [sobreVoce, setSobreVoce] = useState("");
	const [doacaoMonetaria, setDoacaoMonetaria] = useState("");
	const [formaPagamento, setFormaPagamento] = useState("");
	const [materiaisQuantidade, setMateriaisQuantidade] = useState("");
	const [checkboxes, setCheckboxes] = useState({
        "fui_ajudado": false,
        "por_amigos": false,
        "google": false,
        "instagram": false,
        "facebook": false,
        "marketing": false,
        "outro": false,
        "receber_novidades": false,
        "politicas_privacidade": false,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

	const handleSubmit = async () => {
	
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
					<div className="form-group form-input-c">
						<label htmlFor="nome-completo">Nome completo</label>
						<input
							type="text"
							id="nome-completo"
							name="nome-completo"
							value={nomeCompleto}
							onChange={(e) => setNomeCompleto(e.target.value)}
							placeholder="Digite seu nome completo"
						/>
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
							<label htmlFor="telefone2">Telefone 2</label>
							<input
								type="tel"
								id="telefone2"
								name="telefone2"
								value={telefone2}
								onChange={(e) => setTelefone2(e.target.value)}
								placeholder="Digite seu segundo telefone"
							/>
						</div>
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
					</div>
					<div className="form-group form-input-c">
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
					<div className="checkbox-container">
                    <label>Como descobriu o João de Barro</label>
                    <div>
                        <input
                            type="checkbox"
                            name="fui_ajudado"
                            checked={checkboxes.fui_ajudado}
                            onChange={handleCheckboxChange}
                        />
                        <span>Ja fui ajudado(a) por ela</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="por_amigos"
                            checked={checkboxes.por_amigos}
                            onChange={handleCheckboxChange}
                        />
                        <span>Por meio de amigos</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="google"
                            checked={checkboxes.google}
                            onChange={handleCheckboxChange}
                        />
                        <span>google</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="instagram"
                            checked={checkboxes.instagram}
                            onChange={handleCheckboxChange}
                        />
                        <span>instagram</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="facebook"
                            checked={checkboxes.facebook}
                            onChange={handleCheckboxChange}
                        />
                        <span>facebook</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="marketing"
                            checked={checkboxes.marketing}
                            onChange={handleCheckboxChange}
                        />
                        <span>E-mail marketing</span>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="outro"
                            checked={checkboxes.outro}
                            onChange={handleCheckboxChange}
                        />
                        <span>outro</span>
                    </div>
                </div>
                <h1>Como gostaria de contribuir?</h1>
                <div className="double-input-container-c">
                    <div className="form-group form-input-c">
                        <label htmlFor="doacao-monetaria">Doação monetária</label>
                        <input
                            type="number"
                            id="doacao-monetaria"
                            name="doacao-monetaria"
                            value={doacaoMonetaria}
                            onChange={(e) => setDoacaoMonetaria(e.target.value)}
                            placeholder="Digite o valor da doação"
                        />
                    </div>
                    <div className="form-input-c">
                        <label htmlFor="forma-pagamento">Forma de pagamento</label>
                        <select
                            id="forma-pagamento"
                            name="forma-pagamento"
                            value={formaPagamento}
                            onChange={(e) => setFormaPagamento(e.target.value)}
                        >
                            <option value="Crédito">Crédito</option>
                            <option value="Débito">Débito</option>
                            <option value="PIX">PIX</option>
                        </select>
                    </div>
                </div>
                <div className="form-group form-input-c">
                    <label htmlFor="">Materiais e quantidade para doação</label>
                    <textarea
                        value={materiaisQuantidade}
                        onChange={(e) => setMateriaisQuantidade(e.target.value)}
                        placeholder="Descreva os materiais e a quantidade para doação"
                    ></textarea>
                </div>
                <div className="checkbox-container">
                    <label>
                        Deseja receber informações sobre os impactos das doações e
                        novidades?
                    </label>
                    <div>
                        <input
                            type="checkbox"
                            name="receber_novidades"
                            checked={checkboxes.receber_novidades}
                            onChange={handleCheckboxChange}
                        />
                        <span>Sim! Desejo receber novidades da João de Barro.</span>
                    </div>
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