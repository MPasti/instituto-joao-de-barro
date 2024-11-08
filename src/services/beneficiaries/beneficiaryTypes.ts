export enum Status {
	ATIVO = 'ativo',
	INATIVO = 'inativo',
	PENDENTE = 'pendente',
	EM_ANALISE = 'em_analise',
	APROVADO = 'aprovado',
	NECESSITA_ATENCAO = 'necessita_atencao',
}

export interface Beneficiary {
	id: number;
	userId: number;
	name: string;
	status: Status;
	meetDescription: string;
	indicatorName: string;
	monthlyIncome: number;
	indicationDate: Date;
	houseStatus: string;
}

export interface FamilyMember {
	id: number;
	beneficiaryId: number;
	familyName: string;
	kinship: string;
	scholarity: string;
	income: number;
	incomeDescription: string;
	healthyProblems: string;
}

export interface BeneficiaryVisit {
	id: number;
	beneficiaryId: number;
	responsableName: string;
	visitDate: Date;
}

export interface VisitReport {
	id: number;
	visitId: number;
	reportDate: Date;
	report: string;
}

export interface Filters {
    family_size?: number;
    family_income?: number;
    family_address?: string;
    family_cep?: string;
    family_status?: string;
    family_priority?: boolean;
    family_situation?: string;
    family_members?: number;
    family_member_disability?: string;
    family_member_age?: number;
    family_member_name?: string;
    family_member_last_name?: string;
    family_member_email?: string;
    family_member_phone?: string;
    family_member_cpf?: string;
}