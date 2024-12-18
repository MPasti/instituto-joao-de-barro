import { createContext, useState } from "react";
import { getBuildings, updateBuilding, Building } from "../../services/buildings/buildingApi";
import { publish } from "../../utils/events";
import { object, string, number, date, ObjectSchema, InferType } from "yup";

const buildingValidationSchema = object({
  descricao: string().required("Descrição é obrigatória"),
  logradouro: string().required("Logradouro é obrigatório"),
  numero: number()
    .required("Número é obrigatório")
    .typeError("Número deve ser um valor numérico"),
  bairro: string().required("Bairro é obrigatório"),
  cidade: string().required("Cidade é obrigatória"),
  uf: string()
    .required("UF é obrigatória")
    .length(2, "UF deve ter exatamente 2 caracteres"),
  dt_inicio: date()
    .transform((value) => (value instanceof Date ? value : new Date(value)))
    .required("Data de início é obrigatória")
    .typeError("Data de início deve ser uma data válida"),
  dt_termino: date()
    .transform((value) => (value instanceof Date ? value : new Date(value)))
    .optional()
    .typeError("Data de término deve ser uma data válida"),
  situacao_construcao: string()
    .required("Situação da construção é obrigatória")
    .oneOf(
      ["EM_ANDAMENTO", "CONCLUIDA", "PAUSADA", "CANCELADA"],
      "Situação inválida"
    ),
  custo_estimado: number()
    .required("Custo estimado é obrigatório")
    .positive("Informe um custo válido")
    .typeError("Custo estimado deve ser um número"),
  custo_total: number()
    .optional()
    .positive("Informe um custo válido")
    .typeError("Custo total deve ser um número"),
});

export type BuildingFormData = InferType<typeof buildingValidationSchema>;

interface BuildingContextProps {
  buildings: Building[];
  loadBuildings: () => Promise<void>;
  handleEditBuilding: (building: Building) => void;
  selectedBuilding: Building | undefined;
  buildingValidationSchema: ObjectSchema<BuildingFormData>;
}

export const BuildingContext = createContext<BuildingContextProps>({} as BuildingContextProps);

export const BuildingProvider = ({ children }: { children: React.ReactNode }) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>(undefined);

  async function loadBuildings() {
    try {
      const response = await getBuildings();
      setBuildings(response);
    } catch (error) {
      console.error("Erro ao carregar construções:", error);
    }
  }

  const handleEditBuilding = (building: Building) => {
    setSelectedBuilding(building);
    publish("building:open-edit-modal");
  };

  return (
    <BuildingContext.Provider
      value={{
        buildings,
        loadBuildings,
        handleEditBuilding,
        selectedBuilding,
        buildingValidationSchema,
      }}
    >
      {children}
    </BuildingContext.Provider>
  );
};
