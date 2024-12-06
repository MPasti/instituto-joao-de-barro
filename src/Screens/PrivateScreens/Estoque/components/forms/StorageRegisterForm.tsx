import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {object, string, number, InferType } from "yup"
import { addMaterial } from "../../../../../services/storage/storageApi";
import { nanoid } from 'nanoid';
import { publish } from "../../../../../utils/events";

interface IRegisterFormProps {
    handleCancel?: () => void
}

const validationSchema = object({
    name: string().required("Nome do material é obrigatório"),
    quantity: number().required("Quantidade é obrigatória").positive("Informe uam quantidade válida").typeError("Quantidade deve ser um número"),
    description: string(),
    origin: string().required("Origem é obrigatório")
})

type RegisterFormData = InferType<typeof validationSchema>

export const StorageRegisterForm = ({handleCancel}: IRegisterFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            quantity: 0,
            description: "",
            origin: ""
        },
        mode: "onSubmit"
    })

   async function handleCreateNewMaterial(data: RegisterFormData) {
        try {
            const newMaterial = {
                id: nanoid(6),
                name: data.name,
                quantity: Number(data.quantity),
                description: data.description,
                origin: data.origin
            }
            await addMaterial(newMaterial);
            publish("storage:close-register-modal")
        } catch (error) {
            return error;
        }
   }

    return (
        <form className="form" onSubmit={handleSubmit(handleCreateNewMaterial)}>
           <div className="fields-container">
                <div className="input-container">
                    <label htmlFor="name">Nome do material</label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("name")}
                    />
                    {errors.name && <p className="input-error">{errors.name.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="quantity">Quantidade</label>
                    <input 
                        type="text" 
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
                    <label htmlFor="origin">Origem</label>
                    <select 
                        id="origin"
                        {...register("origin")}
                        className="form-control"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="DONATED">Doação</option>
                        <option value="BOUGHT">Compra</option>
                    </select>
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
    )
}