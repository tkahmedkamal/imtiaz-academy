import { useQuery, useQueryClient } from '@tanstack/react-query';
//import { toast } from 'react-hot-toast';

import { getLoggedInUser } from '../services/generalApi';
import { useAuthCtx } from '../context/authContext';

const useLoggedInUser = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthCtx();

  const { data: loggedInUser, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getLoggedInUser,
    retry: false,

    onSuccess: user => {
      if (user) {
        setUser(user);
      }
    },
    onError: ({ message }) => {
      queryClient.setQueryData(['user'], null);
      setUser(null);
    },
  });

  return {
    loggedInUser,
    isLoading,
  };
};

export default useLoggedInUser;
