import { useState } from "react";
import ImageDropzone from "../../../components/Dropzone";
import Button from "../../../components/Button";
import {
  createNews,
  deleteNews,
  getNews,
  updateNews,
} from "../../../services/newService.ts";
import { toast } from "react-hot-toast";
import NewsCard from "../../../components/NewsCard";
import { Modal } from "../../../components/Modal/Modal.tsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Utils from "../../../utils";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticias, setNoticias] = useState<News[]>([]);

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
      try {
        if (formData.id) {
          await updateNews(formData);
          toast.success("Notícia atualizada com sucesso!");
        } else {
          await createNews(formData);
          toast.success("Notícia criada com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao salvar notícia:", error);
        toast.error(
          error.response?.data?.message ||
            "Ocorreu um erro ao salvar a notícia.",
        );
      }
    } else {
      toast.error("Preencha todos os campos obrigatórios.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNews(id);
      toast.success("Notícia excluída com sucesso!");
      await fetchNoticias();
    } catch (error) {
      console.error("Erro ao excluir notícia:", error);
      toast.error(
        error.response?.data?.message || "Erro ao excluir a notícia.",
      );
    }
  };

  const fetchNoticias = async () => {
    try {
      const response = await getNews();
      if (response) {
        setNoticias(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao buscar notícias");
    }
  };

  const handleModalOpen = async () => {
    await fetchNoticias();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (noticia: News) => {
    setFormData({
      id: noticia.id,
      titulo: noticia.titulo,
      descricao: noticia.descricao,
      data: noticia.data,
      ativa: noticia.ativa || false,
      link: noticia.link,
      etiqueta: noticia.etiqueta,
      image: noticia.image || "",
    });
    handleModalClose();
  };

  return (
    <div className="container mt-4 mb-5 position-relative">
      <Button
        type="button"
        variant="primary"
        className="position-absolute top-0 end-0 me-3 mt-3"
        onClick={handleModalOpen}
      >
        Ver Notícias <FaMagnifyingGlass />
      </Button>
      <h2 className="text-secondary">Notícias</h2>

      <form onSubmit={handleSubmit} className="row w-100">
        <div className="col-md-6 me-5">
          <ImageDropzone
            onImageUpload={handleImageUpload}
            value={formData.image}
          />

          <div className="form-group row mb-3 flex-column">
            <label htmlFor="titulo" className="col-sm-2 col-form-label">
              Título
            </label>
            <div className="w-100">
              <input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                placeholder="Título da notícia"
              />
            </div>
          </div>

          <div className="form-group row mb-3 flex-column">
            <label htmlFor="descricao" className="col-sm-2 col-form-label">
              Descrição
            </label>
            <div className="w-100">
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={4}
                className={`form-control ${
                  errors.descricao ? "is-invalid" : ""
                }`}
                placeholder="Descrição da notícia"
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col-sm-6">
              <label htmlFor="data" className="form-label">
                Data
              </label>
              <input
                id="data"
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className={`form-control ${errors.data ? "is-invalid" : ""}`}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="ativa" className="form-label">
                Ativa
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  name="ativa"
                  id="ativa"
                  checked={formData.ativa}
                  onChange={handleInputChange}
                  className="form-check-input me-2"
                />
              </div>
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
                className={`form-control ${errors.etiqueta ? "is-invalid" : ""}`}
                placeholder="Etiqueta da notícia"
              />
            </div>
          </div>
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
            {formData.id ? "Cancelar Edição" : "Limpar"}
          </Button>
          <Button type="submit" variant="primary">
            {formData.id ? "Editar" : "Salvar"}
          </Button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        className="news-modal"
      >
        <section className="news-search-table p-4">
          <h3>Lista de Notícias</h3>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Etiqueta</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {noticias.length > 0 ? (
                  noticias.map((noticia) => (
                    <tr key={noticia.id}>
                      <td>{noticia.titulo}</td>
                      <td>{noticia.descricao}</td>
                      <td>{Utils.formatDate(noticia.data)}</td>
                      <td>{noticia.etiqueta}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => {
                            handleEdit(noticia);
                          }}
                        >
                          Editar
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={async () => {
                            if (noticia?.id) {
                              await handleDelete(noticia.id);
                            }
                          }}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Nenhuma notícia cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export { Noticias };
