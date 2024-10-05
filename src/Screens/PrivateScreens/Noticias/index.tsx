import { useState } from "react";
import ImageDropzone from "../../../components/Dropzone";
import Button from "../../../components/Button";
import placeholderImage from "@images/placeholder-image.png";
import { IoIosArrowDropright } from "react-icons/io";

const Noticias = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data: "",
    ativa: false,
    link: "",
    etiqueta: "",
    imagem: "",
  });

  const [errors, setErrors] = useState({
    titulo: false,
    descricao: false,
    data: false,
    link: false,
    etiqueta: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (previewUrl: string | null) => {
    setFormData({ ...formData, imagem: previewUrl || "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      titulo: formData.titulo === "",
      descricao: formData.descricao === "",
      data: formData.data === "",
      link: formData.link === "",
      etiqueta: formData.etiqueta === "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      console.log("Formulário válido", formData);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-secondary">Notícias</h2>

      <div className="row">
        <div className="col-md-6 me-5">
          <ImageDropzone
            onImageUpload={handleImageUpload}
            value={formData.imagem}
          />
          <form onSubmit={handleSubmit} className="w-100">
            <div className="form-group row mb-3 flex-column">
              <label htmlFor="titulo" className="col-sm-2 col-form-label">
                Título
              </label>
              <div className="col-sm-10">
                <input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.titulo ? "is-invalid" : ""
                  }`}
                  placeholder="Título da notícia"
                />
                {errors.titulo && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
            </div>

            <div className="form-group row mb-3 flex-column">
              <label htmlFor="descricao" className="col-sm-2 col-form-label">
                Descrição
              </label>
              <div className="col-sm-10">
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.descricao ? "is-invalid" : ""
                  }`}
                  placeholder="Descrição da notícia"
                />
                {errors.descricao && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
            </div>

            <div className="form-group row mb-3 flex-column">
              <label htmlFor="data" className="col-sm-2 col-form-label">
                Data
              </label>
              <div className="col-sm-4">
                <input
                  id="data"
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  className={`form-control ${errors.data ? "is-invalid" : ""}`}
                />
                {errors.data && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
              <div className="col-sm-4 mt-3">
                <label htmlFor="ativa" className="col-sm-2 col-form-label me-2">
                  Ativa
                </label>
                <input
                  type="checkbox"
                  name="ativa"
                  id="ativa"
                  checked={formData.ativa}
                  onChange={handleInputChange}
                  className="form-check-input"
                  style={{ marginTop: "0.7rem" }}
                />
              </div>
            </div>

            <div className="form-group row mb-3 flex-column">
              <label htmlFor="link" className="col-sm-2 col-form-label">
                Link
              </label>
              <div className="col-sm-10">
                <input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className={`form-control ${errors.link ? "is-invalid" : ""}`}
                  placeholder="Link para redirecionar"
                />
                {errors.link && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
            </div>

            <div className="form-group row mb-3 flex-column">
              <label htmlFor="etiqueta" className="col-sm-2 col-form-label">
                Etiqueta
              </label>
              <div className="col-sm-10">
                <input
                  id="etiqueta"
                  name="etiqueta"
                  value={formData.etiqueta}
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.etiqueta ? "is-invalid" : ""
                  }`}
                  placeholder="Etiqueta da notícia"
                />
                {errors.etiqueta && (
                  <div className="invalid-feedback">Campo obrigatório.</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3 gap-3">
              <Button
                type="reset"
                variant="secondary"
                outline
                onClick={() =>
                  setFormData({
                    titulo: "",
                    descricao: "",
                    data: "",
                    ativa: false,
                    link: "",
                    etiqueta: "",
                    imagem: "",
                  })
                }
                className="me-2"
              >
                Limpar
              </Button>
              <Button type="submit" variant="primary">
                Salvar
              </Button>
            </div>
          </form>
        </div>

        <div className="col-md-5">
          <div className="p-3">
            <div className="card-body p-0">
              <div className="image-container position-relative">
                <div
                  className="position-relative"
                  style={{ width: "100%", height: "400px" }}
                >
                  <img
                    src={formData.imagem || placeholderImage}
                    alt="Notícia"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />

                  <div
                    className="badge text-uppercase position-absolute"
                    style={{
                      backgroundColor: "#f86c6b",
                      top: "0",
                      left: "0",
                      fontWeight: "bold",
                      borderBottomRightRadius: "12px",
                      borderBottomLeftRadius: "0",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "0",
                      padding: "5px 10px",
                      zIndex: 2,
                    }}
                  >
                    {formData.etiqueta || "Etiqueta"}
                  </div>

                  <div
                    className="overlay position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0))",
                    }}
                  ></div>

                  <div
                    className="position-absolute bottom-0 start-0 text-white p-3"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      zIndex: 2,
                    }}
                  >
                    {formData.titulo || "Título da Notícia"}
                  </div>
                </div>
              </div>

              <div className="p-3">
                <p
                  className="card-text"
                  style={{ color: "#6c757d", fontSize: "0.9rem" }}
                >
                  {formData.descricao || "Descrição"}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {formData.data || "Data"}
                  </small>

                  {formData.link ? (
                    <a
                      href={formData.link}
                      target="_blank"
                      className="text-danger text-decoration-none"
                      style={{ fontSize: "0.9rem", fontWeight: "bold" }}
                    >
                      <IoIosArrowDropright size={22} /> Ver mais
                    </a>
                  ) : null}
                </div>
                <div
                  className="mt-2"
                  style={{
                    height: "6px",
                    width: "20%",
                    backgroundColor: "#f86c6b",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Noticias };
