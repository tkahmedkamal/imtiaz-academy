import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import {
  getStudentsEnrollment,
  getStudentsAccountant,
  getTeacherStudents,
} from '../../services/studentsApi';
import { useStudentsCtx } from '../../context/StudentContext';
import { useAuthCtx } from '../../context/authContext';

const useStudents = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useStudentsCtx();
  const { user } = useAuthCtx();

  let handler =
    user && user?.roles.includes('EnrollmentAgent')
      ? getStudentsEnrollment
      : ( user && user?.roles.includes('AccountantAgent') ? getStudentsAccountant : getTeacherStudents);
  const currentPage = +searchParams.get('page') || 1;

  const status = {
    all: null,
    active: true,
    pending: false,
  };
  const credit = {
    all: null,
    'less-than-zero': '<0',
    'greater-than-zero': '>0',
    'equal-zero': '0',
  };

  const statusValue = searchParams.get('status') || 'all';
  const countryValue = searchParams.get('countryId') || 'all';
  const checkCountryValue =
    !countryValue || countryValue === 'all'
      ? 'countryId'
      : `countryId=${countryValue}`;
  const searchValue = searchParams.get('search') || '';
  const creditValue = searchParams.get('credit') || 'all';
  const sortColumn = searchParams.get('sortColumn') || '';

  const checkSortColumnValue = () => {
    switch (sortColumn) {
      case 'all':
      case '':
      case null:
      case undefined:
        return 'sortColumn=name';
      case 'Student name (A-Z)':
        return 'sortColumn=name';
      case 'Student name (Z-A)':
        return 'sortColumn=name&SortOrder=desc';
      default:
        return '';
    }
  };
  const checkedSort = checkSortColumnValue();

  const filters = `isActive=${status[statusValue]},${checkCountryValue},name=${searchValue}`;
  const filterQueries =
    user && user?.roles.includes('AccountantAgent')
      ? `${filters},credit=${credit[creditValue]}&isGeneralSearch=true&${checkedSort}`
      : `${filters}&isGeneralSearch=true&${checkedSort}`;

  const { data, isLoading } = useQuery({
    queryKey: ['students', filterQueries, currentPage],
    queryFn: () => handler(currentPage, filterQueries),
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['students', filterQueries, currentPage + 1],
      queryFn: () => handler(currentPage + 1, filterQueries),
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['students', filterQueries, currentPage - 1],
      queryFn: () => handler(currentPage - 1, filterQueries),
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
