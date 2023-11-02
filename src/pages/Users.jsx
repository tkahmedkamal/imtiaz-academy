import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserTable from '../features/users/UserTable';
import UserProvider from '../context/UserContext';
import { TableOperational } from '../ui';
import { withPage } from '../hocs';
import { useAuthCtx } from '../context/authContext';

const Users = () => {
  const navigate = useNavigate();
  const { user } = useAuthCtx();

  useEffect(() => {
    if (user && !user.roles.includes('Admin')) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <UserProvider>
      <TableOperational />
      <UserTable />
    </UserProvider>
  );
};

export default withPage(Users, 'approve.title');
