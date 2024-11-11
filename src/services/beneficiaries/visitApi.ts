import axios from "axios";

export interface Visit {
    id?: number;
    nomeVoluntario: string;
    nomeFamilia: string;
    name: string;
    data: string;
    relatorio: string;
  }

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getVisitas = async () => {
    try {
        const response = await api.get<Visit[]>('/visitas');
        return response.data;
    } catch (err) {
        console.log('Erro ao buscar visitas: ' + err);
    }
}

export const getVisita = async (id: string) => {
    try {
        const response = await api.get<Visit>(`/visitas/${id}`);
        return response.data;
    } catch (err) {
        console.log('Erro ao buscar visita: ' + err);
    }
}

export const registerVisita = async (data: Visit) => {
    try {
        await api.post('/visitas', data);
    } catch (err) {
        console.log('Erro ao registrar visita: ' + err);
    }
}

export const updateVisita = async (id: string, data: Visit) => {
    try {
        await api.put(`/visitas/${id}`, data);
    } catch (err) {
        console.log('Erro ao atualizar visita: ' + err);
    }
}

export const deleteVisita = async (id: string) => {
    try {
        await api.delete(`/visitas/${id}`);
    } catch (err) {
        console.log('Erro ao excluir visita: ' + err);
    }
}