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

                  <label>Campo 2:</label>
                  <input type="text" placeholder="Campo 2" disabled />

                  <label>Campo 3:</label>
                  <input type="text" placeholder="Campo 3" disabled />
              </div>

              <div className="dropdown-button-group">
                  <div className="dropdown-group">
                      <label>Dropdown 1</label>
                      <select disabled>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                      </select>
                      <label>Dropdown 2</label>
                      <select disabled>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>
  );
}
