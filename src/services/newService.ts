import axios from "axios";

export const createNews = (noticias: News) =>
  axios.post(`${import.meta.env.VITE_API_URL}/noticias`, noticias);
export const updateNews = (noticias: News) =>
  axios.put(`${import.meta.env.VITE_API_URL}/noticias`, noticias);
export const getNews = () =>
  axios.get<News[]>(`${import.meta.env.VITE_API_URL}/noticias`);
