import { createContext, useState } from "react";
import { getProducts, OutletProductResponse } from "../../services/storage/outletApi";
import { publish } from "../../utils/events";
import {object, string, InferType, ObjectSchema } from "yup"

const outletProductValidationSchema = object({
    name: string().required("Nome do produto é obrigatório"),
    price: string().required("Preço do produto é obrigatório").matches(/^\d+([,.]\d+)?$/, "O preço deve conter apenas números"),
    description: string(),
    status: string().required("Status do produto é obrigatório")
})

export type OutletProductFormData = InferType<typeof outletProductValidationSchema>

enum STATUS_VALUE {
    "À venda" = "FOR_SALE",
    "Trocado" = "EXCHANGED",
    "Abatido" = "REBATED",
    "Vendido" = "SOLD"
}

interface OutletContextProps {
    outletProducts: OutletProductResponse[]
    loadOutletProducts:  () => Promise<void>
    handleEditOutletProduct: (product: OutletProductResponse) => void
    selectedProduct: OutletProductResponse | undefined
    outletProductValidationSchema: ObjectSchema<OutletProductFormData>
    mapStatusToEnum: (status: string) => string
}

export const OutletContext = createContext<OutletContextProps>({} as OutletContextProps)

export const OutletProvider = ({children}: {children: React.ReactNode}) => {
    const [outletProducts, setOutletProducts] = useState<OutletProductResponse[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<OutletProductResponse | undefined>(undefined);

    async function loadOutletProducts() {
        const response = await getProducts();
        setOutletProducts(response);
    }

    const handleEditOutletProduct = (product: OutletProductResponse) => {
        setSelectedProduct(product);
        publish("outlet:open-edit-modal");
    };

    const mapStatusToEnum = (status: string) => {
        return (STATUS_VALUE as Record<string, string>)[status];
    };

    return (
        <OutletContext.Provider 
            value={{
                outletProducts,
                loadOutletProducts,
                handleEditOutletProduct,
                selectedProduct,
                outletProductValidationSchema,
                mapStatusToEnum
            }}
        >
            {children}
        </OutletContext.Provider>
    )
}