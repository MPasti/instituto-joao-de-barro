import { api } from "../../api/fetchWrapper.ts";

export const createNews = (noticias: News) =>
  api.post(`${import.meta.env.VITE_API_URL}/noticias`, noticias);
export const updateNews = (noticias: News) =>
  api.put(`${import.meta.env.VITE_API_URL}/noticias`, noticias);
export const getNews = () =>
  api.get<News[]>(`${import.meta.env.VITE_API_URL}/noticias`);
export const deleteNews = (id: number) =>
  api.delete<News[]>(`${import.meta.env.VITE_API_URL}/noticias/${id}`);
