import axios from "axios";
import { BeneficiaryVisit } from "./beneficiaryTypes";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getVisitas = async () => {
    try {
        const response = await api.get<BeneficiaryVisit[]>('/visitas');
        return response.data;
    } catch (err) {
        console.log('Erro ao buscar visitas: ' + err);
        return []
    }
}

export const getVisita = async (id: number) => {
    try {
        const response = await api.get<BeneficiaryVisit>(`/visitas/${id}`);
        return response.data;
    } catch (err) {
        console.log('Erro ao buscar visita: ' + err);
    }
}

export const registerVisita = async (data: BeneficiaryVisit) => {
    try {
        await api.post('/visitas', data);
    } catch (err) {
        console.log('Erro ao registrar visita: ' + err);
    }
}

export const updateVisita = async (id: number, data: Partial<BeneficiaryVisit>) => {
    try {
        await api.put(`/visitas/${id}`, data);
    } catch (err) {
        console.log('Erro ao atualizar visita: ' + err);
    }
}

export const deleteVisita = async (id: number) => {
    try {
        await api.delete(`/visitas/${id}`);
    } catch (err) {
        console.log('Erro ao excluir visita: ' + err);
    }
}