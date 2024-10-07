import { useState } from "react";
import ImageDropzone from "../../../components/Dropzone";
import Button from "../../../components/Button";
import { createNews, updateNews } from "../../../services/newService.ts";
import { toast } from "react-hot-toast";
import NewsCard from "../../../components/NewsCard";

const Noticias = () => {
  const [formData, setFormData] = useState<News>({
    id: null,
    titulo: "",
    descricao: "",
    data: "",
    ativa: false,
    link: "",
    etiqueta: "",
    image: "",
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
    setFormData({ ...formData, image: previewUrl || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      if (formData.id) {
        await updateNews(formData);
        toast.success("Notícia Atualizada com sucesso!");
      } else {
        await createNews(formData);
        toast.success("Notícia criada com sucesso!");
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-secondary">Notícias</h2>

      <div className="row">
        <div className="col-md-6 me-5">
          <ImageDropzone
            onImageUpload={handleImageUpload}
            value={formData.image}
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
                onClick={() => {
                  setFormData({
                    id: null,
                    titulo: "",
                    descricao: "",
                    data: "",
                    ativa: false,
                    link: "",
                    etiqueta: "",
                    image: "",
                  });
                  setErrors({
                    titulo: false,
                    descricao: false,
                    data: false,
                    link: false,
                    etiqueta: false,
                  });
                }}
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
          <NewsCard
            data={formData.data}
            descricao={formData.descricao}
            etiqueta={formData.etiqueta}
            link={formData.link}
            titulo={formData.titulo}
            image={formData.image}
          />
        </div>
      </div>
    </div>
  );
};

export { Noticias };
