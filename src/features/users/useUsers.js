import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import {
  getEmployeeUsers
} from '../../services/usersApi';
import { useUsersCtx } from '../../context/UserContext';
import { useAuthCtx } from '../../context/authContext';

const useUsers = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useUsersCtx();
  const { user } = useAuthCtx();

  let handler = getEmployeeUsers;
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
  const countryValue = searchParams.get('country') || 'all';
  const checkCountryValue =
    !countryValue || countryValue === 'all'
      ? 'country'
      : `country=${countryValue}`;
  const searchValue = searchParams.get('search') || '';
  const creditValue = searchParams.get('credit') || 'all';

  const filters = `isActive=${status[statusValue]},isArchive=false,${checkCountryValue},name=${searchValue}`;
  const filterQueries =
    user && user?.roles.includes('AccountantAgent')
      ? `${filters},credit=${credit[creditValue]}&isGeneralSearch=true`
      : `${filters}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['users', filterQueries, currentPage],
    queryFn: () => handler(currentPage, filterQueries),
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['users', filterQueries, currentPage + 1],
      queryFn: () => handler(currentPage + 1, filterQueries),
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ['users', filterQueries, currentPage - 1],
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

export default useUsers;
