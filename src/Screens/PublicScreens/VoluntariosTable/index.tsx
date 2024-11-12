import './style.scss';

interface Person {
    id: number;
    nomeCompleto: string;
    cpf: string;
    estoque: string;
    financeiro: string;
    eventos?: string;
    obras?: string;
    noticias?: string;
}

const sampleData: Person[] = [
    {
        id: 1,
        nomeCompleto: "João Silva",
        cpf: "12345678900",
        estoque: "NÂO",
        financeiro: "SIM",
        eventos: "NÃO",
        obras: "NÃO",
        noticias: "SIM",
    },
    {
        id: 2,
        nomeCompleto: "Maria Oliveira",
        cpf: "98765432100",
        estoque: "SIM",
        financeiro: "SIM",
        eventos: "SIM",
        obras: "SIM",
        noticias: "SIM",
    },
];

export function VoluntariosTable() {
    return (
        <div className="person-table-container">
            <h2>Permissão dos Participantes</h2>
            <table className="person-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Completo</th>
                        <th>CPF</th>
                        <th>ESTOQUE</th>
                        <th>FINANCEIRO</th>
                        <th>EVENTOS</th>
                        <th>OBRAS</th>
                        <th>NOTICIAS</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.map((person) => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.nomeCompleto}</td>
                            <td>{person.cpf}</td>
                            <td>{person.estoque}</td>
                            <td>{person.financeiro}</td>
                            <td>{person.eventos || "N/A"}</td>
                            <td>{person.obras || "N/A"}</td>
                            <td>{person.noticias || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
