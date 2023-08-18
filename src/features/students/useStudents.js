import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getStudents } from '../../services/studentsApi';
import { useStudentsCtx } from '../../context/StudentContext';
import { toast } from 'react-hot-toast';

const useStudents = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useStudentsCtx();

  const currentPage = +searchParams.get('page') || 1;

  const status = {
    all: null,
    active: true,
    pending: false,
  };

  const statusValue = searchParams.get('status') || 'all';
  const countryValue = searchParams.get('country') || 'all';
  const checkCountryValue =
    !countryValue || countryValue === 'all'
      ? 'countryPr='
      : `countryPr=${countryValue}`;
  const searchValue = searchParams.get('search') || '';

  const filterQueries = `isActive=${status[statusValue]},${checkCountryValue},namePr=${searchValue}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['students', filterQueries, currentPage],
    queryFn: () => getStudents(currentPage, filterQueries),
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['students', filterQueries, currentPage + 1],
      queryFn: () => getStudents(currentPage + 1, filterQueries),
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['students', filterQueries, currentPage - 1],
      queryFn: () => getStudents(currentPage - 1, filterQueries),
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

export default useStudents;
