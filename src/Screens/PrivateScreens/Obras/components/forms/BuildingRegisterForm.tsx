import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, date, number, InferType } from "yup";
import { nanoid } from "nanoid";
import { publish } from "../../../../../utils/events";
import { addBuilding } from "../../../../../services/buildings/buildingApi";

interface IRegisterFormProps {
  handleCancel?: () => void;
}

const validationSchema = object({
  descricao: string().required("Descrição é obrigatória"),
  logradouro: string().required("Logradouro é obrigatório"),
  numero: number().required("Número é obrigatório").typeError("Número deve ser um valor numérico"),
  bairro: string().required("Bairro é obrigatório"),
  cidade: string().required("Cidade é obrigatória"),
  uf: string().required("UF é obrigatória").length(2, "UF deve ter exatamente 2 caracteres"),
  dt_inicio: date().required("Data de início é obrigatória"),
  dt_termino: date().optional(),
  situacao_construcao: string().required("Situação da construção é obrigatória"),
  custo_estimado: number().required("Custo estimado é obrigatório"),
  custo_total: number().optional(),
});

type RegisterFormData = InferType<typeof validationSchema>;

export const BuildingRegisterForm = ({ handleCancel }: IRegisterFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      descricao: "",
      logradouro: "",
      numero: 0,
      bairro: "",
      cidade: "",
      uf: "",
      dt_inicio: new Date(),
      dt_termino: undefined,
      situacao_construcao: "",
      custo_estimado: 0,
      custo_total: undefined,
    },
    mode: "onSubmit",
  });

  async function handleCreateNewBuilding(data: RegisterFormData) {
    try {
      const newBuilding = {
        id: nanoid(6),  // Gerando o ID único para a construção
        descricao: data.descricao,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        dt_inicio: data.dt_inicio,
        dt_termino: data.dt_termino,
        situacao_construcao: data.situacao_construcao,
        custo_estimado: data.custo_estimado,
        custo_total: data.custo_total,
      };

      await addBuilding(newBuilding);  // Envia os dados para a API
      publish("building:close-register-modal")
    } catch (error) {
      return error;
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(handleCreateNewBuilding)} style={{ display: "flex", flexDirection: "column" }}>
      <div className="fields-container" style={{
        maxHeight: "400px", 
        overflowY: "auto", 
        paddingRight: "20px",  // Mover a barra de rolagem para a direita
        paddingLeft: "20px",   // Espaço à esquerda
        marginRight: "10px",   // Margem para não colidir com a borda
        flexGrow: 1,  // Permite que o campo de entrada ocupe o restante do espaço
      }}>
        {/* Descrição da obra */}
        <div className="input-container">
          <label htmlFor="descricao">Descrição da Obra</label>
          <textarea
            className="form-control"
            {...register("descricao")}
            rows={4}
          />
          {errors.descricao && <p className="input-error">{errors.descricao.message}</p>}
        </div>

        {/* Logradouro e Número */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 3 }}>
            <label htmlFor="logradouro">Logradouro</label>
            <input
              type="text"
              className="form-control"
              {...register("logradouro")}
            />
            {errors.logradouro && <p className="input-error">{errors.logradouro.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              className="form-control"
              {...register("numero")}
            />
            {errors.numero && <p className="input-error">{errors.numero.message}</p>}
          </div>
        </div>

        {/* Bairro */}
        <div className="input-container">
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            className="form-control"
            {...register("bairro")}
          />
          {errors.bairro && <p className="input-error">{errors.bairro.message}</p>}
        </div>

        {/* Cidade e UF */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 3 }}>
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              {...register("cidade")}
            />
            {errors.cidade && <p className="input-error">{errors.cidade.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="uf">UF</label>
            <input
              type="text"
              className="form-control"
              {...register("uf")}
            />
            {errors.uf && <p className="input-error">{errors.uf.message}</p>}
          </div>
        </div>

        {/* Data de Início e Término */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_inicio">Data de Início</label>
            <input
              type="date"
              className="form-control"
              {...register("dt_inicio")}
            />
            {errors.dt_inicio && <p className="input-error">{errors.dt_inicio.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="dt_termino">Data Final <span className="optional">(opcional)</span></label>
            <input
              type="date"
              className="form-control"
              {...register("dt_termino")}
            />
          </div>
        </div>

        {/* Custo Estimado e Custo Total */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="custo_estimado">Custo Estimado</label>
            <input
              type="number"
              className="form-control"
              {...register("custo_estimado")}
            />
            {errors.custo_estimado && <p className="input-error">{errors.custo_estimado.message}</p>}
          </div>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="custo_total">Custo Total <span className="optional">(opcional)</span></label>
            <input
              type="number"
              className="form-control"
              {...register("custo_total")}
            />
          </div>
        </div>

        {/* Situação da Construção */}
        <div className="input-container">
          <label htmlFor="situacao_construcao">Situação da Construção</label>
          <select
            className="form-control"
            {...register("situacao_construcao")}
          >
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
            <option value="Pausada">Pausada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          {errors.situacao_construcao && <p className="input-error">{errors.situacao_construcao.message}</p>}
        </div>
      </div>

      <div className="buttons-container">
        <button
          className="btn-secondary"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          className="btn-primary"
          type="submit"
        >
          Criar Registro
        </button>
      </div>
    </form>
  );
};