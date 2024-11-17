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
    }, []);  // Usar um array vazio para carregar uma vez na montagem

    // Função para lidar com a edição de uma construção
    const handleEditBuilding = (building: Building) => {
        setSelectedBuilding(building);
        publish("building:open-edit-modal");  // Abre o modal de edição
    };

    // Filtro das construções com base no termo de busca
    const filteredBuildings = buildings.filter(building =>
        building.situacao_construcao.toLowerCase().includes(searchTerm.toLowerCase()) || 
    building.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.descricao.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro por descrição
);

    return (
        <>
            <h1 className="page-title">Obras</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar obra" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}  // Atualizando termo de busca
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
                                <td>{building.descricao}</td>  {/* Exibindo descrição da construção */}
                                <td>{building.id}</td>  {/* Exibindo código da construção */}
                                <td>{new Date(building.dt_inicio).toLocaleDateString()}</td>  {/* Exibindo data de início */}
                                <td>{building.situacao_construcao}</td>  {/* Exibindo situação da construção */}
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