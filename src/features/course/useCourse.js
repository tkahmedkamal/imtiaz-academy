import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getCourse } from '../../services/courseApi';
import { useCourseCtx } from '../../context/CourseContext';

const useCourse = () => {
  const [searchParams] = useSearchParams();
  const { pageCount } = useCourseCtx();
  const { prefetchQuery } = useQueryClient();

  const programTypeStatus = {
    all: '',
    personal: true,
    group: false,
  };

  const currentPage = +searchParams.get('page') || 1;
  const searchValue = searchParams.get('search') || '';
  const programType = searchParams.get('programType') || 'all';
  const filterQueries = `name=${searchValue},isPersonal=${programTypeStatus[programType]},isActive=true&isGeneralSearch=true`;

  const { data, isLoading } = useQuery({
    queryKey: ['educational-details', currentPage, filterQueries],
    queryFn: () => getCourse(currentPage, filterQueries),
  });

  if (currentPage < pageCount) {
    prefetchQuery({
      queryKey: ['educational-details', currentPage + 1, filterQueries],
      queryFn: () => getCourse(currentPage + 1, filterQueries),
    });
  }

  if (currentPage > 1) {
    prefetchQuery({
      queryKey: ['educational-details', currentPage - 1, filterQueries],
      queryFn: () => getCourse(currentPage - 1, filterQueries),
    });
  }

  return {
    data,
    isLoading,
  };
};

export default useCourse;
