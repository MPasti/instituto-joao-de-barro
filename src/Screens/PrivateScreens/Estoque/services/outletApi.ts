import axios from "axios";

export interface OutletProduct {
  id: string; 
  name: string;
  price?: string;
  description?: string;
}

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getProducts = async (): Promise<OutletProduct[]> => {
  const response = await api.get<OutletProduct[]>("/products");
  return response.data;
};

export const addProduct = async (product: OutletProduct): Promise<OutletProduct> => {
  const response = await api.post<OutletProduct>("/products", product);
  return response.data;
};

export const updateProduct = async (id: string, product: OutletProduct): Promise<OutletProduct> => {
  const response = await api.put<OutletProduct>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
