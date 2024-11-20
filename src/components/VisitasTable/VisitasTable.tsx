import React from 'react';
import { Visit } from '../../services/beneficiaries/visitApi';

interface VisitasTableProps {
    visitas: Visit[];
    onDelete: (id: string) => void;
    navigate: (path: string) => void;
    searchTerm: string;
}

const VisitasTable: React.FC<VisitasTableProps> = ({ visitas, onDelete, navigate, searchTerm }) => {
    const filteredVisitas = visitas.filter(item =>
        item?.nomeFamilia?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-container">
            <table className="familias-table">
                <tbody>
                    {filteredVisitas.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nomeFamilia}</td>
                            <td>
                                <span>Voluntário responsável: {item.nomeVoluntario}</span>
                            </td>
                            <td>
                                <button
                                    className="table-btn dados-btn"
                                    onClick={() => navigate(`/dashboard/visitas/${item.id}`)}
                                >
                                    DADOS
                                </button>
                                <button onClick={() => onDelete(item.id!.toString())} className="table-btn excluir-btn">
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
