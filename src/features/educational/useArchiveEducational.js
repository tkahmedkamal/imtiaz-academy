import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { archiveEducational } from '../../services/educationalApi';

const useArchiveEducational = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: programId => archiveEducational(programId),
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ['educational'] });
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

export default useArchiveEducational;
