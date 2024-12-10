import axios from "axios";

export interface BuildingRequest {
  descricao: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
  dt_inicio: Date | string; // formato "YYYY-MM-DD"
  dt_termino?: Date | string; // formato "YYYY-MM-DD" (opcional)
  situacao_construcao: string; // exemplo: "Em andamento", "Concluída"
  custo_estimado: number;
  custo_total?: number;
}

export interface BuildingResponse {
  id: string;
  descricao: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
  dt_inicio: Date | string; // formato "YYYY-MM-DD"
  dt_termino?: Date | string; // formato "YYYY-MM-DD" (opcional)
  situacao_construcao: string; // exemplo: "Em andamento", "Concluída"
  custo_estimado: number;
  custo_total?: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getBuildings = async (): Promise<BuildingResponse[]> => {
  const response = await api.get<BuildingResponse[]>("/obras");
  return response.data;
};

export const addBuilding = async (
  building: BuildingRequest
): Promise<BuildingResponse> => {
  const response = await api.post<BuildingResponse>("/obras/register", building);
  return response.data;
};

export const updateBuilding = async (
  id: string,
  building: BuildingRequest
): Promise<BuildingResponse> => {
  const response = await api.put<BuildingResponse>(`/obras/update/${id}`, building);
  return response.data;
};

export const deleteBuilding = async (id: string): Promise<void> => {
  await api.delete(`/obras/delete/${id}`);
};
