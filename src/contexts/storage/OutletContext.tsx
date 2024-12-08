import { createContext, useState } from "react";
import { getProducts, OutletProductResponse } from "../../services/storage/outletApi";
import { publish } from "../../utils/events";

interface OutletContextProps {
    outletProducts: OutletProductResponse[]
    loadOutletProducts:  () => Promise<void>
    handleEditOutletProduct: (product: OutletProductResponse) => void
    selectedProduct: OutletProductResponse | undefined
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

    return (
        <OutletContext.Provider 
            value={{
                outletProducts,
                loadOutletProducts,
                handleEditOutletProduct,
                selectedProduct
            }}
        >
            {children}
        </OutletContext.Provider>
    )
}