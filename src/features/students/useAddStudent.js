import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { signupStudentApi } from '../../services/authApi';

const useAddStudent = closeModal => {
  const { mutate, isLoading } = useMutation({
    mutationFn: data => signupStudentApi(data),
    onSuccess: ({ msg }) => {
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

export default useAddStudent;
