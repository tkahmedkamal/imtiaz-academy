import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthCtx } from '../context/authContext';
import { useLoggedInUser } from '../hooks';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { loggedInUser, isLoading } = useLoggedInUser();
  const { user } = useAuthCtx();

  useEffect(() => {
    if (!user && !loggedInUser && !isLoading) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate, loggedInUser, isLoading]);

  if (user && loggedInUser) {
    return children;
  }
};

export default ProtectedRoutes;
