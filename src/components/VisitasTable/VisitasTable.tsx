import React from 'react';
import { VisitsItemProps } from '../../Screens/PrivateScreens/BeneficiariosMain';

interface VisitasTableProps {
    visitas: VisitsItemProps[];
    onDelete: (id: number) => void;
    navigate: (path: string) => void;
    searchTerm: string;
}

const VisitasTable: React.FC<VisitasTableProps> = ({ visitas, onDelete, navigate, searchTerm }) => {
    const filteredVisitas = visitas.filter(item =>
        item.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-container">
            <table className="familias-table">
                <tbody>
                    {filteredVisitas.map((item) => (
                        <tr key={item.visit.id}>
                            <td>{item.beneficiaryName}</td>
                            <td>
                                <button
                                    className="table-btn dados-btn"
                                    onClick={() => navigate(`/dashboard/visitas/${item.visit.id}`)}
                                >
                                    DADOS
                                </button>
                                <button onClick={() => onDelete(item.visit.id!)} className="table-btn excluir-btn">
                                    EXCLUIR
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitasTable;
