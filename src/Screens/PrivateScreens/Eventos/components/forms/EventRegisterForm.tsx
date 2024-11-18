import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, mixed, InferType } from "yup";
import { addEvent } from "../../../../../services/storage/eventsApi"; // Ajustado para a nova API
import { nanoid } from 'nanoid';
import { publish } from "../../../../../utils/events";

interface IRegisterFormProps {
  handleCancel?: () => void;
}

const validationSchema = object({
  name: string().required("Nome do evento é obrigatório!"),
  quantity: string() // Agora você não precisa mais validar o formato, já que o input é de tipo date
    .required("A data é obrigatória!"),
  status: mixed().oneOf(["Em Andamento", "Concluído"], "Escolha uma das opções!").required("Status é obrigatório!"),
  description: string(),
});

type RegisterFormData = InferType<typeof validationSchema>;

export const EventRegisterForm = ({ handleCancel }: IRegisterFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      quantity: "", // Inicialmente, você pode manter como string
      status: "",
      description: ""
    },
    mode: "onSubmit"
  });

  async function handleCreateNewEvent(data: RegisterFormData) {
    try {
      const quantityDate = new Date(data.quantity); // O valor já vem no formato correto

      const newEvent = {
        id: nanoid(6),
        name: data.name,
        date: quantityDate.getTime(), // Convertendo para timestamp
        status: String(data.status), // Garantindo que status seja uma string
        description: data.description,
      };
      
      await addEvent(newEvent); // Chamando a API de eventos
      publish("events:close-register-modal"); // Evento para fechar o modal
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(handleCreateNewEvent)}>
      <div className="fields-container">
        <div className="input-container">
          <label htmlFor="name">Nome do evento</label>
          <input
            type="text"
            className="form-control"
            {...register("name")}
          />
          {errors.name && <p className="input-error">{errors.name.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="quantity">Data</label>
          <input
            type="date" // Mudando para tipo date
            className="form-control"
            {...register("quantity")}
          />
          {errors.quantity && <p className="input-error">{errors.quantity.message}</p>}
        </div>
        
        <div className="input-container">
          <label htmlFor="description">Descrição <span className="optional">(opcional)</span></label>
          <input
            type="text"
            className="form-control"
            {...register("description")}
          />
        </div>

        <div className="input-container">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            {...register("status")}
          >
            <option value="">Escolha uma opção</option>
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
          </select>
          {errors.status && <p className="input-error">{errors.status.message}</p>}
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
          Criar Evento
        </button>
      </div>
    </form>
  );
}
