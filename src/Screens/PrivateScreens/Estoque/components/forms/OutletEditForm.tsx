import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { publish } from "../../../../../utils/events";
import { deleteProduct, updateProduct } from "../../../../../services/storage/outletApi";
import toast from "react-hot-toast";
import { useContext } from "react";
import { OutletContext, OutletProductFormData } from "../../../../../contexts/storage/OutletContext";

export const OutletEditForm = () => {
    const {selectedProduct, loadOutletProducts, outletProductValidationSchema, mapStatusToEnum} = useContext(OutletContext)

    const { register, handleSubmit, formState: { errors } } = useForm<OutletProductFormData>({
        resolver: yupResolver(outletProductValidationSchema),
        defaultValues: {
            name: selectedProduct?.name,
            price: selectedProduct?.price,
            description: selectedProduct?.description,
            status: selectedProduct?.status && mapStatusToEnum(selectedProduct.status)
        },
        mode: "onSubmit"
    });

    async function handleEditMaterial(data: OutletProductFormData) {
        try {
            if(!selectedProduct) return;

            const updatedProduct = {
                ...selectedProduct,
                name: data.name,
                price: data.price.replace(",", "."),
                description: data.description,
                status: data.status
            };
            await updateProduct(selectedProduct.id, updatedProduct);
            loadOutletProducts()
            publish("outlet:close-edit-modal");
            toast.success( "Produto alterado com sucesso");
        } catch (error) {
            toast.error( "Falha ao alterar produto");
            return error;
        }
    }
  
    async function handleDeleteProduct() {
        if(!selectedProduct) return;

        try {
            await deleteProduct(selectedProduct.id);
            loadOutletProducts()
            publish("outlet:close-edit-modal");
            toast.success( "Produto excluído com sucesso");
        } catch (error) {
            toast.error("Falha ao excluir produto");
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
                    <textarea 
                        className="form-control"
                        {...register("description")}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="status">Status</label>
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
