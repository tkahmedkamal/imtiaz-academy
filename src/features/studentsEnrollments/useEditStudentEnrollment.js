import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { editStudentEnrollment } from '../../services/studentsApi';

const useEditStudentEnrollment = closeModal => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: student => editStudentEnrollment(student),
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
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

export default useEditStudentEnrollment;
