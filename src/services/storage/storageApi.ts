import axios from "axios";

export interface StorageMaterial {
  id: string;
  name: string;
  quantity: number;
  description?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getMaterials = async (): Promise<StorageMaterial[]> => {
  const response = await api.get<StorageMaterial[]>("/material");
  return response.data;
};

export const addMaterial = async (
  material: StorageMaterial
): Promise<StorageMaterial> => {
  const response = await api.post<StorageMaterial>("/material/register", material);
  return response.data;
};

export const updateMaterial = async (
  id: string,
  material: StorageMaterial
): Promise<StorageMaterial> => {
  const response = await api.put<StorageMaterial>(`/material/update/${id}`, material);
  return response.data;
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await api.delete(`/material/delete/${id}`);
};
