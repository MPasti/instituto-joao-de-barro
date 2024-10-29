import Button from "../Button";

import FirstImage from "@images/institute/joaodebarro.jpg";
import SecondImage from "@images/institute/institute-3.png";
import ThirdImage from "@images/institute/institute-4.png";

const HelpSection = () => {
  return (
    <div className="help-section">
      <h2 className="ms-3">
        SUA AJUDA <span className="text-secondary">TRANSFORMA VIDAS</span>
      </h2>

      <div className="help-block block-1">
        <div className="content">
          <h4>
            1. SEJA UM <span className="text-primary">DOADOR</span>
          </h4>
          <p>
            Sua doação financeira, seja pontual ou recorrente, nos permite
            manter nossos projetos em andamento, ajudando diretamente famílias,
            voluntários e beneficiários que dependem de nossa assistência.
          </p>
          <p>
            Doação de Itens também auxilia o instituto a arrecadar elementos que
            fazem a diferença na vida de alguém.
          </p>
          <Button type="button" variant="primary">
            QUERO DOAR
          </Button>
        </div>
        <div className="image">
          <img src={FirstImage} alt="ijb-voluntarios" />
        </div>
      </div>

      <div className="help-block block-2">
        <div className="image">
          <img src={SecondImage} alt="ijb-beneficiarios" />
        </div>
        <div className="content">
          <h4>
            2. SEJA UM <span className="text-secondary">VOLUNTÁRIO</span>
          </h4>
          <p>
            Ao participar de nossa equipe de voluntários, você tem a
            oportunidade de contribuir diretamente com a comunidade, ajudando a
            vida de inúmeras famílias e fazendo a diferença.
          </p>
          <p>
            Qualquer pessoa pode se tornar um membro de nossa equipe de
            voluntários!
          </p>
          <Button type="button" variant="secondary">
            QUERO ME VOLUNTARIAR
          </Button>
        </div>
      </div>

      <div className="help-block block-3">
        <div className="content">
          <h4>3. SEJA UMA EMPRESA PARCEIRA</h4>
          <p>
            Se você representa uma empresa ou organização, pode colaborar
            conosco através de parcerias. Juntos, podemos desenvolver ações e
            projetos que fortaleçam a responsabilidade social e ampliem o
            impacto na comunidade.
          </p>
          <Button type="button" variant="primary">
            SAIBA MAIS
          </Button>
        </div>
        <div className="image">
          <img src={ThirdImage} alt="ijb-empresas" />
        </div>
      </div>
    </div>
  );
};

export { HelpSection };
