import { api } from "../../../api/fetchWrapper";

export const registerFamilyMember = async (familyMember: FamilyMember) => {
    try {
        const response = await api.post("/familiar", familyMember);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getFamilyMemberById = async (id: number): Promise<FamilyMember> => {
    try {
        const response = await api.get(`/familiar/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getFamilyMembersByBeneficiaryId = async (beneficiaryId: number): Promise<FamilyMember[]> => {
    try {
        const response = await api.get(`/familiar/beneficiario/${beneficiaryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllFamilyMembers = async (): Promise<FamilyMember[]> => {
    try {
        const response = await api.get("/familiar");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateFamilyMember = async (familyMember: FamilyMember) => {
    try {
        const response = await api.put(`/familiar/${familyMember.id}`, familyMember);
        return response.data;
    } catch (error) {
        throw error;
    }
}