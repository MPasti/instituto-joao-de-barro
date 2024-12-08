import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  header: {
    name: string;
    status: string;
    dueDate: string;
    bankStatement: string;
    invoice: string; 
  };
  data: {
    name: string;
    status: string;
    dueDate: string,
    incoming?: string;
    outgoing?: string;
    invoiceLink?: string;
  }[];
}

const TableComponent: React.FC<Props> = ({header, data}) => {
  return (

    <table className="table">
      <thead>
        <tr>
          <th>{header.name}</th>
          <th>{header.status}</th>
          <th>{header.dueDate}</th>
          <th>{header.bankStatement}</th>
          <th>{header.invoice}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.dueDate}</td>
            <td>{item.outgoing}</td>
            <td>
              {item.invoiceLink ? (
                <a href={item.invoiceLink} target="_blank" rel="noopener noreferrer">
                  Nota Fiscal
                </a>
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;