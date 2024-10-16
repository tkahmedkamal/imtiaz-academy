import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import {
  getStudentsEnrollmentsAcc,
  getTeacherStudents,
  // getStudentEnrollmentById,
} from '../../services/studentsApi';
import { useStudentsCtx } from '../../context/StudentContext';
import { useAuthCtx } from '../../context/authContext';

const useStudentsEnrollments = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pageCount } = useStudentsCtx();
  const { user } = useAuthCtx();

  let handler =
      user?.roles.includes('EnrollmentAgent')  ||  user?.roles.includes('AccountantAgent')
      ? getStudentsEnrollmentsAcc
      : getTeacherStudents;
  const currentPage = +searchParams.get('page') || 1;


  // const credit = {
  //   all: null,
  //   'less-than-zero': '<0',
  //   'greater-than-zero': '>0',
  //   'equal-zero': '0',
  // };

  const statusValue = searchParams.get('enrollmentStatus') || 'all';
  
  const courseValue = searchParams.get('courseId') || 'all';
  const teacherValue = searchParams.get('teacherId') || 'all';
  const sortColumn = searchParams.get('sortColumn') || '';
//   const enrStatus = ()=> 
//   { switch (statusValue) {
//     case 'all':
//     case '':
//     case null:
//     case undefined:
//       return '';
//     case 'active':
//       return 'enrollmentStatus=1';
//     case 'pending':
//       return 'enrollmentStatus=2';
//     default:
//       return '';
//   }
// }
  const checkSortColumnValue = () => {
    switch (sortColumn) {
      case 'all':
      case '':
      case null:
      case undefined:
        return 'sortColumn=studentName';
      case 'Student name (A-Z)':
        return 'sortColumn=studentName';
      case 'Course name (A-Z)':
        return 'sortColumn=courseName';
      case 'Student name (Z-A)':
        return 'sortColumn=studentName&SortOrder=desc';
      case 'Course name (Z-A)':
        return 'sortColumn=courseName&SortOrder=desc';
      default:
        return '';
    }
  };
  const checkedSort = checkSortColumnValue();
  const checkCourseValue =
    !courseValue || courseValue === 'all'
      ? 'courseId'
      : `courseId=${courseValue}`;
  const checkTeacherValue =
    !teacherValue || teacherValue === 'all'
      ? 'teacherId'
      : `teacherId=${teacherValue}`;

  const searchValue = searchParams.get('search') || '';

  // const creditValue = searchParams.get('credit') || 'all';
  const checkEnrollmentStatusValue =
  !statusValue || statusValue ==='all'
  ? 'enrollmentStatus'
  : `enrollmentStatus=${statusValue}`
  const filters = `${checkEnrollmentStatusValue},${checkCourseValue},${checkTeacherValue},studentName=${searchValue}`;
  const filterQueries =
    user && user?.roles.includes('AccountantAgent')
      ? `${filters},&isGeneralSearch=true&${checkedSort}`
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

//  const useStudentEnrollment = studentId => {
//   const { data, isLoading } = useQuery({
//     queryKey: ['students', studentId],
//     queryFn: () => getStudentEnrollmentById(studentId),
//   cacheTime: 0,

//     onError: ({ msg }) => {
//       toast.success(msg);
//      },
//   });

//   return {
//     data,
//     isLoading,
//   };
// };

export default useStudentsEnrollments;
