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
import { FaHandPaper } from "react-icons/fa";
import { IoMegaphone } from "react-icons/io5";

export function Donation() {
  return (
    <div className="pages">
      <div className="d-flex flex-column">
        <div className="title col-4 my-5 mx-5">
          <h3>
            SUA DOAÇÃO TEM O PODER DE{" "}
            <span className="text-secondary">TRANSFORMAR VIDAS!</span>
          </h3>
        </div>
        <div className="d-flex bg-secondary-light text-white mb-5">
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
          <div className="col-12 col-md-6">
            <div className="img-container">
              <img
                className="img-fluid"
                src={IjbDonation}
                alt="Comemoração de projeto realizado"
              />
            </div>
            <div className="d-flex justify-content-center my-5">
              <Button type="button" variant="primary">
                FAÇA SUA DOAÇÃO
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mx-auto">
          <div className="col-12">
            <div className="d-flex text-secondary justify-content-center gap-3">
              <h5 className="title-lg text-4xl">DOE MATERIAIS</h5>
              <FaScrewdriverWrench size={48} />
            </div>
            <p className="w-50 m-auto text-justify text-xl">
              Com cada material doado, você contribui para que mais pessoas
              tenham acesso a moradias seguras e ambientes que promovem
              bem-estar e dignidade. Ajudar na construção ou reforma de um lar
              significa oferecer conforto, proteção e um futuro melhor para quem
              mais precisa.
            </p>
          </div>
          <div className="row mx-0 mt-5">
            <div className="col-12 col-md-6 p-0 d-flex justify-content-center">
              <p className="w-75 text-xl">
                1.Materiais como{" "}
                <span className="text-secondary">
                  cimento, areia, tijolos, telhas, portas, janelas, tinta, entre
                  outros
                </span>
                , são essenciais para nossas reformas e construções.
              </p>
            </div>
            <div className="col-12 col-md-6 p-0 d-flex justify-content-center">
              <p className="flex w-75 text-xl">
                2. Entre em contato conosco para saber o local mais próximo onde
                você pode deixar sua doação ou agendar uma coleta diretamente.
              </p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h2 className="title mx-5 my-5">Como Ajudar de Outras Formas</h2>
          <div className="flex row">
            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center text-center">
              <div className="flex flex-column w-75">
                <FaHandPaper className="text-secondary" size={104} />
                <h2>
                  Torne-se um <span className="text-secondary">voluntário</span>
                </h2>
                <p>
                  Ao participar de nossa equipe de voluntários, você tem a
                  oportunidade de contribuir diretamente com a comunidade,
                  ajudando a vida de inúmeras famílias e fazendo a diferença.
                </p>
                <Button outline type="button" variant="secondary">
                  ME VOLUNTARIAR
                </Button>
              </div>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center text-center">
              <div className="flex flex-column w-75">
                <FaHandHoldingHeart className="text-secondary" size={104} />
                <h2>Indique famílias </h2>
                <p>
                  Você também pode nos ajudar indicando famílias que precisam de
                  auxílio, preenchendo nosso formulário de indicação.
                </p>
                <Button outline type="button" variant="secondary">
                  IR AO FORMULÁRIO
                </Button>
              </div>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center text-center">
              <div className="flex flex-column w-75">
                <IoMegaphone className="text-secondary" size={104} />
                <h2>Divulgue nossa causa </h2>
                <p>
                  Compartilhe nossas ações e campanhas em suas redes sociais e
                  com amigos para que mais pessoas possam contribuir.
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
    </div>
  );
}
