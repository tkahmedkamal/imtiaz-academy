import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getTeachers } from '../../services/teacherApi';
import { useStudentsCtx } from '../../context/StudentContext';

const useTeachers = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useStudentsCtx();

  const currentPage = +searchParams.get('page') || 1;
  const searchValue = searchParams.get('search') || '';
  const filterQueries = `name=${searchValue}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['teachers', filterQueries, currentPage],
    queryFn: () => getTeachers(currentPage, filterQueries),
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['teachers', filterQueries, currentPage + 1],
      queryFn: () => getTeachers(currentPage + 1, filterQueries),
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['teachers', filterQueries, currentPage - 1],
      queryFn: () => getTeachers(currentPage - 1, filterQueries),
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  }

  return {
    data,
    isLoading,
  };
};

export default useTeachers;
