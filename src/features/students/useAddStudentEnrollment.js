import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addStudentEnrollment } from '../../services/studentsApi';

const useAddStudentEnrollment = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: enrollmentData => addStudentEnrollment(enrollmentData),

    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ['studentEnrollment'] });
      toast.success(msg);
      closeModal?.();
    },
    onError: ({ message }) => {
      if (message.startsWith('{') && message.endsWith('}')) {
        const errors = JSON.parse(message);

        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            const array = errors[key];

            array.forEach((item, index) => {
              toast.error(item);
            });
          }
        }

        return;
      }

      toast.error(message);
    },
  });

  return {
    mutate,
    isLoading,
  };
};

export default useAddStudentEnrollment;
