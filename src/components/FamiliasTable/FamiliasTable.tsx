import React from 'react';
import { Beneficiario } from '../../services/beneficiaries/beneficiariesApi';

interface FamiliasTableProps {
    families: Beneficiario[];
    onDelete: (id: string) => void;
    navigate: (path: string) => void;
}

const FamiliasTable: React.FC<FamiliasTableProps> = ({ families, onDelete, navigate }) => (
    <div className="table-container">
        <table className="familias-table">
            <tbody>
                {families.map((item) => (
                    <tr key={item.id}>
                        <td>{item.nomeFamilia}</td>
                        <td>
                            <span>Status: {item.statusFamilia}</span>
                        </td>
                        <td>
                            <button
                                className="table-btn dados-btn"
                                onClick={() => navigate(`/dashboard/atualizar/${item.id}`)}
                            >
                                DADOS
                            </button>
                            <button onClick={() => onDelete(item.id!)} className="table-btn excluir-btn">
                                EXCLUIR
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default FamiliasTable;
