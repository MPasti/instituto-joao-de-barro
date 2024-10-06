import axios from "axios";

export const getBalance = async () => await axios.get(`${import.meta.env.VITE_API_URL}/financeiro`);