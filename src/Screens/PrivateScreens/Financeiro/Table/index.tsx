import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  header: {
    name: string;
    status: string;
    dueDate: string;
    bankStatement: string;
  };
  data: {
    name: string;
    status: string;
    dueDate: string,
    incoming?: string;
    outgoing?: string;
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
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.dueDate}</td>
            <td>{item.outgoing}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;