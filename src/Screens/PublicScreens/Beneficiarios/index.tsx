import '@styles/visualizarInfo.scss';

export function Beneficiarios() {
  const statusOptions = ['Aprovado', 'Negado', 'Em espera'];
  const currentStatus = statusOptions[2];

  return (
      <div className="visualizar-informacoes">
          
          <h1 className="subtitle">Visualizar Informações da Família</h1>
          <p className="description">
              Visualize as informações da família.
          </p>

          <div className="status-section">
              <label>Status Atual:</label>
              <span>{currentStatus}</span>
          </div>

          <div className="form-control">
              <div className="input-group">
                  <label>Nome da Família:</label>
                  <input type="text" placeholder="Nome da Família" disabled />

                  <label>CPF:</label>
                  <input type="text" placeholder="CPF" disabled />

                  <label>CEP:</label>
                  <input type="text" placeholder="CEP" disabled />
              </div>
          </div>
      </div>
  );
}
