import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getEnrollmentStudentDetailsInfo } from '../../../../services/studentsApi';

const useStudentDetails = studentId => {
  const { data, isLoading } = useQuery({
    queryKey: ['students-info', studentId],
    queryFn: () => getEnrollmentStudentDetailsInfo(studentId),

    onError: ({ msg }) => {
      toast.success(msg);
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useStudentDetails;
