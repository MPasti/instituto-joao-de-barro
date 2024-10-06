import { useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { Header } from "./components/StorageHeader";
import { publish } from "../../../utils/events";
import { StorageRegisterModal } from "./components/modals/StorageRegisterModal";
import { getMaterials, StorageMaterial } from "./services/api";
import { StorageEditModal } from "./components/modals/StorageEditModal";

export const Storage = () => {
    const [storageMaterials, setStorageMaterials] = useState<StorageMaterial[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<StorageMaterial | null>(null);

    async function loadStorageMaterials() {
        const response = await getMaterials();
        setStorageMaterials(response);
    }

    useEffect(() => {
        loadStorageMaterials();
    }, [storageMaterials]);

    const handleEditStorageMaterial = (material: StorageMaterial) => {
        setSelectedMaterial(material);
        publish("storage:open-edit-modal");
    };

    return (
        <main className="storage-container">
            <Header title="Estoque" />
            <section className="storage-search">
                <input type="text" placeholder="Pesquisar material" className="form-control search-input" />
                <PlusCircle size={26} onClick={() => publish("storage:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Código</th>
                            <th>Quantidade</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storageMaterials.map((material) => (
                            <tr key={material.id} onClick={() => handleEditStorageMaterial(material)}>
                                <td>{material.name}</td>
                                <td>{material.id}</td>
                                <td>{material.quantity}</td>
                                <td>{material.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <StorageRegisterModal />
            <StorageEditModal selectedMaterial={selectedMaterial} />
        </main>
    );
};