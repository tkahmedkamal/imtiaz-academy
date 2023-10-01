import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ApprovedTable from '../features/approved/ApprovedTable';
import ApproveProvider from '../context/ApproveContext';
import { TableOperational } from '../ui';
import { withPage } from '../hocs';
import { useAuthCtx } from '../context/authContext';

const Approved = () => {
  const navigate = useNavigate();
  const { user } = useAuthCtx();

  useEffect(() => {
    if (user && !user.roles.includes('Admin')) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <ApproveProvider>
      <TableOperational />
      <ApprovedTable />
    </ApproveProvider>
  );
};

export default withPage(Approved, 'approve.title');
