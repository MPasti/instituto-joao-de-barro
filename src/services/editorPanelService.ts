import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getLandingPageData = async (): Promise<any> => {
  return await api.get<any>("/landing-page");
};

export const updateLandingPageData = async (
  data: Partial<any>,
): Promise<any> => {
  return await api.put<any>("/landing-page", data);
};

export const getAboutUsData = async (): Promise<any> => {
  return await api.get<any>("/sobre-nos");
};

export const updateAboutUsData = async (data: Partial<any>): Promise<any> => {
  return await api.put<any>("/sobre-nos", data);
};

export const getContactData = async (): Promise<any> => {
  return await api.get<any>("/contato");
};

export const updateContactData = async (data: Partial<any>): Promise<any> => {
  return await api.put<any>("/contato", data);
};

export const getDonationData = async (): Promise<any> => {
  return await api.get<any>("/donation");
};

export const updateDonationData = async (data: Partial<any>): Promise<any> => {
  return await api.put<any>("/donation", data);
};
