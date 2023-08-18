import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { addPaymentTransaction } from '../../services/studentsApi';

const useAddPaymentTransaction = closeModal => {
  const { invalidateQueries } = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: studentPaymentTrans =>
      addPaymentTransaction(studentPaymentTrans),

    onSuccess: ({ msg }) => {
      invalidateQueries({
        queryKey: ['students'],
      });
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

export default useAddPaymentTransaction;
