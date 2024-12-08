import { useContext, useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { publish } from "../../../../utils/events";
import { StorageRegisterModal } from "./modals/StorageRegisterModal";
import { StorageEditModal } from "./modals/StorageEditModal";
import { StorageContext } from "../../../../contexts/storage/StorageContext";

export const Storage = () => {
    const {storageMaterials, loadStorageMaterials,handleEditStorageMaterial } = useContext(StorageContext)
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        loadStorageMaterials();
    }, []);

    const filteredMaterials = storageMaterials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 className="page-title">Estoque</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar material" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                            <th>Origem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMaterials.map((material) => (
                            <tr key={material.id} onClick={() => handleEditStorageMaterial(material)}>
                                <td>{material.name}</td>
                                <td>{material.id}</td>
                                <td>{material.quantity}</td>
                                <td>{material.description}</td>
                                <td>{material.origin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <StorageRegisterModal />
            <StorageEditModal />
        </>
    );
};