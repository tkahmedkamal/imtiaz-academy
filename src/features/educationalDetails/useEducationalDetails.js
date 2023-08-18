import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getEducationalDetails } from '../../services/educationalDetailsApi';
import { useEducationalCtx } from '../../context/EducationalContext';

const useEducationalDetails = () => {
  const [searchParams] = useSearchParams();
  const { pageCount } = useEducationalCtx();
  const { prefetchQuery } = useQueryClient();

  const programTypeStatus = {
    all: '',
    personal: true,
    group: false,
  };

  const currentPage = +searchParams.get('page') || 1;
  const searchValue = searchParams.get('search') || '';
  const programType = searchParams.get('programType') || 'all';
  const filterQueries = `subProgramNamePr=${searchValue},programTypeId=${programTypeStatus[programType]}&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['educational-details', currentPage, filterQueries],
    queryFn: () => getEducationalDetails(currentPage, filterQueries),
  });

  if (currentPage < pageCount) {
    prefetchQuery({
      queryKey: ['educational-details', currentPage + 1, filterQueries],
      queryFn: () => getEducationalDetails(currentPage + 1, filterQueries),
    });
  }

  if (currentPage > 1) {
    prefetchQuery({
      queryKey: ['educational-details', currentPage - 1, filterQueries],
      queryFn: () => getEducationalDetails(currentPage - 1, filterQueries),
    });
  }

  return {
    data,
    isLoading,
  };
};

export default useEducationalDetails;
