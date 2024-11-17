import axios from "axios";

export interface Building {
  id: string;
  descricao: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
  dt_inicio: Date | string; // formato "YYYY-MM-DD"
  dt_termino?: Date | string; // formato "YYYY-MM-DD" (opcional caso não tenha terminado)
  situacao_construcao: string; // exemplo: "Em andamento", "Concluída"
  custo_estimado: number;
  custo_total?: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getBuildings = async (): Promise<Building[]> => {
  const response = await api.get<Building[]>("/buildings");
  return response.data;
};

export const addBuilding = async (building: Building): Promise<Building> => {
  const response = await api.post<Building>("/buildings", building);
  return response.data;
};

export const updateBuilding = async (
  id: string,
  building: Partial<Building> // Permite enviar apenas os campos necessários para edição
): Promise<Building> => {
  try {
    const response = await api.put<Building>(`/buildings/${id}`, building);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar construção:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

export const deleteBuilding = async (id: string): Promise<void> => {
  try {
    await api.delete(`/buildings/${id}`);
  } catch (error) {
    console.error("Erro ao deletar construção:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};
