import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { approved } from '../../services/generalApi';

const useApprove = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: data => approved(data),

    onSuccess: ({ msg, data }) => {
      queryClient.invalidateQueries({ queryKey: ['approved'] });

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

export default useApprove;
