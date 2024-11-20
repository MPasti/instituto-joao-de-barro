import { useEffect, useState } from 'react';
import TableComponent from './Table';
import BalanceScreen from './BalanceScreen';
import {  getBalance } from '../../../services/balanceService';
import ExtractScreen from './ExtractScreen';



interface Data {
  name: string;
  status: string;
  dueDate: string,
  incoming?: string;
  outgoing?: string;
}

interface Bank {
  account: number;
  cdb: number;
}

interface ExtratoProps {
  header: {
    saldoAtual: string;
    saldoBloqueado: string;
    saldoLimite: string;
    saldoAnterior: string;
    saldoBloqueioJudicial: string;
    saldoBloqueioJudicialAnterior: string;
  };
  data: {
    tipo: string;
    valor: string;
    data: string;
    dataLote: string;
    descricao: string;
    numeroDocumento: string;
    cpfCnpj: string;
    descInfComplementar: string;
  }[];
}

const tableExpenses = {
  name: 'Nome',
  status: 'Situação do Pagamento',
  dueDate: 'Data de Vencimento',
  bankStatement: 'Saída'
}

const tableRevenue = {
  name: 'Nome',
  status: 'Situação do Pagamento',
  dueDate: 'Data de Vencimento',
  bankStatement: 'Entrada'
}

const Financeiro: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [tableDataExpenses, setTableDataExpenses] = useState<Data[]>([]);
  const [tableDataRevenue, setTableDataRevenue] = useState<Data[]>([]);
  const [bankStatement, setbankStatement] = useState<Bank>({account: 0, cdb: 0});
  const [extractData, setExtractData] = useState<ExtratoProps>({
    header: {
      saldoAtual: "",
      saldoBloqueado: "",
      saldoLimite: "",
      saldoAnterior: "",
      saldoBloqueioJudicial: "",
      saldoBloqueioJudicialAnterior: "",
    },
    data: [],
  });

  useEffect(() => {
    loadProductsExpenses();
  }, []);
  
  const loadProductsExpenses = async () => {
  
  const response = await getBalance();
  setTableDataExpenses(response.data.tableDataExpenses);
  };

  useEffect(() => {
    loadProductsRevenue();
  }, []);

  const loadProductsRevenue = async () => {
  
    const response = await getBalance();
  setTableDataRevenue(response.data.tableDataRevenue);
  };

  
  useEffect(() => {
    loadbankStatement();
  }, []);

  const loadbankStatement = async () => {
    const response = await getBalance()
    setbankStatement(response.data.bankStatement);
  }

  useEffect(() => {
    loadExtract();
  }, []);
  
  const loadExtract = async () => {
  
  const response = await getBalance();
    setExtractData(response.data.extractData);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`} 
          onClick={() => handleTabClick('tab1')}
        >
          Despesas
        </button>
        <button 
          className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`} 
          onClick={() => handleTabClick('tab2')}
        >
          Receita
        </button>
        <button 
          className={`tab-button ${activeTab === 'tab3' ? 'active' : ''}`} 
          onClick={() => handleTabClick('tab3')}
        >
          Saldo
        </button>
        <button 
          className={`tab-button ${activeTab === 'tab4' ? 'active' : ''}`} 
          onClick={() => handleTabClick('tab4')}
        >
          Extrato
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && <TableComponent header={tableExpenses} data={tableDataExpenses} />}
        {activeTab === 'tab2' && <TableComponent header={tableRevenue} data={tableDataRevenue}/>} 
        {activeTab === 'tab3' && <BalanceScreen account={bankStatement?.account} cdb={bankStatement?.cdb}/>} 
        {activeTab === 'tab4' && <ExtractScreen header={extractData.header} data={extractData.data}/>} 
      </div>
    </div>
  );
};

export { Financeiro};