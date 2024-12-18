import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, date, InferType } from "yup";
import { publish } from "../../../../../utils/events";
import { updateBuilding, deleteBuilding, Building } from "../../../../../services/buildings/buildingApi";
import toast from "react-hot-toast";

interface IEditFormProps {
  selectedBuilding: Building;
}

enum SITUACAO_CONSTRUCAO {
  "Em andamento" = "EM_ANDAMENTO",
  "Concluída" = "CONCLUIDA",
  "Pausada" = "PAUSADA",
  "Cancelada" = "CANCELADA",
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
      Object.values(SITUACAO_CONSTRUCAO),
      "Situação inválida"
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

type EditFormData = InferType<IEditFormProps>;

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
      toast.success("Construção atualizada com sucesso");
    } catch (error) {
      toast.error("Falha ao atualizar a construção");
      console.error("Erro ao atualizar construção:", error);
    }
  }

  async function handleDeleteBuilding() {
    try {
      await deleteBuilding(selectedBuilding.id);
      publish("building:close-edit-modal");
      toast.success("Construção excluída com sucesso");
    } catch (error) {
      toast.error("Falha ao excluir construção");
      console.error("Erro ao deletar construção:", error);
    }
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit(handleEditBuilding)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div className="fields-container" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="descricao">Descrição da Obra</label>
          <textarea className="form-control" {...register("descricao")} rows={4} />
          {errors.descricao && <p className="input-error">{errors.descricao.message}</p>}
        </div>

        {/* Flex container for fields */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div className="input-container" style={{ flex: 3 }}>
            <label htmlFor="logradouro">Logradouro</label>
            <input type="text" className="form-control" {...register("logradouro")} />
            {errors.logradouro && <p className="input-error">{errors.logradouro.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="numero">Número</label>
            <input type="number" className="form-control" {...register("numero")} />
            {errors.numero && <p className="input-error">{errors.numero.message}</p>}
          </div>
        </div>

        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="bairro">Bairro</label>
          <input type="text" className="form-control" {...register("bairro")} />
          {errors.bairro && <p className="input-error">{errors.bairro.message}</p>}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div className="input-container" style={{ flex: 3 }}>
            <label htmlFor="cidade">Cidade</label>
            <input type="text" className="form-control" {...register("cidade")} />
            {errors.cidade && <p className="input-error">{errors.cidade.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="uf">UF</label>
            <input type="text" className="form-control" {...register("uf")} />
            {errors.uf && <p className="input-error">{errors.uf.message}</p>}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_inicio">Data de Início</label>
            <input type="date" className="form-control" {...register("dt_inicio")} />
            {errors.dt_inicio && <p className="input-error">{errors.dt_inicio.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_termino">
              Data de Término <span className="optional">(opcional)</span>
            </label>
            <input type="date" className="form-control" {...register("dt_termino")} />
            {errors.dt_termino && <p className="input-error">{errors.dt_termino.message}</p>}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="custo_estimado">Custo Estimado</label>
            <input type="number" className="form-control" {...register("custo_estimado")} />
            {errors.custo_estimado && <p className="input-error">{errors.custo_estimado.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="custo_total">
              Custo Total <span className="optional">(opcional)</span>
            </label>
            <input type="number" className="form-control" {...register("custo_total")} />
            {errors.custo_total && <p className="input-error">{errors.custo_total.message}</p>}
          </div>
        </div>

        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="situacao_construcao">Situação da Construção</label>
          <select className="form-control" {...register("situacao_construcao")}>
            {Object.values(SITUACAO_CONSTRUCAO).map((situacao) => (
              <option key={situacao} value={situacao}>
                {situacao}
              </option>
            ))}
          </select>
          {errors.situacao_construcao && <p className="input-error">{errors.situacao_construcao.message}</p>}
        </div>
      </div>

      <div
        className="buttons-container"
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="btn-secondary"
          type="button"
          onClick={handleDeleteBuilding}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Deletar
        </button>
        <button
          className="btn-primary"
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Atualizar
        </button>
      </div>
    </form>
  );
};