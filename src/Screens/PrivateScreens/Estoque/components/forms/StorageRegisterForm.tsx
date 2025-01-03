import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addMaterial } from "../../../../../services/storage/storageApi";
import { publish } from "../../../../../utils/events";
import toast from "react-hot-toast";
import { useContext } from "react";
import { StorageContext, StorageMaterialFormData } from "../../../../../contexts/storage/StorageContext";

interface IRegisterFormProps {
    handleCancel?: () => void
}

export const StorageRegisterForm = ({handleCancel}: IRegisterFormProps) => {
    const {loadStorageMaterials, storageMaterialValidationSchema} = useContext(StorageContext)

    const { register, handleSubmit, formState: { errors } } = useForm<StorageMaterialFormData>({
        resolver: yupResolver(storageMaterialValidationSchema),
        defaultValues: {
            name: "",
            quantity: 0,
            description: "",
            origin: ""
        },
        mode: "onSubmit"
    })

   async function handleCreateNewMaterial(data: StorageMaterialFormData) {
        try {
            const newMaterial = {
                name: data.name,
                quantity: Number(data.quantity),
                description: data.description,
                origin: data.origin
            }
            await addMaterial(newMaterial);
            loadStorageMaterials()
            publish("storage:close-register-modal")
            toast.success( "Material criado com sucesso");
        } catch (error) {
            toast.error( "Falha ao criar material");
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
                    <textarea 
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
                    {errors.origin && <p className="input-error">{errors.origin.message}</p>}
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