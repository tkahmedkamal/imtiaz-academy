import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { editEducational } from '../../services/educationalApi';

const useEditEducational = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: program => editEducational(program),
    onSuccess: () => {
      // TODO: Fix this message => return from API
      queryClient.invalidateQueries({ queryKey: ['educational'] });
      toast.success('Educational Program successfully updated.');
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

export default useEditEducational;
