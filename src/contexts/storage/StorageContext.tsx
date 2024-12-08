import { createContext, useState } from "react";
import { getMaterials, StorageMaterialResponse } from "../../services/storage/storageApi";
import { publish } from "../../utils/events";

interface StorageContextProps {
    storageMaterials: StorageMaterialResponse[],
    loadStorageMaterials:  () => Promise<void>
    handleEditStorageMaterial: (material: StorageMaterialResponse) => void
    selectedMaterial: StorageMaterialResponse | undefined
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

    return (
        <StorageContext.Provider 
            value={{
                storageMaterials, 
                loadStorageMaterials, 
                handleEditStorageMaterial, 
                selectedMaterial
            }}
        >
            {children}
        </StorageContext.Provider>
    )
}   