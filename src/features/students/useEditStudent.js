import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { editStudent } from '../../services/studentsApi';

const useEditStudent = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: student => editStudent(student),
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success(msg);
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

export default useEditStudent;
