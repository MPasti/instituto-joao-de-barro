import axios from "axios";

export interface StorageMaterial {
  id: string; 
  name: string;
  quantity: number;
  description?: string;
}

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getMaterials = async (): Promise<StorageMaterial[]> => {
  const response = await api.get<StorageMaterial[]>("/materials");
  return response.data;
};

export const addMaterial = async (material: StorageMaterial): Promise<StorageMaterial> => {
  const response = await api.post<StorageMaterial>("/materials", material);
  return response.data;
};

export const updateMaterial = async (id: string, material: StorageMaterial): Promise<StorageMaterial> => {
  const response = await api.put<StorageMaterial>(`/materials/${id}`, material);
  return response.data;
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await api.delete(`/materials/${id}`);
};
