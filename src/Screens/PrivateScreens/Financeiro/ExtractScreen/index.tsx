import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

interface ExtractScreenProps {
  header: ExtratoProps["header"];
  data: ExtratoProps["data"];
}

const ExtractScreen: React.FC<ExtractScreenProps> = ({ header, data }) => {
  return (
    <div className="container">
      <div className="header">
        <h2>Extrato</h2>
        <p><strong>Saldo Atual:</strong> {header.saldoAtual}</p>
        <p><strong>Saldo Bloqueado:</strong> {header.saldoBloqueado}</p>
        <p><strong>Saldo Limite:</strong> {header.saldoLimite}</p>
        <p><strong>Saldo Anterior:</strong> {header.saldoAnterior}</p>
        <p><strong>Saldo Bloqueio Judicial:</strong> {header.saldoBloqueioJudicial}</p>
        <p><strong>Saldo Bloqueio Judicial Anterior:</strong> {header.saldoBloqueioJudicialAnterior}</p>
      </div>

      <div className="transactions-container">
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Data do Lote</th>
                <th>Descrição</th>
                <th>Número Documento</th>
                <th>CPF/CNPJ</th>
                <th>Informação Complementar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{transaction.tipo}</td>
                  <td>{transaction.valor}</td>
                  <td>{transaction.data}</td>
                  <td>{transaction.dataLote}</td>
                  <td>{transaction.descricao}</td>
                  <td>{transaction.numeroDocumento}</td>
                  <td>{transaction.cpfCnpj}</td>
                  <td>{transaction.descInfComplementar}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default ExtractScreen;