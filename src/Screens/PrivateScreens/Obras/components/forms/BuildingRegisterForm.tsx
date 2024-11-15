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
  id_endereco: number().required("Endereço é obrigatório"),
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
      id_endereco: 0,
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
        id_construcao: nanoid(6),  // Gerando o ID único para a construção
        id_endereco: data.id_endereco,
        dt_inicio: data.dt_inicio,
        dt_termino: data.dt_termino,
        situacao_construcao: data.situacao_construcao,
        custo_estimado: data.custo_estimado,
        custo_total: data.custo_total,
      };

      await addBuilding(newBuilding);  // Envia os dados para a API
      publish("building:close-register-modal");  // Publica um evento para fechar o modal
    } catch (error) {
      return error;
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(handleCreateNewBuilding)}>
      <div className="fields-container">
        <div className="input-container">
          <label htmlFor="id_endereco">ID do Endereço</label>
          <input
            type="number"
            className="form-control"
            {...register("id_endereco")}
          />
          {errors.id_endereco && <p className="input-error">{errors.id_endereco.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="dt_inicio">Data de Início</label>
          <input
            type="date"
            className="form-control"
            {...register("dt_inicio")}
          />
          {errors.dt_inicio && <p className="input-error">{errors.dt_inicio.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="dt_termino">Data de Término <span className="optional">(opcional)</span></label>
          <input
            type="date"
            className="form-control"
            {...register("dt_termino")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="situacao_construcao">Situação da Construção</label>
          <input
            type="text"
            className="form-control"
            {...register("situacao_construcao")}
          />
          {errors.situacao_construcao && <p className="input-error">{errors.situacao_construcao.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="custo_estimado">Custo Estimado</label>
          <input
            type="number"
            className="form-control"
            {...register("custo_estimado")}
          />
          {errors.custo_estimado && <p className="input-error">{errors.custo_estimado.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="custo_total">Custo Total <span className="optional">(opcional)</span></label>
          <input
            type="number"
            className="form-control"
            {...register("custo_total")}
          />
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
