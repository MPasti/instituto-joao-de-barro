import React, { useState, useEffect } from "react";
import "@styles/global.scss";
import "./beneficiarios.scss";
import { useNavigate } from "react-router-dom";
import TabNavigation from "../../../components/TabNavigation/TabNavigation";
import SearchBar from "../../../components/SearchBar/SearchBar";
import FamiliasTable from "../../../components/FamiliasTable/FamiliasTable";
import VisitasTable from "../../../components/VisitasTable/VisitasTable";
import { BenefStatus, deleteBeneficiary, getBeneficiaries, getBeneficiaryById } from "../../../services/beneficiaries/beneficiariesApi";
import toast from "react-hot-toast";
import { deleteVisit, getVisits } from "../../../services/beneficiaries/visitApi";

export interface VisitsItemProps {
    visit: Visit;
    beneficiaryName: string;
}

export const BeneficiariosMain = () => {
    const [activeTab, setActiveTab] = useState<'familias' | 'visitas'>('familias');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [familias, setFamilias] = useState<Beneficiary[]>([]);
    const [filteredFamilies, setFilteredFamilies] = useState<Beneficiary[]>([]);
    const [visitsData, setVisitsData] = useState<VisitsItemProps[]>([]);

    const handleTabClick = (tab: 'familias' | 'visitas') => {
        setActiveTab(tab);
        setSearchTerm('');
    };

    const handleDeleteBeneficiario = async (id: number) => {
        if (window.confirm('Você tem certeza que deseja excluir este item?')) {
            try {
                await deleteBeneficiary(id);
                toast.success('Item excluído com sucesso!');
                fetchBeneficiarios();
            } catch (err) {
                toast.error("Erro ao excluir item: " + err);
            }
        }
    };

    const handleDeleteVisitas = async (id: number) => {
        if (window.confirm('Você tem certeza que deseja excluir esta visita?')) {
            try {
                await deleteVisit(id);
                toast.success('Visita excluída com sucesso!');
                fetchVisitas();
            } catch (err) {
                toast.error("Erro ao excluir visita: " + err);
            }
        }
    };

    const fetchBeneficiarios = async () => {
        try {
            const beneficiariosResponse = await getBeneficiaries();
            if (!beneficiariosResponse) {
                toast.error('Erro ao buscar famílias');
                return;
            }
            const activeFamilies = beneficiariosResponse.filter(
                (beneficiario: Beneficiary) => beneficiario.status !== BenefStatus.INATIVO
            );
            setFamilias(activeFamilies);
            setFilteredFamilies(activeFamilies);
        } catch (err) {
            toast.error("Erro ao buscar beneficiários: " + err);
        }
    };

    const fetchVisitas = async () => {
        try {
            const response = await getVisits();
            if (!response) {
                toast.error('Erro ao buscar visitas');
                return;
            }
            const visits = await Promise.all(
                response.map(async (visit: Visit) => {
                    const beneficiary = await getBeneficiaryById(visit.beneficiaryId);
                    return { visit, beneficiaryName: beneficiary?.name || '' };
                })
            );
            setVisitsData(visits);
        } catch (err) {
            toast.error("Erro ao buscar visitas: " + err);
        }
    };

    useEffect(() => {
        if (activeTab === 'familias') {
            fetchBeneficiarios();
        } else {
            fetchVisitas();
        }
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

                <div className="search-section">
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
