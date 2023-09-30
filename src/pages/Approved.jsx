import ApprovedTable from '../features/approved/ApprovedTable';
import ApproveProvider from '../context/ApproveContext';
import { TableOperational } from '../ui';

const Approved = () => {
  return (
    <ApproveProvider>
      <TableOperational />
      <ApprovedTable />
    </ApproveProvider>
  );
};

export default Approved;
