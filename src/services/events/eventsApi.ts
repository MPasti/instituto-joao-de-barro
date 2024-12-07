import axios from "axios";

export interface Event {
  id: string; // ID único do evento
  name: string; // Nome do evento
  date: number; // Data do evento como timestamp (ou string, se preferir uma data legível)
  status: string; // Status do evento (ex: "em andamento" ou "concluído")
  description?: string; // Descrição do evento (opcional)
  location?: string; // Local do evento (opcional)
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>("/events");
  return response.data;
};

export const addEvent = async (event: Event): Promise<Event> => {
  const response = await api.post<Event>("/events", event);
  return response.data;
};

export const updateEvent = async (id: string, event: Event): Promise<Event> => {
  const response = await api.put<Event>(`/events/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};
