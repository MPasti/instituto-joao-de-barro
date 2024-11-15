import { useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { publish } from "../../../../utils/events";
import { BuildingRegisterModal } from "./modals/BuildingRegisterModal";  // Modal de registro de construção
import { getBuildings, Building } from "../../../../services/buildings/buildingApi";  // API de construções
import { BuildingEditModal } from "./modals/BuildingEditModal";  // Modal de edição de construção

export const BuildingContent = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);  // Armazenando as construções
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);  // Construção selecionada para edição
    const [searchTerm, setSearchTerm] = useState<string>("");  // Termo de busca

    // Função para carregar as construções
    async function loadBuildings() {
        const response = await getBuildings();  // Buscar construções da API
        setBuildings(response);
    }

    useEffect(() => {
        loadBuildings();  // Carregar construções na inicialização
    }, [buildings]);  // Dependência de buildings para recarregar quando necessário

    // Função para lidar com a edição de uma construção
    const handleEditBuilding = (building: Building) => {
        setSelectedBuilding(building);
        publish("building:open-edit-modal");  // Abre o modal de edição
    };

    // Filtro das construções com base no termo de busca
    const filteredBuildings = buildings.filter(building =>
        building.situacao_construcao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        building.id_construcao.toLowerCase().includes(searchTerm.toLowerCase())  // Adicionando id_construcao ao filtro
    );

    return (
        <>
            <h1 className="page-title">Construções</h1>
            <section className="building-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar construção" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}  // Atualizando termo de busca
                />
                <PlusCircle size={26} onClick={() => publish("building:open-register-modal")} />
            </section>
            <section className="building-list">
                <table>
                    <thead>
                        <tr>
                            <th>Construção</th>
                            <th>Código</th>
                            <th>Data Início</th>
                            <th>Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBuildings.map((building) => (
                            <tr key={building.id_construcao} onClick={() => handleEditBuilding(building)}>
                                <td>{building.situacao_construcao}</td>
                                <td>{building.id_construcao}</td>
                                <td>{new Date(building.dt_inicio).toLocaleDateString()}</td>
                                <td>{building.situacao_construcao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {/* Modal para registrar uma nova construção */}
            <BuildingRegisterModal />
            {/* Modal para editar uma construção selecionada */}
            <BuildingEditModal selectedBuilding={selectedBuilding} />
        </>
    );
};
