import { api } from "../api";

export const registerVisit = async (visit: Visit) => {
    try {
        const response = await api.post("/visita", visit);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVisitById = async (id: number): Promise<Visit> => {
    try {
        const response = await api.get(`/visita/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVisits = async (): Promise<Visit[]> => {
    try {
        const response = await api.get("/visita");
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getVisitsByBeneficiaryId = async (beneficiaryId: number): Promise<Visit[]> => {

    try {
        const response = await api.get(`/visita/visitas/${beneficiaryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteVisit = async (id: number) => {
    try {
        const response = await api.delete(`/visita/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const updateVisit = async (visit: Visit) => {
    try {
        const response = await api.put(`/visita`, visit);
        return response.data;
    } catch (error) {
        throw error;
    }
}