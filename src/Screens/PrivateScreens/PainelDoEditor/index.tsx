import React, { useState } from "react";
import Button from "../../../components/Button";

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
    partnerCompanies: [{ name: "", image: "" }],
  },
  aboutUs: {
    content: "",
    video: "",
    ijbTree: [{ title: "", description: "", image: "", year: "" }],
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

  const handleDeletePartnerCompany = (index: number) => {
    setData((prev) => {
      const updatedCompanies = prev.landingPage.partnerCompanies.filter(
        (_, i) => i !== index,
      );
      return {
        ...prev,
        landingPage: {
          ...prev.landingPage,
          partnerCompanies: updatedCompanies,
        },
      };
    });
  };

  const handleDeleteIjbTreeItem = (index: number) => {
    setData((prev) => {
      const updatedIjbTree = prev.aboutUs.ijbTree.filter((_, i) => i !== index);
      return {
        ...prev,
        aboutUs: {
          ...prev.aboutUs,
          ijbTree: updatedIjbTree,
        },
      };
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Painel do Editor</h1>

      <div className="accordion" id="editorAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingLandingPage">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLandingPage"
              aria-expanded="true"
              aria-controls="collapseLandingPage"
            >
              Landing Page
            </button>
          </h2>
          <div
            id="collapseLandingPage"
            className="accordion-collapse collapse show"
            aria-labelledby="headingLandingPage"
            data-bs-parent="#editorAccordion"
          >
            <div className="accordion-body">
              <h3>Carrossel</h3>
              {data.landingPage.carousel.map((item, index) => (
                <div key={index} className="mb-3">
                  <h4>Item {index + 1}</h4>
                  <label className="form-label">Imagem:</label>
                  <input
                    type="text"
                    className="form-control"
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
                  <label className="form-label">Título:</label>
                  <input
                    type="text"
                    className="form-control"
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
                  <label className="form-label">Label do Botão:</label>
                  <input
                    type="text"
                    className="form-control"
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
                  <Button
                    outline
                    variant="secondary"
                    className="mt-2"
                    onClick={() => handleDeleteCarouselItem(index)}
                  >
                    Remover Item
                  </Button>
                </div>
              ))}
              <button
                className="btn btn-primary mt-2"
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

              <h3 className="mt-4">Quem Somos Nós</h3>
              <label className="form-label">Conteúdo:</label>
              <textarea
                className="form-control"
                value={data.landingPage.aboutUs}
                onChange={(e) =>
                  handleInputChange("landingPage", "aboutUs", e.target.value)
                }
              />

              <h3 className="mt-4">Resultados</h3>
              <label className="form-label">Texto:</label>
              <textarea
                className="form-control"
                value={data.landingPage.results.content}
                onChange={(e) =>
                  handleInputChange("landingPage", "results", {
                    content: e.target.value,
                  })
                }
              />
              <label className="form-label">Imagem Antes:</label>
              <input
                type="text"
                className="form-control"
                value={data.landingPage.results.beforeImage}
                onChange={(e) =>
                  handleInputChange("landingPage", "results", {
                    beforeImage: e.target.value,
                  })
                }
              />
              <label className="form-label">Imagem Depois:</label>
              <input
                type="text"
                className="form-control"
                value={data.landingPage.results.afterImage}
                onChange={(e) =>
                  handleInputChange("landingPage", "results", {
                    afterImage: e.target.value,
                  })
                }
              />

              <h3 className="mt-4">Empresas Parceiras</h3>
              {data.landingPage.partnerCompanies.map((company, index) => (
                <div key={index} className="mb-3">
                  <h4>Empresa {index + 1}</h4>
                  <label className="form-label">Nome:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={company.name}
                    onChange={(e) =>
                      handleInputChange(
                        "landingPage",
                        "partnerCompanies",
                        { name: e.target.value },
                        index,
                      )
                    }
                  />
                  <label className="form-label">Imagem:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={company.image}
                    onChange={(e) =>
                      handleInputChange(
                        "landingPage",
                        "partnerCompanies",
                        { image: e.target.value },
                        index,
                      )
                    }
                  />
                  <Button
                    outline
                    variant="secondary"
                    className="mt-2"
                    onClick={() => handleDeletePartnerCompany(index)}
                  >
                    Remover Empresa
                  </Button>
                </div>
              ))}
              <button
                className="btn btn-primary mt-2"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    landingPage: {
                      ...prev.landingPage,
                      partnerCompanies: [
                        ...prev.landingPage.partnerCompanies,
                        { name: "", image: "" },
                      ],
                    },
                  }))
                }
              >
                Adicionar Empresa
              </button>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingAboutUs">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAboutUs"
              aria-expanded="false"
              aria-controls="collapseAboutUs"
            >
              Sobre Nós
            </button>
          </h2>
          <div
            id="collapseAboutUs"
            className="accordion-collapse collapse"
            aria-labelledby="headingAboutUs"
            data-bs-parent="#editorAccordion"
          >
            <div className="accordion-body">
              <label className="form-label">Conteúdo:</label>
              <textarea
                className="form-control"
                value={data.aboutUs.content}
                onChange={(e) =>
                  handleInputChange("aboutUs", "content", e.target.value)
                }
              />

              <h3 className="mt-4">Vídeo Base</h3>
              <label className="form-label">URL do Vídeo:</label>
              <input
                type="text"
                className="form-control"
                value={data.aboutUs.video}
                onChange={(e) =>
                  handleInputChange("aboutUs", "video", e.target.value)
                }
              />

              <h3 className="mt-4">Árvore do IJB</h3>
              {data.aboutUs.ijbTree.map((item, index) => (
                <div key={index} className="mb-3">
                  <h4>Elemento {index + 1}</h4>
                  <label className="form-label">Título:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(
                        "aboutUs",
                        "ijbTree",
                        { title: e.target.value },
                        index,
                      )
                    }
                  />
                  <label className="form-label">Descrição:</label>
                  <textarea
                    className="form-control"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(
                        "aboutUs",
                        "ijbTree",
                        { description: e.target.value },
                        index,
                      )
                    }
                  />
                  <label className="form-label">Imagem:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.image}
                    onChange={(e) =>
                      handleInputChange(
                        "aboutUs",
                        "ijbTree",
                        { image: e.target.value },
                        index,
                      )
                    }
                  />
                  <label className="form-label">Ano:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.year}
                    onChange={(e) =>
                      handleInputChange(
                        "aboutUs",
                        "ijbTree",
                        { year: e.target.value },
                        index,
                      )
                    }
                  />
                  <Button
                    outline
                    variant="secondary"
                    className="mt-2"
                    onClick={() => handleDeleteIjbTreeItem(index)}
                  >
                    Remover Elemento
                  </Button>
                </div>
              ))}
              <button
                className="btn btn-primary mt-2"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    aboutUs: {
                      ...prev.aboutUs,
                      ijbTree: [
                        ...prev.aboutUs.ijbTree,
                        { title: "", description: "", image: "", year: "" },
                      ],
                    },
                  }))
                }
              >
                Adicionar Elemento
              </button>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingContact">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseContact"
              aria-expanded="false"
              aria-controls="collapseContact"
            >
              Contato
            </button>
          </h2>
          <div
            id="collapseContact"
            className="accordion-collapse collapse"
            aria-labelledby="headingContact"
            data-bs-parent="#editorAccordion"
          >
            <div className="accordion-body">
              <label className="form-label">E-mail:</label>
              <input
                type="email"
                className="form-control"
                value={data.contact.email}
                onChange={(e) =>
                  handleInputChange("contact", "email", e.target.value)
                }
              />
              <label className="form-label">Telefone:</label>
              <input
                type="tel"
                className="form-control"
                value={data.contact.phone}
                onChange={(e) =>
                  handleInputChange("contact", "phone", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        className="mt-3"
        onClick={() => console.log("Dados salvos:", data)}
        type="submit"
      >
        Salvar Alterações
      </Button>
    </div>
  );
};
