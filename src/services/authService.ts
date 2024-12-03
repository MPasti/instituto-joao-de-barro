import { api } from "../../api/fetchWrapper.ts";

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post(`${import.meta.env.VITE_API_URL}/login`, {
      username,
      password,
    });

    if (response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return {
        message: "Login realizado com sucesso!",
        success: true,
      };
    } else {
      return {
        message: "Email ou Senha incorretos.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return {
      message: "Erro ao realizar login, tente novamente mais tarde!",
      success: false,
    };
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
