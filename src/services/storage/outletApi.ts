import axios from "axios";

export interface OutletProduct {
  id: string;
  name: string;
  price?: string;
  description?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProducts = async (): Promise<OutletProduct[]> => {
  const response = await api.get<OutletProduct[]>("/outletProduct");
  return response.data;
};

export const addProduct = async (
  product: OutletProduct
): Promise<OutletProduct> => {
  const response = await api.post<OutletProduct>("/outletProduct/register", product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: OutletProduct
): Promise<OutletProduct> => {
  const response = await api.put<OutletProduct>(`/outletProduct/update/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/outletProduct/delete/${id}`);
};
