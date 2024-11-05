import {
  FaFacebook,
  FaHandHoldingHeart,
  FaInstagram,
  FaScrewdriverWrench,
  FaWhatsapp,
} from "react-icons/fa6";
import Button from "../../../components/Button";
import IjbDonation from "@images/institute/ijb-comemoracao.png";
import { FaHandPaper } from "react-icons/fa";
import { IoMegaphone } from "react-icons/io5";

export function Donation() {
  return (
    <div className="pages">
      <div className="d-flex flex-column">
        <div className="title col-4">
          <h3>
            SUA DOAÇÃO TEM O PODER DE{" "}
            <span className="text-secondary">TRANSFORMAR VIDAS</span>
          </h3>
        </div>
        <div className="d-flex bg-secondary-light color-white">
          <div className="col-6">
            <h4>DOE QUALQUER VALOR</h4>
            <div className="d-flex">
              <img></img>
              <h5>PIX: 26.345.732/0001-07 </h5>
            </div>
            <h5>
              <span className="text-light">CNPJ:</span>26.345.732/0001-07
            </h5>
            <h5>
              <span className="text-light">BANCO:</span>756 - SICOOB
            </h5>
            <h5>
              <span className="text-light">AGÊNCIA:</span>4321 CRED-ACIF
            </h5>
            <h5>
              <span className="text-light">CONTA CORRENTE:</span>2005.247-2
            </h5>
          </div>
          <div className="col-6">
            <img
              className="img-fluid"
              src={IjbDonation}
              alt="Comemoração de projeto realizado"
            />
            <Button type="button" variant="primary">
              FAÇA SUA
            </Button>
          </div>
        </div>
        <div className="d-flex flex-column m-auto">
          <div className="col-12">
            <div className="d-flex text-secondary justify-content-center">
              <h5>DOE MATERIAIS</h5>
              <FaScrewdriverWrench size={28} />
            </div>
            <p className="w-50 m-auto text-justify">
              Com cada material doado, você contribui para que mais pessoas
              tenham acesso a moradias seguras e ambientes que promovem
              bem-estar e dignidade. Ajudar na construção ou reforma de um lar
              significa oferecer conforto, proteção e um futuro melhor para quem
              mais precisa.
            </p>
          </div>
          <div className="row m-0">
            <div className="col-12 col-md-6 p-0">
              <p className="w-75">
                1.Materiais como{" "}
                <span className="text-secondary">
                  cimento, areia, tijolos, telhas, portas, janelas, tinta, entre
                  outros
                </span>
                , são essenciais para nossas reformas e construções.
              </p>
            </div>
            <div className="col-12 col-md-6 p-0">
              <p className="flex w-75">
                2. Entre em contato conosco para saber o local mais próximo onde
                você pode deixar sua doação ou agendar uma coleta diretamente.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>Como Ajudar de Outras Formas</h2>
          <div className="flex row">
            <div className="col-12 col-md-4">
              <div className="flex flex-column">
                <FaHandPaper className="text-secondary" />
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
            <div className="col-12 col-md-4">
              <div className="flex flex-column">
                <FaHandHoldingHeart className="text-secondary" />
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
            <div className="col-12 col-md-4">
              <div className="flex flex-column">
                <IoMegaphone className="text-secondary" />
                <h2>Divulgue nossa causa </h2>
                <p>
                  Compartilhe nossas ações e campanhas em suas redes sociais e
                  com amigos para que mais pessoas possam contribuir.
                </p>
                <div className="text-secondary">
                  <FaInstagram size={42} />
                  <FaFacebook size={40} />
                  <FaWhatsapp size={42} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
