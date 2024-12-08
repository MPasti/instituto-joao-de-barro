import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, date, InferType } from "yup";
import {
  updateBuilding,
  deleteBuilding,
  Building,
} from "../../../../../services/buildings/buildingApi";
import { publish } from "../../../../../utils/events";

interface IEditFormProps {
  selectedBuilding: Building;
}

const validationSchema = object({
  descricao: string().required("Descrição é obrigatória"),
  logradouro: string().required("Logradouro é obrigatório"),
  numero: number()
    .required("Número é obrigatório")
    .typeError("Número deve ser um valor numérico"),
  bairro: string().required("Bairro é obrigatório"),
  cidade: string().required("Cidade é obrigatória"),
  uf: string()
    .required("UF é obrigatória")
    .length(2, "UF deve ter exatamente 2 caracteres"),
  dt_inicio: date()
    .transform((value) => (value instanceof Date ? value : new Date(value)))
    .required("Data de início é obrigatória")
    .typeError("Data de início deve ser uma data válida"),
  dt_termino: date()
    .transform((value) => (value instanceof Date ? value : new Date(value)))
    .optional()
    .typeError("Data de término deve ser uma data válida"),
  situacao_construcao: string()
    .required("Situação da construção é obrigatória")
    .oneOf(
      ["Em andamento", "Concluída", "Pausada", "Cancelada"],
      "Situação inválida",
    ),
  custo_estimado: number()
    .required("Custo estimado é obrigatório")
    .positive("Informe um custo válido")
    .typeError("Custo estimado deve ser um número"),
  custo_total: number()
    .optional()
    .positive("Informe um custo válido")
    .typeError("Custo total deve ser um número"),
});

type EditFormData = InferType<typeof validationSchema>;

export const BuildingEditForm = ({ selectedBuilding }: IEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      descricao: selectedBuilding.descricao || "",
      logradouro: selectedBuilding.logradouro,
      numero: selectedBuilding.numero,
      bairro: selectedBuilding.bairro,
      cidade: selectedBuilding.cidade,
      uf: selectedBuilding.uf,
      dt_inicio: selectedBuilding.dt_inicio
        ? new Date(selectedBuilding.dt_inicio).toISOString().split("T")[0]
        : "",
      dt_termino: selectedBuilding.dt_termino
        ? new Date(selectedBuilding.dt_termino).toISOString().split("T")[0]
        : "",
      situacao_construcao: selectedBuilding.situacao_construcao,
      custo_estimado: selectedBuilding.custo_estimado,
      custo_total: selectedBuilding.custo_total || 0,
    },
    mode: "onSubmit",
  });

  async function handleEditBuilding(data: EditFormData) {
    try {
      const updatedBuilding = {
        ...selectedBuilding,
        ...data,
      };
      await updateBuilding(selectedBuilding.id, updatedBuilding);
      publish("building:close-edit-modal");
    } catch (error) {
      console.error("Erro ao atualizar construção:", error);
    }
  }

  async function handleDeleteBuilding() {
    try {
      await deleteBuilding(selectedBuilding.id);
      publish("building:close-edit-modal");
    } catch (error) {
      console.error("Erro ao deletar construção:", error);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(handleEditBuilding)}>
      <div
        className="fields-container"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "20px",
          paddingLeft: "20px",
          marginRight: "10px",
        }}
      >
        <div className="input-container">
          <label htmlFor="descricao">Descrição da Obra</label>
          <textarea
            className="form-control"
            {...register("descricao")}
            rows={4}
          />
          {errors.descricao && (
            <p className="input-error">{errors.descricao.message}</p>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 3 }}>
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              className="form-control"
              {...register("logradouro")}
            />
            {errors.logradouro && (
              <p className="input-error">{errors.logradouro.message}</p>
            )}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              className="form-control"
              {...register("numero")}
            />
            {errors.numero && (
              <p className="input-error">{errors.numero.message}</p>
            )}
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="bairro">Bairro</label>
          <input type="text" className="form-control" {...register("bairro")} />
          {errors.bairro && (
            <p className="input-error">{errors.bairro.message}</p>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 3 }}>
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              {...register("cidade")}
            />
            {errors.cidade && (
              <p className="input-error">{errors.cidade.message}</p>
            )}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="uf">UF</label>
            <input type="text" className="form-control" {...register("uf")} />
            {errors.uf && <p className="input-error">{errors.uf.message}</p>}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_inicio">Data de Início</label>
            <input
              type="date"
              className="form-control"
              {...register("dt_inicio")}
            />
            {errors.dt_inicio && (
              <p className="input-error">{errors.dt_inicio.message}</p>
            )}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_termino">
              Data Final <span className="optional">(opcional)</span>
            </label>
            <input
              type="date"
              className="form-control"
              {...register("dt_termino")}
            />
            {errors.dt_termino && (
              <p className="input-error">{errors.dt_termino.message}</p>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="custo_estimado">Custo Estimado</label>
            <input
              type="number"
              className="form-control"
              {...register("custo_estimado")}
            />
            {errors.custo_estimado && (
              <p className="input-error">{errors.custo_estimado.message}</p>
            )}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="custo_total">
              Custo Total <span className="optional">(opcional)</span>
            </label>
            <input
              type="number"
              className="form-control"
              {...register("custo_total")}
            />
            {errors.custo_total && (
              <p className="input-error">{errors.custo_total.message}</p>
            )}
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="situacao_construcao">Situação da Construção</label>
          <select className="form-control" {...register("situacao_construcao")}>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
            <option value="Pausada">Pausada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          {errors.situacao_construcao && (
            <p className="input-error">{errors.situacao_construcao.message}</p>
          )}
        </div>
      </div>

      <div className="buttons-container">
        <button
          className="btn-secondary"
          type="button"
          onClick={handleDeleteBuilding}
        >
          Deletar
        </button>
        <button className="btn-primary" type="submit">
          Atualizar
        </button>
      </div>
    </form>
  );
};
