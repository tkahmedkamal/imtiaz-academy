import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getTeachersDialog } from '../../services/generalApi';

const useTeachersDialog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachersDialog,
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useTeachersDialog;
