import './style.scss';

interface Person {
    id: number;
    nomeCompleto: string;
    cpf: string;
    email: string;
    telefone: string;
    telefone2?: string;
    hobby?: string;
    intencao?: string;
    cargoDesejado?: string;
}

const sampleData: Person[] = [
    {
        id: 1,
        nomeCompleto: "João Silva",
        cpf: "12345678900",
        email: "joao.silva@example.com",
        telefone: "123-456-7890",
        telefone2: "987-654-3210",
        hobby: "Correr",
        intencao: "Ajudar a comunidade",
        cargoDesejado: "Voluntário",
    },
    {
        id: 2,
        nomeCompleto: "Maria Oliveira",
        cpf: "98765432100",
        email: "maria.oliveira@example.com",
        telefone: "321-654-0987",
        hobby: "Fotografia",
        intencao: "Participar de eventos",
        cargoDesejado: "Coordenador",
    },
];

export function VoluntariosTable() {
    return (
        <div className="person-table-container">
            <h2>Informações dos Participantes</h2>
            <table className="person-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Completo</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Telefone 2</th>
                        <th>Hobby</th>
                        <th>Intenção</th>
                        <th>Cargo Desejado</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.map((person) => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.nomeCompleto}</td>
                            <td>{person.cpf}</td>
                            <td>{person.email}</td>
                            <td>{person.telefone}</td>
                            <td>{person.telefone2 || "N/A"}</td>
                            <td>{person.hobby || "N/A"}</td>
                            <td>{person.intencao || "N/A"}</td>
                            <td>{person.cargoDesejado || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
