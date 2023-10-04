import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getCoursesDialog } from '../../services/generalApi';

const useCoursesDialog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesDialog,
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useCoursesDialog;
