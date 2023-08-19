import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getStudent } from '../../services/studentsApi.js';

const useStudent = studentId => {
  const { data, isLoading } = useQuery({
    queryKey: ['students', studentId],
    queryFn: () => getStudent(studentId),
    cacheTime: 0,
    onError: ({ msg }) => {
      toast.success(msg);
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useStudent;
