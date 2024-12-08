import { api } from "../../api/fetchWrapper.ts";
import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (
      apiUrl.startsWith("http://localhost") ||
      apiUrl.startsWith("https://localhost")
    ) {
      const response = await axios.get(`${apiUrl}/users`);
      const users = response.data;

      const user = users.find(
        (user: User) =>
          user.username === username && user.password === password,
      );

      if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
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
    } else {
      const response = await api.post(`${apiUrl}/login`, {
        emailOrCpf: username,
        password: password,
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
