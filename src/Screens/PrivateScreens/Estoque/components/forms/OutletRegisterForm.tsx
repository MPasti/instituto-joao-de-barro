import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {object, string, InferType } from "yup"
import { nanoid } from 'nanoid';
import { publish } from "../../../../../utils/events";
import { addProduct } from "../../services/outletApi";

interface IRegisterFormProps {
    handleCancel?: () => void
}

const validationSchema = object({
    name: string().required("Nome do produto é obrigatório"),
    price: string(),
    description: string()
})

type RegisterFormData = InferType<typeof validationSchema>

export const OutletRegisterForm = ({handleCancel}: IRegisterFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            price: "",
            description: ""
        },
        mode: "onSubmit"
    })

    async function handleCreateNewProduct(data: RegisterFormData) {
        try {
            const newProduct = {
                id: nanoid(6),
                name: data.name,
                price: data.price,
                description: data.description,
            }
            await addProduct(newProduct);
            publish("outlet:close-register-modal")
        } catch (error) {
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
                    <label htmlFor="quantity">Preço <span className="optional">(opcional)</span></label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("price")}
                    />
                    {errors.price && <p className="input-error">{errors.price.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="description">Descrição <span className="optional">(opcional)</span></label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("description")}
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
    )
}