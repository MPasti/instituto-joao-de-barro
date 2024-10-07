declare global {
  interface User {
    id: number;
    cpf: string;
    email: string;
    username: string;
    password: string;
    token: string;
  }
  interface News {
    id: number | null;
    titulo: string;
    descricao: string;
    data: string;
    ativa: boolean;
    link: string;
    etiqueta: string;
    image: string;
  }
}

export {};
