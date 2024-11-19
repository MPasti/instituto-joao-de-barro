import { api } from "../api.ts";
import { registerFamilyMember } from "./familyApi.ts";

export enum BenefStatus {
    ATIVO = 'ativo',
    INATIVO = 'inativo',
    PENDENTE = 'pendente',
    EM_ANALISE = 'em_analise',
    APROVADO = 'aprovado',
    NECESSITA_ATENCAO = 'necessita_atencao',
  }


export interface RegisterBeneficiaryUserRequest {
    benefUser: BenefUser;
    beneficiary: Beneficiary;
    familyMembers: FamilyMember[];
}

export const registerBeneficiaryAndUser = async ({benefUser, beneficiary, familyMembers}: RegisterBeneficiaryUserRequest) => {
    try {
        const userResponse = await api.post("/user", benefUser);

        beneficiary.userId = userResponse.data.id;

        const response = await registerBeneficiary(beneficiary);

        familyMembers.forEach(async (familyMember) => {
            familyMember.beneficiaryId = response.id;
            await registerFamilyMember(familyMember);
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const registerBeneficiary = async (beneficiary: Beneficiary) => {
    try {
        const response = await api.post("/beneficiario", beneficiary);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBeneficiaryById = async (id: number): Promise<Beneficiary> => {
    try {
        const response = await api.get(`/beneficiario/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBeneficiaries = async (filters?: Filters): Promise<Beneficiary[]> => {
    try {
        const response = await api.get("/beneficiario");

        if(filters) {

            return response.data.filter((beneficiary: any) => {
                let isMatch = true;
                
                if (filters.name) {
                    isMatch = isMatch && beneficiary.name?.toLowerCase().includes(filters.name.toLowerCase());
                }
                
                if (filters.status) {
                    isMatch = isMatch && beneficiary.status === filters.status;
                }
                
                if (filters.meetDescription) {
                    isMatch = isMatch && beneficiary.meetDescription?.toLowerCase().includes(filters.meetDescription.toLowerCase());
                }
                
                if (filters.indicatorName) {
                    isMatch = isMatch && beneficiary.indicatorName?.toLowerCase().includes(filters.indicatorName.toLowerCase());
                }
                
                if (filters.monthlyIncome !== undefined) {
                    isMatch = isMatch && beneficiary.monthlyIncome === filters.monthlyIncome;
                }
                
                if (filters.indicationDate) {
                    const beneficiaryDate = new Date(beneficiary.indicationDate).toISOString().split('T')[0];
                    const filterDate = new Date(filters.indicationDate).toISOString().split('T')[0];
                    isMatch = isMatch && beneficiaryDate === filterDate;
                }
                
                if (filters.houseStatus) {
                    isMatch = isMatch && beneficiary.houseStatus?.toLowerCase().includes(filters.houseStatus.toLowerCase());
                }
                
                return isMatch;
            });
        } else {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export interface BeneficiaryAndFamilyResponse {
    beneficiary: Beneficiary;
    family: FamilyMember[];
}

export const getBeneficiaryAndFamilyById = async (id: number): Promise<BeneficiaryAndFamilyResponse> => {
    try {
        const response = await api.get(`/beneficiarios/getAllData/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserByBeneficiaryId = async (beneficiaryId: number): Promise<BenefUser> => {
    try {
        const response = await api.get(`/user/beneficiario/${beneficiaryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateBeneficiary = async (beneficiary: Beneficiary) => {
    try {
        const response = await api.put(`/beneficiario`, beneficiary);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBeneficiary = async (id: number) => {
    try {
        const response = await api.delete(`/beneficiario/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}