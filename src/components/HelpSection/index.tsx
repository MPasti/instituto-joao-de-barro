import { useRef, useEffect, useState } from "react";
import Button from "../Button";

import FirstImage from "../../assets/icons/feedback-girl.svg";
import SecondImage from "../../assets/icons/team.svg";
import ThirdImage from "../../assets/icons/partnership.svg";

interface HelpBlock {
  title: string;
  textPrimary: string;
  description1: string;
  description2?: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  image: object;
  imageAlt: string;
}

const HelpSection = () => {
  const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const blockIndex = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleBlocks.includes(blockIndex)) {
            setVisibleBlocks((prev) => [...prev, blockIndex]);
          }
        });
      },
      { threshold: 0.3 },
    );

    blocksRef.current.forEach((block) => {
      if (block) observer.observe(block);
    });

    return () => observer.disconnect();
  }, [visibleBlocks]);

  const helpBlocks: HelpBlock[] = [
    {
      title: "SEJA UM",
      textPrimary: "DOADOR",
      description1:
        "Sua doação financeira, seja pontual ou recorrente, nos permite manter nossos projetos em andamento, ajudando diretamente famílias, voluntários e beneficiários que dependem de nossa assistência.",
      description2:
        "Doação de Itens também auxilia o instituto a arrecadar elementos que fazem a diferença na vida de alguém.",
      buttonText: "QUERO DOAR",
      buttonVariant: "primary",
      image: FirstImage,
      imageAlt: "ijb-voluntarios",
    },
    {
      title: "SEJA UM",
      textPrimary: "VOLUNTÁRIO",
      description1:
        "Ao participar de nossa equipe de voluntários, você tem a oportunidade de contribuir diretamente com a comunidade, ajudando a vida de inúmeras famílias e fazendo a diferença.",
      description2:
        "Qualquer pessoa pode se tornar um membro de nossa equipe de voluntários!",
      buttonText: "QUERO ME VOLUNTARIAR",
      buttonVariant: "secondary",
      image: SecondImage,
      imageAlt: "ijb-beneficiarios",
    },
    {
      title: "SEJA UMA",
      textPrimary: "EMPRESA PARCEIRA",
      description1:
        "Se você representa uma empresa ou organização, pode colaborar conosco através de parcerias. Juntos, podemos desenvolver ações e projetos que fortaleçam a responsabilidade social e ampliem o impacto na comunidade.",
      buttonText: "SAIBA MAIS",
      buttonVariant: "primary",
      image: ThirdImage,
      imageAlt: "ijb-empresas",
    },
  ];

  return (
    <div className="help-section">
      <h2 className="ms-3">
        SUA AJUDA <span className="text-secondary">TRANSFORMA VIDAS</span>
      </h2>
      {helpBlocks.map((block, index) => (
        <div
          key={index}
          className={`help-block block-${index + 1} ${
            visibleBlocks.includes(index) ? "visible" : ""
          } ${index % 2 === 0 ? "even" : "odd"}`}
          data-index={index}
          ref={(el: never) => (blocksRef.current[index] = el)}
        >
          <div className="content">
            <h4>
              {block.title}{" "}
              <span className="text-primary">{block.textPrimary}</span>
            </h4>
            <p>{block.description1}</p>
            {block.description2 && <p>{block.description2}</p>}
            <Button type="button" variant={block.buttonVariant}>
              {block.buttonText}
            </Button>
          </div>
          <div className="image">
            <img src={block.image} alt={block.imageAlt} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { HelpSection };
