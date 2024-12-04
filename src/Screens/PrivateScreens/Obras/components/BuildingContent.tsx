import { useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { publish } from "../../../../utils/events";
import { BuildingRegisterModal } from "./modals/BuildingRegisterModal";  
import { getBuildings, Building } from "../../../../services/buildings/buildingApi";  
import { BuildingEditModal } from "./modals/BuildingEditModal";  

export const BuildingContent = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);  
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);  
    const [searchTerm, setSearchTerm] = useState<string>("");  

    
    async function loadBuildings() {
        const response = await getBuildings();  
        setBuildings(response);
    }

    useEffect(() => {
        loadBuildings();  
    }, [buildings]);  

    
    const handleEditBuilding = (building: Building) => {
        setSelectedBuilding(building);
        publish("building:open-edit-modal");  
    };

    const filteredBuildings = buildings.filter(building =>
    building.situacao_construcao.toLowerCase().includes(searchTerm.toLowerCase()) || 
    building.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.descricao.toLowerCase().includes(searchTerm.toLowerCase()) 
);

    return (
        <>
            <h1 className="page-title">Obras</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar obra" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}  
                />
                <PlusCircle size={26} onClick={() => publish("building:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Código</th>
                            <th>Data Início</th>
                            <th>Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBuildings.map((building) => (
                            <tr key={building.id} onClick={() => handleEditBuilding(building)}>
                                <td>{building.descricao}</td> 
                                <td>{building.id}</td>  
                                <td>{new Date(building.dt_inicio).toLocaleDateString()}</td>  
                                <td>{building.situacao_construcao}</td>  
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <BuildingRegisterModal />
            <BuildingEditModal selectedBuilding={selectedBuilding} />
        </>
    );
};