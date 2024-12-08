import { createContext, useState } from "react";
import { getMaterials, StorageMaterialResponse } from "../../services/storage/storageApi";
import { publish } from "../../utils/events";
import {object, string, number, ObjectSchema, InferType } from "yup"

const storageMaterialValidationSchema = object({
    name: string().required("Nome do material é obrigatório"),
    quantity: number().required("Quantidade é obrigatória").positive("Informe uma quantidade válida").typeError("Quantidade deve ser um número"),
    description: string(),
    origin: string().required("Origem é obrigatório")
})

export type StorageMaterialFormData = InferType<typeof storageMaterialValidationSchema>

enum ORIGIN_VALUE {
    "Doação" = "DONATED",
    "Compra" = "BOUGHT"
}

interface StorageContextProps {
    storageMaterials: StorageMaterialResponse[],
    loadStorageMaterials:  () => Promise<void>
    handleEditStorageMaterial: (material: StorageMaterialResponse) => void
    selectedMaterial: StorageMaterialResponse | undefined
    storageMaterialValidationSchema: ObjectSchema<StorageMaterialFormData>;
    mapOriginToEnum: (origin: string) => string
}

export const StorageContext = createContext<StorageContextProps>({} as StorageContextProps)

export const StorageProvider = ({children}: {children: React.ReactNode}) => {
    const [storageMaterials, setStorageMaterials] = useState<StorageMaterialResponse[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<StorageMaterialResponse | undefined>(undefined);

    async function loadStorageMaterials() {
        const response = await getMaterials();
        setStorageMaterials(response);
    }

    const handleEditStorageMaterial = (material: StorageMaterialResponse) => {
        setSelectedMaterial(material);
        publish("storage:open-edit-modal");
    };

    const mapOriginToEnum = (origin: string) => {
        return (ORIGIN_VALUE as Record<string, string>)[origin];
    };

    return (
        <StorageContext.Provider 
            value={{
                storageMaterials, 
                loadStorageMaterials, 
                handleEditStorageMaterial, 
                selectedMaterial,
                storageMaterialValidationSchema,
                mapOriginToEnum
            }}
        >
            {children}
        </StorageContext.Provider>
    )
}