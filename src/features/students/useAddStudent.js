import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addStudent } from '../../services/studentsApi';

const useAddStudent = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: newStudent => addStudent(newStudent),
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

export default useAddStudent;
