import axios from "axios";

export interface Voluntario {
    id?: number;
    user: [];
    tipoVoluntario: string;
    cargoDesejado: string;
    sobreVoce: string;
    hobby: string;
    intencao: string;
    status?: string;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const registerVolunteer = async (data: Voluntario) => {
    try {
        const response = await api.post<Voluntario>('/voluntario', data);
        alert("Cadastro realizado com sucesso!");
    } catch (err) {
        console.log('Erro durante o registro: ' + err);
    }
}

export const getVoluntario = async (id: string) => {
    try {
        const response = await api.get<Voluntario>(`/voluntario/${id}`);
        return response.data;
    } catch (err) {
        console.log('Erro durante a busca: ' + err);
    }
}

export const updateVoluntario = async (id: string, data: Voluntario) => {
    try {
        const response = await api.put<Voluntario>(`/voluntario/${id}`, data);  
    } catch (err) {
        console.log('Erro durante a atualização: ' + err);
    }
}

export const deleteVoluntario = async (id: string) => {
    try {
        const voluntario = await getVoluntario(id);
        if (!voluntario) {
            throw new Error('Voluntario não encontrado');
        }
        await updateVoluntario(id, { ...voluntario, status: 'INATIVO' });
        
        console.log("Voluntario inativo com sucesso.");
    } catch (err) {
        console.log('Erro durante a exclusão: ' + err);
    }
};