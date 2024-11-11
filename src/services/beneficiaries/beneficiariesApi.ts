import axios from "axios";

export interface FamiliarMember {
    beneficiario_id: number;
    cpf: string;
    name: string;
    last_name: string;
    age: number;
    email: string;
    phone: string;
    disability?: string;
    status: string;
}

export interface Beneficiario {
    id?: number;
    nomeFamilia: string;
    statusFamilia: string;
    nomePrincipal: string;
    cpf: string;
    endereco: string;
    cep: string;
    rendaMensal: number;
    telefone1: string;
    telefone2: string;
    comoChegou: string;
    familiarExtras: string;
    dadosImovel: string;
    necessidadeFamilia: string;
    status?: string;
    FamiliarMembers: FamiliarMember[];
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const registerBeneficario = async (data: Beneficiario, members?: FamiliarMember[]) => {
    try {
        const benefResponse = await api.post<Beneficiario>('/beneficiario', data);
        
        const membersResponse: FamiliarMember[] = [];

        if (members && members.length !== 0) {
            for (const member of members) {
                const response = await api.post<FamiliarMember>(`/registro/familiar/${benefResponse.data.id!}`, member);
                membersResponse.push(response.data);
            }
        }

        return { benefResponse: benefResponse.data, membersResponse };
        
    } catch (err) {
        console.error('Erro durante o registro: ', err);
    }
};

export interface Filters {
    family_size?: number;
    family_income?: number;
    family_address?: string;
    family_cep?: string;
    family_status?: string;
    family_priority?: boolean;
    family_situation?: string;
    family_members?: number;
    family_member_disability?: string;
    family_member_age?: number;
    family_member_name?: string;
    family_member_last_name?: string;
    family_member_email?: string;
    family_member_phone?: string;
    family_member_cpf?: string;
}

export const getBeneficiarios = async (page: number = 1, filters?: Filters) => {
    try {
        const queryParams = new URLSearchParams(filters as any).toString();
        const response = await api.get<Beneficiario[]>(`/beneficiario?${queryParams}`);
        return response.data.slice((page - 1) * 10, page * 10);
    } catch (err) {
        console.error('Erro durante a busca: ', err);
    }
};

export const getBeneficiario = async (id: string) => {
    try {
        const response = await api.get<Beneficiario>(`/beneficiario/${id}`);
        return response.data;
    } catch (err) {
        console.error('Erro durante a busca: ', err);
    }
};

export const getFamiliarMembers = async (benefId: number) => {
    try {
        const response = await api.get<FamiliarMember[]>(`/familiares/${benefId}`);
        return response.data;
    } catch (err) {
        console.error('Erro durante a busca: ', err);
    }
};

export const updateFamiliarMember = async (id: number, data: FamiliarMember) => {
    try {
        const response = await api.put<FamiliarMember>(`/familiar/${id}`, data);
        return response.data;
    } catch (err) {
        console.error('Erro durante a atualização: ', err);
    }
};

export const updateBeneficiario = async (id: string, data: Beneficiario, members?: FamiliarMember[]) => {
    try {
        const benefResponse = await api.put<Beneficiario>(`/beneficiario/${id}`, data);
        
        const membersResponse: FamiliarMember[] = [];

        if (members && members.length !== 0) {
            for (const member of members) {
                const response = await api.put<FamiliarMember>(`/familiar/${member.beneficiario_id}`, member);
                membersResponse.push(response.data);
            }
        }

        return { benefResponse: benefResponse.data, membersResponse };
        
    } catch (err) {
        console.error('Erro durante a atualização: ', err);
    }
};

export const deleteBeneficiario = async (id: string) => {
    try {
        const beneficiario = await getBeneficiario(id);
        if (!beneficiario) {
            throw new Error('Beneficiário não encontrado');
        }

        const members = await getFamiliarMembers(beneficiario.id!);
        if (!members || members.length === 0) {
            console.warn('Nenhum membro familiar encontrado, mas o beneficiário será inativado.');
        } else {
            const updateMembersPromises = members.map(member =>
                api.patch(`/familiar/${member.beneficiario_id}`, { ...member, status: 'INATIVO' })
            );
            await Promise.all(updateMembersPromises);
        }

        await updateBeneficiario(id, { ...beneficiario, status: 'INATIVO' });
        
        console.log("Beneficiário e membros familiares inativados com sucesso.");
    } catch (err) {
        console.error('Erro durante a exclusão: ', err);
    }
};
