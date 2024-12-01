import React, { useState } from "react";

const initialData = {
  landingPage: {
    carousel: [{ image: "", title: "", buttonLabel: "" }],
    aboutUs: "",
    results: {
      content: "",
      beforeImage: "",
      afterImage: "",
    },
    additionalInfo: [
      { title: "", text: "", image: "" },
      { title: "", text: "", image: "" },
      { title: "", text: "", image: "" },
    ],
  },
  aboutUs: {
    content: "",
  },
  contact: {
    email: "",
    phone: "",
  },
};

export const PainelDoEditor: React.FC = () => {
  const [data, setData] = useState(initialData);

  const handleInputChange = (
    page: string,
    key: string,
    value: unknown,
    index?: number,
  ) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      if (index !== undefined && Array.isArray(updatedData[page][key])) {
        updatedData[page][key][index] = {
          ...updatedData[page][key][index],
          ...value,
        };
      } else {
        updatedData[page][key] = value;
      }
      return updatedData;
    });
  };

  const handleDeleteCarouselItem = (index: number) => {
    setData((prev) => {
      const updatedCarousel = prev.landingPage.carousel.filter(
        (_, i) => i !== index,
      );
      return {
        ...prev,
        landingPage: {
          ...prev.landingPage,
          carousel: updatedCarousel,
        },
      };
    });
  };

  return (
    <div className="editor-panel">
      <h1>Painel do Editor</h1>

      <section>
        <h2>Landing Page</h2>
        {data.landingPage.carousel.map((item, index) => (
          <div key={index}>
            <h3>Carrossel {index + 1}</h3>
            <label>
              Imagem:
              <input
                type="text"
                value={item.image}
                onChange={(e) =>
                  handleInputChange(
                    "landingPage",
                    "carousel",
                    { image: e.target.value },
                    index,
                  )
                }
              />
            </label>
            <label>
              Título:
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleInputChange(
                    "landingPage",
                    "carousel",
                    { title: e.target.value },
                    index,
                  )
                }
              />
            </label>
            <label>
              Label do Botão:
              <input
                type="text"
                value={item.buttonLabel}
                onChange={(e) =>
                  handleInputChange(
                    "landingPage",
                    "carousel",
                    { buttonLabel: e.target.value },
                    index,
                  )
                }
              />
            </label>
            <button onClick={() => handleDeleteCarouselItem(index)}>
              Remover Item
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setData((prev) => ({
              ...prev,
              landingPage: {
                ...prev.landingPage,
                carousel: [
                  ...prev.landingPage.carousel,
                  { image: "", title: "", buttonLabel: "" },
                ],
              },
            }))
          }
        >
          Adicionar Item ao Carrossel
        </button>

        <h3>Quem Somos Nós</h3>
        <label>
          Conteúdo:
          <textarea
            value={data.landingPage.aboutUs}
            onChange={(e) =>
              handleInputChange("landingPage", "aboutUs", e.target.value)
            }
          />
        </label>

        <h3>Resultados</h3>
        <label>
          Texto:
          <textarea
            value={data.landingPage.results.content}
            onChange={(e) =>
              handleInputChange("landingPage", "results", {
                content: e.target.value,
              })
            }
          />
        </label>
        <label>
          Imagem Antes:
          <input
            type="text"
            value={data.landingPage.results.beforeImage}
            onChange={(e) =>
              handleInputChange("landingPage", "results", {
                beforeImage: e.target.value,
              })
            }
          />
        </label>
        <label>
          Imagem Depois:
          <input
            type="text"
            value={data.landingPage.results.afterImage}
            onChange={(e) =>
              handleInputChange("landingPage", "results", {
                afterImage: e.target.value,
              })
            }
          />
        </label>

        <h3>Informações Adicionais</h3>
        {data.landingPage.additionalInfo.map((block, index) => (
          <div key={index}>
            <h4>Bloco {index + 1}</h4>
            <label>
              Título:
              <input
                type="text"
                value={block.title}
                onChange={(e) =>
                  handleInputChange(
                    "landingPage",
                    "additionalInfo",
                    { title: e.target.value },
                    index,
                  )
                }
              />
            </label>
            <label>
              Texto:
              <textarea
                value={block.text}
                onChange={(e) =>
                  handleInputChange(
                    "landingPage",
                    "additionalInfo",
                    { text: e.target.value },
                    index,
                  )
                }
              />
            </label>
            <label>
              Imagem:
              <input
                type="text"
                value={block.image}
                onChange={(e) =>
                  handleInputChange(
                    "landingPage",
                    "additionalInfo",
                    { image: e.target.value },
                    index,
                  )
                }
              />
            </label>
          </div>
        ))}
        <button
          onClick={() =>
            setData((prev) => ({
              ...prev,
              landingPage: {
                ...prev.landingPage,
                additionalInfo: [
                  ...prev.landingPage.additionalInfo,
                  { title: "", text: "", image: "" },
                ],
              },
            }))
          }
        >
          Adicionar Bloco
        </button>
      </section>

      <section>
        <h2>Sobre Nós</h2>
        <label>
          Conteúdo:
          <textarea
            value={data.aboutUs.content}
            onChange={(e) =>
              handleInputChange("aboutUs", "content", e.target.value)
            }
          />
        </label>
      </section>

      <section>
        <h2>Contato</h2>
        <label>
          E-mail:
          <input
            type="text"
            value={data.contact.email}
            onChange={(e) =>
              handleInputChange("contact", "email", e.target.value)
            }
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={data.contact.phone}
            onChange={(e) =>
              handleInputChange("contact", "phone", e.target.value)
            }
          />
        </label>
      </section>
    </div>
  );
};
