import { useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { publish } from "../../../../utils/events";
import { EventsRegisterModal } from "./modals/EventsRegisterModal";
import { getMaterials, StorageMaterial } from "../../../../services/storage/storageApi";
import { EventsEditModal } from "./modals/EventsEditModal";

export const Events = () => {
    const [storageMaterials, setStorageMaterials] = useState<StorageMaterial[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<StorageMaterial | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

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

    const filteredMaterials = storageMaterials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 className="page-title">Eventos</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar evento" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <PlusCircle size={26} onClick={() => publish("storage:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome do evento</th>
                            <th>Código</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Importante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMaterials.map((material) => (
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
            <EventsRegisterModal />
            <EventsEditModal selectedMaterial={selectedMaterial} />
        </>
    );
};