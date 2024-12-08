import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {object, string, InferType } from "yup"
import { publish } from "../../../../../utils/events";
import { addProduct } from "../../../../../services/storage/outletApi";
import toast from "react-hot-toast";

interface IRegisterFormProps {
    handleCancel?: () => void
}

const validationSchema = object({
    name: string().required("Nome do produto é obrigatório"),
    price: string().required("Preço do produto é obrigatório"),
    description: string(),
    status: string().required("Status do produto é obrigatório")
})

type RegisterFormData = InferType<typeof validationSchema>

export const OutletRegisterForm = ({handleCancel}: IRegisterFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            price: "",
            description: "",
            status: ""
        },
        mode: "onSubmit"
    })

    async function handleCreateNewProduct(data: RegisterFormData) {
        try {
            const newProduct = {
                name: data.name,
                price: data.price.replace(",", "."),
                description: data.description,
                status: data.status,
            }
            await addProduct(newProduct);
            publish("outlet:close-register-modal")
            toast.success( "Produto criado com sucesso");
        } catch (error) {
            toast.error("Falha ao criar produto");
            return error;
        }
   }

    return (
        <form className="form" onSubmit={handleSubmit(handleCreateNewProduct)}>
            <div className="fields-container">
                <div className="input-container">
                    <label htmlFor="name">Nome do produto</label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("name")}
                    />
                    {errors.name && <p className="input-error">{errors.name.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="price">Preço</label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("price")}
                    />
                    {errors.price && <p className="input-error">{errors.price.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="description">Descrição <span className="optional">(opcional)</span></label>
                    <textarea 
                        className="form-control"
                        {...register("description")}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="origin">Status</label>
                    <select 
                        id="status"
                        {...register("status")}
                        className="form-control"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="FOR_SALE">À venda</option>
                        <option value="EXCHANGED">Trocado</option>
                        <option value="REBATED">Abatido</option>
                        <option value="SOLD">Vendido</option>
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
                    Criar Registro
                </button>
            </div>
        </form>
    )
}