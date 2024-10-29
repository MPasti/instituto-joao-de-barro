import { FaScrewdriverWrench } from "react-icons/fa6";
import Button from "../../../components/Button";
import IjbDonation from "@images/institute/ijb-comemoracao.png";

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
        <div className="d-flex m-auto">
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
          <div className="col-6">
            1.Materiais como{" "}
            <span className="text-secondary">
              cimento, areia, tijolos, telhas, portas, janelas, tinta, entre
              outros
            </span>
            , são essenciais para nossas reformas e construções.
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </div>
  );
}
