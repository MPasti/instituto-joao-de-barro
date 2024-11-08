import axios from "axios";
import { Beneficiary, FamilyMember, Filters, Status } from "./beneficiaryTypes.ts";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

export const registerBeneficario = async (data: Beneficiary, members?: FamilyMember[]) => {
    try {
        const benefResponse = await api.post<Beneficiary>('/beneficiario', data);

        if (!benefResponse.data.id) {
            throw new Error('Beneficiário não possui ID');
        }

        const membersResponse: FamilyMember[] = [];

        if (members && members.length !== 0) {
            for (const member of members) {
                const response = await api.post<FamilyMember>(`/registro/familiar/${benefResponse.data.id}`, member);
                membersResponse.push(response.data);
            }
        }

        return { benefResponse: benefResponse.data, membersResponse };

    } catch (err) {
        console.error('Erro durante o registro: ', err);
        throw new Error('Erro ao registrar o beneficiário e membros familiares');
    }
};



export const getBeneficiarios = async (page: number = 1, filters?: Filters) => {
    try {
        const queryParams = new URLSearchParams(filters as any).toString();
        const response = await api.get<Beneficiary[]>(`/beneficiarios?${queryParams}`);
        return response.data.slice((page - 1) * 10, page * 10);
    } catch (err) {
        console.error('Erro durante a busca: ', err);
        throw new Error('Erro ao buscar beneficiários');
    }
};

export const getBeneficiario = async (id: number) => {
    try {
        const response = await api.get<Beneficiary>(`/beneficiario/${id}`);
        return response.data;
    } catch (err) {
        console.error('Erro durante a busca: ', err);
        throw new Error('Erro ao buscar beneficiário');
    }
};

export const getFamiliarMembers = async (benefId: number) => {
    try {
        const response = await api.get<FamilyMember[]>(`/familiares/${benefId}`);
        return response.data;
    } catch (err) {
        console.error('Erro durante a busca: ', err);
        throw new Error('Erro ao buscar membros familiares');
    }
};

export const updateFamiliarMember = async (id: number, data: FamilyMember) => {
    try {
        const response = await api.put<FamilyMember>(`/familiar/${id}`, data);
        return response.data;
    } catch (err) {
        console.error('Erro durante a atualização: ', err);
        throw new Error('Erro ao atualizar membro familiar');
    }
};

export const updateBeneficiario = async (id: number, data: Beneficiary, members?: FamilyMember[]) => {
    try {
        const benefResponse = await api.put<Beneficiary>(`/beneficiario/${id}`, data);

        const membersResponse: FamilyMember[] = [];

        if (members && members.length !== 0) {
            for (const member of members) {
                const response = await api.put<FamilyMember>(`/familiar/${member.beneficiaryId}`, member);
                membersResponse.push(response.data);
            }
        }

        return { benefResponse: benefResponse.data, membersResponse };

    } catch (err) {
        console.error('Erro durante a atualização: ', err);
        throw new Error('Erro ao atualizar beneficiário e membros familiares');
    }
};

export const deleteBeneficiario = async (id: number) => {
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
                api.patch(`/familiar/${member.beneficiaryId}`, { ...member, status: 'INATIVO' })
            );
            await Promise.all(updateMembersPromises);
        }

        await updateBeneficiario(id, { ...beneficiario, status: Status.INATIVO });

        console.log("Beneficiário e membros familiares inativados com sucesso.");
    } catch (err) {
        console.error('Erro durante a exclusão: ', err);
        throw new Error('Erro ao inativar beneficiário e membros familiares');
    }
};
