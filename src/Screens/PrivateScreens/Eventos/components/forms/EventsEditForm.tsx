import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, mixed, InferType } from "yup"; 
import { updateEvent, deleteEvent, Event } from "../../../../../services/events/eventsApi"; // Atualize para a API de eventos
import { publish } from "../../../../../utils/events";
import Button from "../../../../../components/Button"


interface IEditFormProps {
    selectedEvent: Event;
    handleCancel: () => void; 
  }
  

const validationSchema = object({
    name: string().required("Nome do evento é obrigatório"),
    date: string()
        .required("Data é obrigatória!")
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/YYYY"),
    status: mixed().oneOf(["Cancelado","Pendente","Em andamento", "Concluído"], "Escolha uma das opções!").required("Status é obrigatório!"),
    description: string().optional()
});

type EditFormData = InferType<typeof validationSchema>;

export const EventsEditForm = ({ selectedEvent }: IEditFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: selectedEvent.name,
            date: new Date(selectedEvent.date).toLocaleDateString('pt-BR'), 
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
                date: eventDate.getTime(), 
                status: String(data.status),
                description: data.description,
            };
            
            await updateEvent(selectedEvent.id, updatedEvent); 
            publish("events:close-edit-modal");
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
        }
    }
  
    async function handleDeleteEvent() {
        try {
            await deleteEvent(selectedEvent.id);
            publish("events:close-edit-modal"); 
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
                        type="text" 
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
                        <option value="Cancelado">Cancelado</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                    {errors.status && <p className="input-error">{errors.status.message}</p>}
                </div>
            </div>

            <div className="buttons-container">
                <Button 
                    className="btn-secondary" 
                    type="button" 
                    onClick={handleDeleteEvent}
                >
                    Deletar
                </Button>
                <Button 
                    className="btn-primary" 
                    type="submit"
                >
                    Atualizar
                </Button>
            </div>
        </form>
    );
}
