import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getEducational } from '../../services/educationalApi';
import { useEducationalCtx } from '../../context/EducationalContext';

const useEducational = () => {
  const [searchParams] = useSearchParams();
  const { pageCount } = useEducationalCtx();
  const queryClient = useQueryClient();

  const currentPage = +searchParams.get('page') || 1;
  const searchValue = searchParams.get('search') || '';
  const filterQueries = `name=${searchValue}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['educational', currentPage, filterQueries],
    queryFn: () => getEducational(currentPage, filterQueries),
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['educational', currentPage + 1, filterQueries],
      queryFn: () => getEducational(currentPage + 1, filterQueries),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['educational', currentPage - 1, filterQueries],
      queryFn: () => getEducational(currentPage - 1, filterQueries),
    });
  }

  return {
    data,
    isLoading,
  };
};

export default useEducational;
