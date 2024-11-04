import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, mixed, InferType } from "yup"; 
import { updateMaterial, deleteMaterial, StorageMaterial } from "../../../../../services/storage/storageApi";
import { publish } from "../../../../../utils/events";

interface IEditFormProps {
    selectedMaterial: StorageMaterial;
}

const validationSchema = object({
    name: string().required("Nome do evento é obrigatório"),
    quantity: string()
        .required("Data é obrigatória!")
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/YYYY"),
    status: mixed().oneOf(["em andamento", "concluído"], "Escolha uma das opções!").required("Status é obrigatório!"),
    description: string().optional()
});

type EditFormData = InferType<typeof validationSchema>;

export const EventsEditForm = ({ selectedMaterial }: IEditFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: selectedMaterial.name,
            quantity: new Date(selectedMaterial.quantity).toLocaleDateString('pt-BR'), // Formatar a data
            status: selectedMaterial.status || "",
            description: selectedMaterial.description || "",
        },
        mode: "onSubmit"
    });

    async function handleEditMaterial(data: EditFormData) {
        try {
            const [day, month, year] = data.quantity.split('/');
            const quantityDate = new Date(`${year}-${month}-${day}`);

            const updatedMaterial = {
                ...selectedMaterial,
                name: data.name,
                quantity: quantityDate.getTime(),
                status: String(data.status), // Garantindo que status seja uma string
                description: data.description,
            };
            
            await updateMaterial(selectedMaterial.id, updatedMaterial);
            publish("storage:close-edit-modal");
        } catch (error) {
            return error;
        }
    }
  
    async function handleDeleteMaterial() {
        try {
            await deleteMaterial(selectedMaterial.id);
            publish("storage:close-edit-modal");
        } catch (error) {
            return error;
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(handleEditMaterial)}>
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
                        type="text" // Mantenha como string para o formato DD/MM/YYYY
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
                        <option value="em andamento">Em Andamento</option>
                        <option value="concluído">Concluído</option>
                    </select>
                    {errors.status && <p className="input-error">{errors.status.message}</p>}
                </div>
            </div>

            <div className="buttons-container">
                <button 
                    className="btn-secondary" 
                    type="button" 
                    onClick={handleDeleteMaterial}
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
