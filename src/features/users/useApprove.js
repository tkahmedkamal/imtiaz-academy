import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { user } from '../../services/generalApi';

const useUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: data => user(data),

    onSuccess: ({ msg, data }) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

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

export default useUser;
