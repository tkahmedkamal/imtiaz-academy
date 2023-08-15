import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addEducationalDetails } from '../../services/educationalDetailsApi';

const useAddEducationalDetails = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: details => addEducationalDetails(details),
    onSuccess: () => {
      // TODO: Fix this message => return from API
      queryClient.invalidateQueries({ queryKey: ['educational-details'] });
      toast.success('Educational Program Details successfully added.');
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

export default useAddEducationalDetails;
