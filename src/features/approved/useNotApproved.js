import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getNotApproved } from '../../services/generalApi';
import { useSearchParams } from 'react-router-dom';
import { useApproveCtx } from '../../context/ApproveContext';

const useNotApproved = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useApproveCtx();

  const currentPage = +searchParams.get('page') || 1;
  const searchValue = searchParams.get('search') || '';

  const filterQueries = `name=${searchValue}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['approved', currentPage, filterQueries],
    queryFn: () => getNotApproved(currentPage, filterQueries),

    onError: ({ msg }) => {
      toast.success(msg);
    },
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['approved', currentPage + 1, filterQueries],
      queryFn: () => getNotApproved(currentPage + 1, filterQueries),

      onError: ({ msg }) => {
        toast.success(msg);
      },
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['approved', currentPage - 1, filterQueries],
      queryFn: () => getNotApproved(currentPage - 1, filterQueries),

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

export default useNotApproved;
