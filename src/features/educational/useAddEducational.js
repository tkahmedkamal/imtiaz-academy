import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addEducational } from '../../services/educationalApi';

const useAddEducational = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: program => addEducational(program),
    onSuccess: () => {
      // TODO: Fix this message => return from API
      queryClient.invalidateQueries({ queryKey: ['educational'] });
      toast.success('Educational Program successfully Added.');
      closeModal?.();
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

export default useAddEducational;
