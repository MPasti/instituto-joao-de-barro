import React from 'react';

import { RiErrorWarningLine } from "react-icons/ri";
import { Beneficiary, Status } from '../../services/beneficiaries/beneficiaryTypes';

interface FamiliasTableProps {
    families: Beneficiary[];
    onDelete: (id: number) => void;
    navigate: (path: string) => void;
}

const FamiliasTable: React.FC<FamiliasTableProps> = ({ families, onDelete, navigate }) => (
    <div className="table-container">
        <table className="familias-table">
            <tbody>
                {families.map((item) => (
                    <tr key={item.id}>
                        <td>{item.indicatorName}</td>
                        <td>
                            <span>Status: {item.status}</span>
                        </td>
                        <td>
                            {item.status.toLowerCase() === Status.NECESSITA_ATENCAO && <RiErrorWarningLine style={{color: '#f17342', width: '4rem', height: '2rem'}}/>}
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
