import axios from "axios";

export interface StorageMaterial {
  id: string; // ID único do material
  name: string; // Nome do evento
  quantity: number; // Data como timestamp (ou você pode querer usar string se preferir uma representação legível)
  status: string; // Status do evento (ex: "em andamento" ou "concluído")
  description?: string; // Descrição do evento (opcional)
}


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getMaterials = async (): Promise<StorageMaterial[]> => {
  const response = await api.get<StorageMaterial[]>("/materials");
  return response.data;
};

export const addMaterial = async (
  material: StorageMaterial
): Promise<StorageMaterial> => {
  const response = await api.post<StorageMaterial>("/materials", material);
  return response.data;
};

export const updateMaterial = async (
  id: string,
  material: StorageMaterial
): Promise<StorageMaterial> => {
  const response = await api.put<StorageMaterial>(`/materials/${id}`, material);
  return response.data;
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await api.delete(`/materials/${id}`);
};
