import {
  FaFacebook,
  FaHandHoldingHeart,
  FaInstagram,
  FaScrewdriverWrench,
  FaWhatsapp,
} from "react-icons/fa6";
import Button from "../../../components/Button";
import IjbDonation from "@images/institute/ijb-comemoracao.png";
import pixIcon from "../../../assets/icons/pix.svg";
import telephoneIcon from "../../../assets/icons/phone.svg";
import chiselIcon from "../../../assets/icons/chisel.svg";
import crane from "../../../assets/icons/crane.svg";
import wheelbarrow from "../../../assets/icons/wheelbarrow.svg";

import { FaHandPaper } from "react-icons/fa";
import { IoMegaphone } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function Donation() {
  const navigate = useNavigate();
  return (
    <div className="pages overflow-hidden">
      <div className="d-flex flex-column">
        <div className="title col-12 my-5 mx-3">
          <h3>
            SUA DOAÇÃO TEM O PODER DE{" "}
            <span className="text-secondary">TRANSFORMAR VIDAS!</span>
          </h3>
        </div>

        <div className="d-flex flex-wrap bg-secondary-light text-white mb-5">
          <div className="col-12 col-md-6 d-flex flex-column gap-2 ps-4">
            <h4 className="text-3xl mt-3 font-bold">DOE QUALQUER VALOR</h4>
            <div className="d-flex align-items-center">
              <img alt="pix" src={pixIcon} />
              <h5 className="m-0 text-3xl">PIX: 26.345.732/0001-07 </h5>
            </div>
            <h5 className="text-2xl">
              <span className="text-light">CNPJ: </span>26.345.732/0001-07
            </h5>
            <h5 className="text-2xl">
              <span className="text-light">BANCO: </span>756 - SICOOB
            </h5>
            <h5 className="text-2xl">
              <span className="text-light">AGÊNCIA: </span>4321 CRED-ACIF
            </h5>
            <h5 className="text-2xl">
              <span className="text-light">CONTA CORRENTE: </span>2005.247-2
            </h5>
          </div>

          <div className="col-12 col-md-6 order-md-2">
            <div className="img-container my-3">
              <img
                className="img-fluid"
                src={IjbDonation}
                alt="Comemoração de projeto realizado"
              />
            </div>
            <div className="d-flex justify-content-center my-3">
              <Button type="button" variant="primary">
                FAÇA SUA DOAÇÃO
              </Button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column mx-auto w-100">
          <div className="col-12 text-center">
            <div className="d-flex flex-column flex-md-row text-secondary justify-content-center align-items-center gap-3">
              <h5 className="title-lg text-4xl">DOE MATERIAIS</h5>
              <FaScrewdriverWrench size={48} />
            </div>
            <p className="col-12 col-md-6 px-3 mx-auto text-justify text-xl">
              Com cada material doado, você contribui para que mais pessoas
              tenham acesso a moradias seguras e ambientes que promovem
              bem-estar e dignidade. Ajudar na construção ou reforma de um lar
              significa oferecer conforto, proteção e um futuro melhor para quem
              mais precisa.
            </p>
          </div>
          <div className="row mx-0 mt-5">
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center position-relative mb-5">
              <p className="donation-block text-xl px-3">
                1. Materiais como{" "}
                <span className="text-secondary">
                  cimento, areia, tijolos, telhas, portas, janelas, tinta, entre
                  outros
                </span>{" "}
                são essenciais para nossas reformas e construções.
              </p>
              <div className="d-flex justify-content-center flex-wrap position-relative gap-3">
                <img
                  alt="chisel-icon"
                  className="position-static"
                  style={{ width: "80px" }}
                  src={chiselIcon}
                />
                <img
                  alt="crane-icon"
                  className="position-static"
                  style={{ width: "80px" }}
                  src={crane}
                />
                <img
                  alt="wheelbarrow-icon"
                  className="position-static"
                  style={{ width: "80px" }}
                  src={wheelbarrow}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center position-relative">
              <p className="donation-block text-xl px-3">
                2. Entre em contato conosco para saber o local mais próximo onde
                você pode deixar sua doação ou agendar uma coleta diretamente.
              </p>
              <div className="d-flex justify-content-center">
                <img
                  alt="telefone"
                  src={telephoneIcon}
                  className="position-static"
                  style={{ width: "150px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="help-other ">
          <h2 className="title text-center m-5">
            Como Ajudar de Outras Formas
          </h2>
          <div className="d-flex flex-column flex-md-row row">
            <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center mb-5">
              <FaHandPaper className="text-secondary" size={104} />
              <h2>
                Torne-se um <span className="text-secondary">voluntário</span>
              </h2>
              <p className="text-lg">
                Ao participar de nossa equipe de voluntários, você tem a
                oportunidade de contribuir diretamente com a comunidade,
                ajudando a vida de inúmeras famílias e fazendo a diferença.
              </p>
              <Button
                outline
                type="button"
                variant="secondary"
                onClick={() => {
                  navigate("/voluntarios");
                }}
              >
                ME VOLUNTARIAR
              </Button>
            </div>
            <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center mb-5">
              <FaHandHoldingHeart className="text-secondary" size={104} />
              <h2>Indique famílias </h2>
              <p className="text-lg">
                Você também pode nos ajudar indicando famílias que precisam de
                auxílio, preenchendo nosso formulário de indicação.
              </p>
              <Button
                outline
                type="button"
                variant="secondary"
                onClick={() => {
                  navigate("/beneficiarios");
                }}
              >
                IR AO FORMULÁRIO
              </Button>
            </div>
            <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center mb-5">
              <IoMegaphone className="text-secondary" size={104} />
              <h2>Divulgue nossa causa </h2>
              <p className="text-lg">
                Compartilhe nossas ações e campanhas em suas redes sociais e com
                amigos para que mais pessoas possam contribuir.
              </p>
              <div className="d-flex text-secondary justify-content-center gap-4">
                <FaInstagram className="cursor-pointer" size={50} />
                <FaFacebook className="cursor-pointer" size={48} />
                <FaWhatsapp className="cursor-pointer" size={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
