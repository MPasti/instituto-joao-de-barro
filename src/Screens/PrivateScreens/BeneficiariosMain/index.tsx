import React, { useState, useEffect } from "react";
import "@styles/global.scss";
import "./beneficiarios.scss";
import { useNavigate } from "react-router-dom";
import { Beneficiario, getBeneficiarios, deleteBeneficiario } from "../../../services/beneficiaries/beneficiariesApi";
import { getVisitas, deleteVisita } from "../../../services/beneficiaries/visitApi";
import TabNavigation from "../../../components/TabNavigation/TabNavigation";
import SearchBar from "../../../components/SearchBar/SearchBar";
import FamiliasTable from "../../../components/FamiliasTable/FamiliasTable";
import VisitasTable from "../../../components/VisitasTable/VisitasTable";

export const BeneficiariosMain = () => {
    const [activeTab, setActiveTab] = useState<'familias' | 'visitas'>('familias');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [familias, setFamilias] = useState<Beneficiario[]>([]);
    const [filteredFamilies, setFilteredFamilies] = useState<Beneficiario[]>([]);
    const [visitasData, setVisitasData] = useState<Visit[]>([]);

    const handleTabClick = (tab: 'familias' | 'visitas') => {
        setActiveTab(tab);
        setSearchTerm('');
    };

    const handleDeleteBeneficiario = async (id: string) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este item?');
        if (!confirmDelete) return;

        try {
            await deleteBeneficiario(id);
            console.log('Item excluído com sucesso!');
            fetchData();
        } catch (err) {
            console.log("Erro ao excluir item: " + err);
        }
    };

    const handleDeleteVisitas = async (id: string) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta visita?');
        if (!confirmDelete) return;

        try {
            await deleteVisita(id);
            console.log('Visita excluída com sucesso!');
            fetchData(); // Refresh the data to update the VisitasTable
        } catch (err) {
            console.log("Erro ao excluir visita: " + err);
        }
    };

    const fetchData = async () => {
        if (activeTab === 'familias') {
            try {
                const response = await getBeneficiarios();
                if (!response) {
                    console.log('Erro ao buscar famílias');
                    return;
                }
                const activeFamilies = response.filter((beneficiario: Beneficiario) => beneficiario.status === 'ATIVO');
                setFamilias(activeFamilies);
                setFilteredFamilies(activeFamilies);
            } catch (err) {
                console.log("Error during fetch: " + err);
            }
        } else if (activeTab === 'visitas') {
            try {
                const response = await getVisitas();
                if (!response) {
                    console.log('Erro ao buscar visitas');
                    return;
                }
                setVisitasData(response);
            } catch (err) {
                console.log("Error during fetch: " + err);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredFamilies(familias);
        } else {
            const filtered = familias.filter(item =>
                (typeof item.nomeFamilia === 'string' && item.nomeFamilia.toLowerCase().includes(value.toLowerCase()))
            );
            console.log("Famílias filtradas:", filtered);
            setFilteredFamilies(filtered);
        }
    };

    return (
      <div className="beneficiarios-page">
          <div className="dashboard-header">
              <div className="left-section">
                  <h1 className="subtitle">Dashboard</h1>
                  <p className="description">
                      Visualize e gerencie as famílias cadastradas no programa de assistência habitacional.
                  </p>
              </div>
  
              <div className="search-section"> {/* Moved this inside the dashboard-header */}
                  <SearchBar
                      searchTerm={searchTerm}
                      onSearchChange={handleSearchChange}
                      onRegisterClick={() => navigate('/dashboard/registro')}
                      onAddVisitClick={() => navigate('/dashboard/registroVisita')}
                      onSendToAssemblyClick={() => alert('Enviar para Assembleia!')}
                      isVisitasTab={activeTab === 'visitas'}
                  />
              </div>
          </div>
  
          <TabNavigation activeTab={activeTab} onTabClick={handleTabClick} />
  
          {activeTab === 'familias' ? (
              <FamiliasTable families={filteredFamilies} onDelete={handleDeleteBeneficiario} navigate={navigate} />
          ) : (
              <VisitasTable visitas={visitasData} onDelete={handleDeleteVisitas} navigate={navigate} searchTerm={searchTerm} />
          )}
      </div>
  );
};
