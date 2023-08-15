import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { archiveStudent } from '../../services/studentsApi';

const useArchiveStudent = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: studentId => archiveStudent(studentId),
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
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

export default useArchiveStudent;
