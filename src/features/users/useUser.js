import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getUsers } from '../../services/generalApi';
import { useSearchParams } from 'react-router-dom';
import { useUsersCtx } from '../../context/UserContext';

const useUser = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useUsersCtx();

  const currentPage = +searchParams.get('page') || 1;
  const searchValue = searchParams.get('search') || '';

  const filterQueries = `name=${searchValue}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['user', currentPage, filterQueries],
    queryFn: () => getUsers(currentPage, filterQueries),

    onError: ({ msg }) => {
      toast.success(msg);
    },
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['user', currentPage + 1, filterQueries],
      queryFn: () => getUsers(currentPage + 1, filterQueries),

      onError: ({ msg }) => {
        toast.success(msg);
      },
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['user', currentPage - 1, filterQueries],
      queryFn: () => getUsers(currentPage - 1, filterQueries),

      onError: ({ msg }) => {
        toast.success(msg);
      },
    });
  }

  return {
    data,
    isLoading,
  };
};

export default useUser;
