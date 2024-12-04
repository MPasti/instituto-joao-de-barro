import React from 'react';
import './SearchBar.scss';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRegisterClick: () => void;
    onAddVisitClick: () => void;
    onSendToAssemblyClick: () => void;
    isVisitasTab: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    onRegisterClick,
    onAddVisitClick,
    onSendToAssemblyClick,
    isVisitasTab,
}) => (
    <div className="search-section">
        <input
            type="text"
            className="search-bar"
            placeholder="Buscar Família"
            value={searchTerm}
            onChange={onSearchChange}
        />
        <div className="buttons">
            <button className="btn registrar-btn" onClick={onRegisterClick}>Registrar Família</button>
            {isVisitasTab && (
                <button className="btn enviar-btn" onClick={onAddVisitClick}>Adicionar Visita</button>
            )}
            {!isVisitasTab && (
                <button className="btn enviar-btn" onClick={onSendToAssemblyClick}>
                    Enviar Para Assembleia
                </button>
            )}
        </div>
    </div>
);

export default SearchBar;
