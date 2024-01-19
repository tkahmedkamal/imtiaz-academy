import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getStudentEnrollmentById } from '../../services/studentsApi.js';

const useStudentEnrollment = studentId => {
  const { data, isLoading } = useQuery({
    queryKey: ['students', studentId],
    queryFn: () => getStudentEnrollmentById(studentId),
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

export default useStudentEnrollment;
