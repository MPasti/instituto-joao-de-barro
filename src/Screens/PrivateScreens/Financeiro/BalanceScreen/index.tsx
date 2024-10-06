interface Props {
  account: number;
  cdb: number;
}

const BalanceScreen: React.FC<Props> = ({account, cdb}) => {
  return (
    <div className="balance-container">
      <div>
        <h3>Conta Corrente</h3>
        <div className="card">
          R${account}
        </div>
      </div>
      <div>
        <h3>CDB</h3>
        <div className="card">
          R${cdb}
        </div>
      </div>
      <div>
        <h3>Total</h3>
        <div className="card">
          R${cdb + account}
        </div>
      </div>
    </div>
  )
}

export default BalanceScreen