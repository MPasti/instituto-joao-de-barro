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
  interface UserInfo {
    userId?: number;           
    authorityId?: number;       
    createdAt: Date;   
    active: boolean;                            
    profilePic: Uint8Array;        
    name: string;               
    lastName: string;           
    birthdayDate: Date;
    phone1: string;             
    phone2: string;  
  }
  interface BenefUser {
    id?: number;
    email: string;
    cpf: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    userInfo: UserInfo
  }
  interface Beneficiary {
    id?: number;
    userId?: number;
    name: string;
    status: Status;
    meetDescription: string;
    indicatorName: string;
    monthlyIncome: number;
    indicationDate: Date;
    houseStatus: string;
  }
  interface FamilyMember {
    id?: number;
    beneficiaryId?: number;
    familyName: string;
    kinship: string;
    scholarity: string;
    income: number;
    incomeDescription: string;
    healthyProblems: string;
  }
  interface Visit {
    id?: number;
    beneficiaryId: number;
    visitDate: Date;
    report: string;
    firstImage: Uint8Array;
    secondImage: Uint8Array;
    thirdImage: Uint8Array;
    fourthImage: Uint8Array;
    fifthImage: Uint8Array;
  }
  interface Filters {
      name?: string;
    status?: Status;
    meetDescription?: string;
    indicatorName?: string;
    monthlyIncome?: number;
    indicationDate?: Date;
    houseStatus?: string;
  }

}

export {};
