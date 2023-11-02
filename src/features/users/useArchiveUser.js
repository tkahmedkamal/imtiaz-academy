import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { archiveUser } from '../../services/usersApi';

const useArchiveUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: userId => archiveUser(userId),
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(msg);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    mutate,
    isLoading,
  };
};

export default useArchiveUser;
