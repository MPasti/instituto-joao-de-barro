import axios from "axios";

export interface OutletProductRequest {
  name: string;
  price?: string;
  description?: string;
  status: string
}

export interface OutletProductResponse {
  id: string;
  name: string;
  price?: string;
  description?: string;
  status: string
}

const api = axios.create({
  baseURL: "http://localhost:8080/api/ijb",
});

export const getProducts = async (): Promise<OutletProductResponse[]> => {
  const response = await api.get<OutletProductResponse[]>("/outletProduct");
  return response.data;
};

export const addProduct = async (
  product: OutletProductRequest
): Promise<OutletProductResponse> => {
  const response = await api.post<OutletProductResponse>("/outletProduct/register", product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: OutletProductRequest
): Promise<OutletProductResponse> => {
  const response = await api.put<OutletProductResponse>(`/outletProduct/update/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/outletProduct/delete/${id}`);
};
