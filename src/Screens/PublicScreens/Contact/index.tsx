// Contact.tsx
import React from "react";
import Button from "../../../components/Button";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import sendEmailIcon from "../../../assets/icons/send-email.svg";
import "./index.scss";

export function Contact() {
  return (
    <div className="container py-5 contact-section">
      <div className="row">
        <div className="col-12 col-lg-4 contact-info mb-4 mb-lg-0">
          <img src={sendEmailIcon} alt="email" className="mb-3" />
          <h3>Siga-nos nas redes sociais</h3>
          <div className="d-flex gap-5 align-items-start mb-4">
            <div>
              <a href="https://www.instagram.com/instituto_joaodebarro_franca/">
                <FaInstagram color="#F39C12" size={48} />
              </a>
              <h5>Instagram</h5>
            </div>
            <div>
              <a href="https://www.facebook.com/joao.de.barro.franca/">
                <FaFacebook color="#F39C12" size={48} />
              </a>
              <h5>Facebook</h5>
            </div>
          </div>
          <div className="mb-4">
            <MdEmail color="#F39C12" size={48} className="mb-2" />
            <h5>E-mail</h5>
            <p>Tem alguma dúvida?</p>
            <p className="fw-bold">ijbfranca@gmail.com</p>
          </div>
          <div>
            <FaWhatsapp color="#F39C12" size={48} className="mb-2" />
            <h5>Telefone e WhatsApp</h5>
            <p>Você pode entrar em contato direto conosco:</p>
            <p className="fw-bold">+55 (16) 99181-1811</p>
          </div>
        </div>

        <div className="col-12 col-lg-8 contact-form">
          <h2 className="text-center mb-4">Entre em contato conosco</h2>
          <form className="form-control bg-transparent border-0">
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="name"
                className="form-control w-100"
                placeholder="Entre seu nome"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Entre com o seu email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Assunto</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Assunto"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Como podemos te ajudar?</label>
              <textarea
                name="message"
                className="form-control"
                rows={5}
                placeholder="Escreva sua mensagem"
              ></textarea>
            </div>
            <Button type="submit" variant="primary">
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
