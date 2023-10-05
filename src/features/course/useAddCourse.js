import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addCourse } from '../../services/courseApi';

const useAddCourse = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: details => addCourse(details),
    onSuccess: () => {
      if (Response.data && Response.data.success) {
        toast.success(Response.msg); // Use the success message from the API response.
      } else {
        toast.success('Course successfully added.');
      }      queryClient.invalidateQueries({ queryKey: ['educational-details'] });
      toast.success('Course successfully added.');
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

export default useAddCourse;
