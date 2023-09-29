import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getCountries } from '../services/generalApi';

const useCountries = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useCountries;
