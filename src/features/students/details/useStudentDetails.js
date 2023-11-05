import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getStudentDetailsInfo } from '../../../services/studentsApi';

const useStudentDetails = studentId => {
  const { data, isLoading } = useQuery({
    queryKey: ['students-info', studentId],
    queryFn: () => getStudentDetailsInfo(studentId),

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
