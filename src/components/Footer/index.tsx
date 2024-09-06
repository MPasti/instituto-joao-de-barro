import { FaFacebook, FaInstagram } from "react-icons/fa6";
import logoUrl from "@images/black-white-logo.svg";



export const Footer = () => {
  return (
      <div className="footer d-flex flex-column">
          <div className="d-flex justify-content-evenly w-100">
              <div>
                  <img className="footer-logo" src={logoUrl} alt="Logo"/>
                  <div className="ijb-title">
                      <p>INSTITUTO</p>
                      <h4>JOÃO DE BARRO</h4>
                      <span>GRUPO SOLIDÁRIO DE APOIO À MORADIA</span>
                  </div>
              </div>
              <div>
                  Instituto:
              </div>
              <div>
                  Contato:
              </div>
              <div className='footer-icons text-center'>
                  <FaFacebook className="icons"/>
                  <FaInstagram className="icons"/>
              </div>
          </div>
          <div className="d-flex flex-column mt-4">
          <p>INSTITUTO JOÃO DE BARRO - TODOS OS DIREITOS RESERVADOS - CNPJ: 26.345.732/0001-07</p>
          </div>
      </div>
  );
};
