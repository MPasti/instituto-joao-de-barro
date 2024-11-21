import Button from "../../../components/Button";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./index.scss";

export function Contact() {
  return (
    <div className="contact-section">
      <div className="contact-info">
        <h3>Siga-nos nas redes sociais</h3>
        <div>
          <div className="li-style">
            <li>
              <a
                className="link-emphasis text-light"
                href="https://www.instagram.com/instituto_joaodebarro_franca/"
              >
                <FaInstagram color="#F39C12" size={48} />
              </a>
              <h5>Instagram</h5>
            </li>
            <li>
              <a
                className="link-emphasis text-light"
                href="https://www.facebook.com/joao.de.barro.franca/"
              >
                <FaFacebook color="#F39C12" size={48} />
              </a>
              <h5>Facebook</h5>
            </li>
          </div>
          <div>
            <li>
              <a className="link-emphasis text-light">
                <MdEmail color="#F39C12" size={48} />
              </a>
              <h5>E-mail</h5>
              <p>Tem alguma dúvida?</p>
              <p className="info-p">ijbfranca@gmail.com</p>
            </li>
          </div>
          <li>
            <a className="link-emphasis text-light">
              <FaWhatsapp color="#F39C12" size={48} />
            </a>
            <h5>Telefone e WhatsApp</h5>
            <p>Você pode entrar em contato direto conosco:</p>
            <p className="info-p">+55 (16) 99181-1811</p>
          </li>
        </div>
      </div>
      <div className="contact-form">
        <h2>Entre em contato conosco</h2>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="name"
            className="w-100"
            placeholder="Entre seu nome"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-100"
            placeholder="Entre com o seu email"
          />
        </div>
        <div className="form-group">
          <label>Assunto</label>
          <input
            type="text"
            className="w-100"
            name="subject"
            placeholder="Assunto"
          />
        </div>
        <div className="message-form">
          <label>Como podemos te ajudar?</label>
          <input name="message" placeholder="Escreva sua mensagem" />
        </div>
        <Button type="submit" variant="primary">
          Salvar
        </Button>
      </div>
    </div>
  );
}
