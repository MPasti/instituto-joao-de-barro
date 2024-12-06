import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, InferType } from "yup";
import { publish } from "../../../../../utils/events";
import { deleteProduct, OutletProduct, updateProduct } from "../../../../../services/storage/outletApi";

interface IEditFormProps {
    selectedProduct: OutletProduct;
}

const validationSchema = object({
    name: string().required("Nome do produto é obrigatório"),
    price: string().required("Preço do produto é obrigatório"),
    description: string(),
    status: string().required("Status do produto é obrigatório")
})

type EditFormData = InferType<typeof validationSchema>

export const OutletEditForm = ({ selectedProduct }: IEditFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: selectedProduct.name,
            price: selectedProduct.price?.toString() || "",
            description: selectedProduct.description || "",
            status: selectedProduct.status
        },
        mode: "onSubmit"
    });

    async function handleEditMaterial(data: EditFormData) {
        try {
            const updatedProduct = {
                ...selectedProduct,
                name: data.name,
                price: data.price,
                description: data.description,
                status: data.status
            };
            await updateProduct(selectedProduct.id, updatedProduct);
            publish("outlet:close-edit-modal");
        } catch (error) {
            return error;
        }
    }
  
    async function handleDeleteProduct() {
        try {
            await deleteProduct(selectedProduct.id);
            publish("outlet:close-edit-modal");
        } catch (error) {
            return error;
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(handleEditMaterial)}>
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
                    <label htmlFor="quantity">Preço</label>
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
                <div className="input-container">
                    <label htmlFor="origin">Origem</label>
                    <select 
                        id="origin"
                        {...register("status")}
                        className="form-control"
                    >
                        <option value="" disabled>Selecione</option>
                        <option value="FOR_SALE">À venda</option>
                        <option value="EXCHANGED">Trocado</option>
                        <option value="REBATED">Abatido</option>
                        <option value="SOLD">Vendido</option>
                    </select>
                </div>
            </div>

            <div className="buttons-container">
                <button 
                    className="btn-secondary" 
                    type="button" 
                    onClick={handleDeleteProduct}
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
};
