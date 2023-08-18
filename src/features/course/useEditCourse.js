import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { editCourse } from '../../services/courseApi';

const useCourse = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: details => editCourse(details),
    onSuccess: () => {
      // TODO: Fix this message => return from API
      queryClient.invalidateQueries({ queryKey: ['educational-details'] });
      toast.success('Educational Program Details successfully updated.');
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

export default useCourse;
