export const StorageRegisterForm = () => {
    return (
        <form className="form">
           <div className="fields-container">
                <div className="input-container">
                    <label htmlFor="">Nome do material</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="input-container">
                    <label htmlFor="">Quantidade</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="input-container">
                    <label htmlFor="">Descrição</label>
                    <input type="text" className="form-control"/>
                </div>
           </div>

            <div className="buttons-container">
                <button className="btn-secondary">Cancelar</button>
                <button className="btn-primary">Criar Registro</button>
            </div>
        </form>
    )
}