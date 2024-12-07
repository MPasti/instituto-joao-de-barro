import axios from "axios";

export class UserService {
  private user: User | null = null;

  async getDadosUsuario(): Promise<User | null> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      this.user = response.data;

      if (this.user) {
        localStorage.setItem("user", JSON.stringify(this.user));
      }

      return this.user;
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
      return null;
    }
  }

  getUser(): User | null {
    if (!this.user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    return this.user;
  }

  clearUserData(): void {
    this.user = null;
    localStorage.removeItem("user");
  }
}

export const userService = new UserService();
