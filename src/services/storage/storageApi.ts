import axios from "axios";

export interface StorageMaterialRequest {
  name: string;
  quantity: number;
  description?: string;
  origin: string;
}

export interface StorageMaterialResponse {
  id: string;
  name: string;
  quantity: number;
  description?: string;
  origin: string;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api/ijb",
});

export const getMaterials = async (): Promise<StorageMaterialResponse[]> => {
  const response = await api.get<StorageMaterialResponse[]>("/material");
  return response.data;
};

export const addMaterial = async (
  material: StorageMaterialRequest
): Promise<StorageMaterialResponse> => {
  const response = await api.post<StorageMaterialResponse>("/material/register", material);
  return response.data;
};

export const updateMaterial = async (
  id: string,
  material: StorageMaterialRequest
): Promise<StorageMaterialResponse> => {
  const response = await api.put<StorageMaterialResponse>(`/material/update/${id}`, material);
  return response.data;
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await api.delete(`/material/delete/${id}`);
};
