import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, date, number, InferType } from "yup";
import { nanoid } from "nanoid";
import { publish } from "../../../../../utils/events";
import { addBuilding } from "../../../../../services/buildings/buildingApi";
import { toast } from "react-hot-toast";

// Definindo o schema de validação com Yup
const buildingValidationSchema = object({
  descricao: string().required("Descrição da obra é obrigatória"),
  logradouro: string().required("Logradouro é obrigatório"),
  numero: number().required("Número é obrigatório"),
  bairro: string().required("Bairro é obrigatório"),
  cidade: string().required("Cidade é obrigatória"),
  uf: string().required("UF é obrigatória"),
  dt_inicio: date().required("Data de início é obrigatória"),
  dt_termino: date().optional(),
  situacao_construcao: string().required("Situação da construção é obrigatória"),
  custo_estimado: string().required("Custo estimado é obrigatório"),
  custo_total: string().optional(),
});

type BuildingRegisterFormData = InferType<typeof buildingValidationSchema>;

interface IRegisterFormProps {
  handleCancel?: () => void;
}

export const BuildingRegisterForm = ({ handleCancel }: IRegisterFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BuildingRegisterFormData>({
    resolver: yupResolver(buildingValidationSchema),
    defaultValues: {
      descricao: "",
      logradouro: "",
      numero: 0,
      bairro: "",
      cidade: "",
      uf: "",
      dt_inicio: undefined,
      dt_termino: undefined,
      situacao_construcao: "",
      custo_estimado: "",
      custo_total: "",
    },
    mode: "onSubmit",
  });

  async function handleCreateNewBuilding(data: BuildingRegisterFormData) {
    try {
      const newBuilding = {
        id: nanoid(6),
        ...data,
        custo_estimado: parseFloat(data.custo_estimado.replace(",", ".")),
        custo_total: data.custo_total ? parseFloat(data.custo_total.replace(",", ".")) : undefined,
      };

      await addBuilding(newBuilding);
      publish("building:close-register-modal");
      toast.success("Construção registrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao registrar construção.");
      return error;
    }
  }
  return (
    <form
      className="form"
      onSubmit={handleSubmit(handleCreateNewBuilding)}
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
          <textarea
            className="form-control"
            {...register("descricao")}
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              minHeight: "100px",
              borderColor: errors.descricao ? "red" : "black",
            }}
          />
          {errors.descricao && <p style={{ color: "red" }}>{errors.descricao.message}</p>}
        </div>
  
        {/* Logradouro e Número */}
        <div className="row-container" style={{ display: "flex", gap: "15px" }}>
          <div className="input-container" style={{ flex: 2 }}>
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              className="form-control"
              {...register("logradouro")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                borderColor: errors.logradouro ? "red" : "black",
              }}
            />
            {errors.logradouro && <p style={{ color: "red" }}>{errors.logradouro.message}</p>}
          </div>
  
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="numero">Número</label>
            <input
              type="text"
              className="form-control"
              {...register("numero")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                borderColor: errors.numero ? "red" : "black",
              }}
            />
            {errors.numero && <p style={{ color: "red" }}>{errors.numero.message}</p>}
          </div>
        </div>
  
        {/* Bairro */}
        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            className="form-control"
            {...register("bairro")}
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              borderColor: errors.bairro ? "red" : "black",
            }}
          />
          {errors.bairro && <p style={{ color: "red" }}>{errors.bairro.message}</p>}
        </div>
  
        {/* Cidade e UF */}
        <div className="row-container" style={{ display: "flex", gap: "15px" }}>
          <div className="input-container" style={{ flex: 2 }}>
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              {...register("cidade")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                borderColor: errors.cidade ? "red" : "black",
              }}
            />
            {errors.cidade && <p style={{ color: "red" }}>{errors.cidade.message}</p>}
          </div>
  
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="uf">UF</label>
            <input
              type="text"
              className="form-control"
              {...register("uf")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                borderColor: errors.uf ? "red" : "black",
              }}
            />
            {errors.uf && <p style={{ color: "red" }}>{errors.uf.message}</p>}
          </div>
        </div>
  
        {/* Datas */}
        <div className="row-container" style={{ display: "flex", gap: "15px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_inicio">Data de Início</label>
            <input
              type="date"
              className="form-control"
              {...register("dt_inicio")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                borderColor: errors.dt_inicio ? "red" : "black",
              }}
            />
            {errors.dt_inicio && <p style={{ color: "red" }}>{errors.dt_inicio.message}</p>}
          </div>
  
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_termino">Data de Término</label>
            <input
              type="date"
              className="form-control"
              {...register("dt_termino")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
              }}
            />
          </div>
        </div>
  
        {/* Situação da Construção */}
        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="situacao_construcao">Situação da Construção</label>
          <select
            className="form-control"
            {...register("situacao_construcao")}
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              borderColor: errors.situacao_construcao ? "red" : "black",
            }}
          >
            <option value="" disabled>Selecione</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
            <option value="Pausada">Pausada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          {errors.situacao_construcao && <p style={{ color: "red" }}>{errors.situacao_construcao.message}</p>}
        </div>
  
        {/* Custos */}
        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="custo_estimado">Custo Estimado</label>
          <input
            type="text"
            className="form-control"
            {...register("custo_estimado")}
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              borderColor: errors.custo_estimado ? "red" : "black",
            }}
          />
          {errors.custo_estimado && <p style={{ color: "red" }}>{errors.custo_estimado.message}</p>}
        </div>
  
        <div className="input-container" style={{ flex: 1 }}>
          <label htmlFor="custo_total">Custo Total</label>
          <input
            type="text"
            className="form-control"
            {...register("custo_total")}
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
      </div>
  
      {/* Botões */}
      <div className="buttons-container">
  <button
    type="button"
    onClick={handleCancel}
    className="btn-secondary"
  >
    Cancelar
  </button>
  <button
    type="submit"
    className="btn-primary"
  >
    Criar Registro
  </button>
</div>
    </form>
  );
  
}