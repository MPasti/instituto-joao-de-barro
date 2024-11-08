import React, { useState, useEffect } from "react";
import "@styles/global.scss";
import "./beneficiarios.scss";
import { useNavigate } from "react-router-dom";
import { getVisitas, deleteVisita } from "../../../services/beneficiaries/visitApi";
import TabNavigation from "../../../components/TabNavigation/TabNavigation";
import SearchBar from "../../../components/SearchBar/SearchBar";
import FamiliasTable from "../../../components/FamiliasTable/FamiliasTable";
import VisitasTable from "../../../components/VisitasTable/VisitasTable";
import toast from "react-hot-toast";
import { Beneficiary, BeneficiaryVisit, Status } from "../../../services/beneficiaries/beneficiaryTypes";
import { deleteBeneficiario, getBeneficiario, getBeneficiarios } from "../../../services/beneficiaries/beneficiariesApi";

export interface VisitsItemProps {
    visit: BeneficiaryVisit
    beneficiary: Beneficiary
}


export const BeneficiariosMain = () => {
    const [activeTab, setActiveTab] = useState<'familias' | 'visitas'>('familias');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [familias, setFamilias] = useState<Beneficiary[]>([]);
    const [filteredFamilies, setFilteredFamilies] = useState<Beneficiary[]>([]);
    const [visitsData, setVisityData] = useState<VisitsItemProps[]>([]);

    const handleTabClick = (tab: 'familias' | 'visitas') => {
        setActiveTab(tab);
        setSearchTerm('');
    };

    const handleDeleteBeneficiario = async (id: number) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este item?');
        if (!confirmDelete) return;

        try {
            await deleteBeneficiario(id);
            toast.success('Item excluído com sucesso!');
            fetchData();
        } catch (err) {
            toast.error("Erro ao excluir item: " + err);
        }
    };

    const handleDeleteVisitas = async (id: number) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta visita?');
        if (!confirmDelete) return;

        try {
            await deleteVisita(id);
            toast.success('Visita excluída com sucesso!');
            fetchData(); // Refresh the data to update the VisitasTable
        } catch (err) {
            toast.error("Erro ao excluir visita: " + err);
        }
    };

    const fetchData = async () => {
        try {
            const beneficiariosResponse = await getBeneficiarios();
            console.log(beneficiariosResponse)
            if (!beneficiariosResponse) {
                toast.error('Erro ao buscar famílias');
                return;
            }
            const activeFamilies = beneficiariosResponse.filter((beneficiario: Beneficiary) => beneficiario.status !== Status.INATIVO);
            setFamilias(activeFamilies);
            console.log(familias)
            setFilteredFamilies(activeFamilies);
        } catch (err) {
            toast.error("Error during fetch: " + err);

        }
        if (activeTab === 'visitas') {
            try {
                let visits = []
                const response = await getVisitas();

                for (const visit of response) {
                    const beneficiary = await getBeneficiario(visit.beneficiaryId);
                    visits.push({ visit, beneficiary });
                }

                if (!response) {
                    toast.error('Erro ao buscar visitas');
                    return;
                }
                setVisityData(visits);
            } catch (err) {
                toast.error("Error during fetch: " + err);
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
                (typeof item.name === 'string' && item.name.toLowerCase().includes(value.toLowerCase()))
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
              <VisitasTable visitas={visitsData} onDelete={handleDeleteVisitas} navigate={navigate} searchTerm={searchTerm} />
          )}
      </div>
  );
};
