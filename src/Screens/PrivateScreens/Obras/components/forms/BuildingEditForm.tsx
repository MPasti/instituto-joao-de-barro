// Formulário de edição de edifícios
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, date, InferType } from "yup";
import { updateBuilding, deleteBuilding, Building } from "../../../../../services/buildings/buildingApi";
import { publish } from "../../../../../utils/events";

interface IEditFormProps {
    selectedBuilding: Building;
}

const validationSchema = object({
    id_endereco: number().required("ID do endereço é obrigatório").typeError("ID do endereço deve ser um número"),
    dt_inicio: date().required("Data de início é obrigatória").typeError("Data de início deve ser uma data válida"),
    dt_termino: date().optional().typeError("Data de término deve ser uma data válida"),
    situacao_construcao: string().required("Situação da construção é obrigatória"),
    custo_estimado: number().required("Custo estimado é obrigatório").positive("Informe um custo válido").typeError("Custo estimado deve ser um número"),
    custo_total: number().optional().positive("Informe um custo válido").typeError("Custo total deve ser um número"),
});

type EditFormData = InferType<typeof validationSchema>;

export const BuildingEditForm = ({ selectedBuilding }: IEditFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id_endereco: selectedBuilding.id_endereco,
            dt_inicio: selectedBuilding.dt_inicio ? new Date(selectedBuilding.dt_inicio) : undefined,
            dt_termino: selectedBuilding.dt_termino ? new Date(selectedBuilding.dt_termino) : undefined,
            situacao_construcao: selectedBuilding.situacao_construcao,
            custo_estimado: selectedBuilding.custo_estimado,
            custo_total: selectedBuilding.custo_total || 0,
        },
        mode: "onSubmit"
    });

    async function handleEditBuilding(data: EditFormData) {
        try {
            const updatedBuilding = {
                ...selectedBuilding,
                id_endereco: data.id_endereco,
                dt_inicio: data.dt_inicio,
                dt_termino: data.dt_termino,
                situacao_construcao: data.situacao_construcao,
                custo_estimado: data.custo_estimado,
                custo_total: data.custo_total,
            };
            await updateBuilding(selectedBuilding.id_construcao, updatedBuilding);
            publish("building:close-edit-modal");
        } catch (error) {
            return error;
        }
    }
  
    async function handleDeleteBuilding() {
        try {
            await deleteBuilding(selectedBuilding.id_construcao);
            publish("building:close-edit-modal");
        } catch (error) {
            return error;
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(handleEditBuilding)}>
            <div className="fields-container">
                <div className="input-container">
                    <label htmlFor="id_endereco">ID do Endereço</label>
                    <input 
                        type="number" 
                        className="form-control"
                        {...register("id_endereco")}
                    />
                    {errors.id_endereco && <p className="input-error">{errors.id_endereco.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="dt_inicio">Data de Início</label>
                    <input 
                        type="date" 
                        className="form-control"
                        {...register("dt_inicio")}
                    />
                    {errors.dt_inicio && <p className="input-error">{errors.dt_inicio.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="dt_termino">Data de Término <span className="optional">(opcional)</span></label>
                    <input 
                        type="date" 
                        className="form-control"
                        {...register("dt_termino")}
                    />
                    {errors.dt_termino && <p className="input-error">{errors.dt_termino.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="situacao_construcao">Situação da Construção</label>
                    <input 
                        type="text" 
                        className="form-control"
                        {...register("situacao_construcao")}
                    />
                    {errors.situacao_construcao && <p className="input-error">{errors.situacao_construcao.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="custo_estimado">Custo Estimado</label>
                    <input 
                        type="number" 
                        className="form-control"
                        {...register("custo_estimado")}
                    />
                    {errors.custo_estimado && <p className="input-error">{errors.custo_estimado.message}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="custo_total">Custo Total <span className="optional">(opcional)</span></label>
                    <input 
                        type="number" 
                        className="form-control"
                        {...register("custo_total")}
                    />
                    {errors.custo_total && <p className="input-error">{errors.custo_total.message}</p>}
                </div>
            </div>

            <div className="buttons-container">
                <button 
                    className="btn-secondary" 
                    type="button" 
                    onClick={handleDeleteBuilding}
                >
                    Deletar
                </button>
                <button 
                    className="btn-primary" 
                    type="submit"
                >
                    Atualizar
                </button>
            </div>
        </form>
    );
};
