import axios from "axios";

export interface Building {
  id_construcao: string;
  id_endereco: number;
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
  building: Building
): Promise<Building> => {
  const response = await api.put<Building>(`/buildings/${id}`, building);
  return response.data;
};

export const deleteBuilding = async (id: string): Promise<void> => {
  await api.delete(`/buildings/${id}`);
};
