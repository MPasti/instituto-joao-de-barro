import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, mixed, InferType } from "yup"; 
import { updateEvent, deleteEvent, Event } from "../../../../../services/storage/eventsApi"; // Atualize para a API de eventos
import { publish } from "../../../../../utils/events";

interface IEditFormProps {
    selectedEvent: Event;
    handleCancel: () => void; // Adicionando a função handleCancel à interface
  }
  

const validationSchema = object({
    name: string().required("Nome do evento é obrigatório"),
    date: string()
        .required("Data é obrigatória!")
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/YYYY"),
    status: mixed().oneOf(["Pendente", "Concluído"], "Escolha uma das opções!").required("Status é obrigatório!"),
    description: string().optional()
});

type EditFormData = InferType<typeof validationSchema>;

export const EventsEditForm = ({ selectedEvent }: IEditFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: selectedEvent.name,
            date: new Date(selectedEvent.date).toLocaleDateString('pt-BR'), // Formatar a data para DD/MM/YYYY
            status: selectedEvent.status || "",
            description: selectedEvent.description || "",
        },
        mode: "onSubmit"
    });

    async function handleEditEvent(data: EditFormData) {
        try {
            const [day, month, year] = data.date.split('/');
            const eventDate = new Date(`${year}-${month}-${day}`);

            const updatedEvent = {
                ...selectedEvent,
                name: data.name,
                date: eventDate.getTime(), // Armazena a data em formato de timestamp
                status: String(data.status), // Garantindo que status seja uma string
                description: data.description,
            };
            
            await updateEvent(selectedEvent.id, updatedEvent); // Atualiza o evento
            publish("events:close-edit-modal"); // Fecha o modal após atualização
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
        }
    }
  
    async function handleDeleteEvent() {
        try {
            await deleteEvent(selectedEvent.id); // Deleta o evento
            publish("events:close-edit-modal"); // Fecha o modal após a exclusão
        } catch (error) {
            console.error("Erro ao deletar evento:", error);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(handleEditEvent)}>
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
                    <label htmlFor="date">Data</label>
                    <input 
                        type="text" // Mantenha como string para o formato DD/MM/YYYY
                        className="form-control"
                        {...register("date")}
                    />
                    {errors.date && <p className="input-error">{errors.date.message}</p>}
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
                        <option value="Pendente">Pendente</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                    {errors.status && <p className="input-error">{errors.status.message}</p>}
                </div>
            </div>

            <div className="buttons-container">
                <button 
                    className="btn-secondary" 
                    type="button" 
                    onClick={handleDeleteEvent}
                >
                    Deletar
                </button>
                <button 
                    className="btn-primary" 
                    type="submit"
                >
                    Atualizar
                </button>
            </div>
        </form>
    );
}
