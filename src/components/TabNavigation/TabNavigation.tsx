import React from 'react';

interface TabNavigationProps {
    activeTab: 'familias' | 'visitas';
    onTabClick: (tab: 'familias' | 'visitas') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabClick }) => (
    <div className="tabs">
        <button
            className={`tab-btn ${activeTab === 'familias' ? 'active' : ''}`}
            onClick={() => onTabClick('familias')}
        >
            Famílias
        </button>
        <button
            className={`tab-btn ${activeTab === 'visitas' ? 'active' : ''}`}
            onClick={() => onTabClick('visitas')}
        >
            Visitas
        </button>
    </div>
);

export default TabNavigation;
