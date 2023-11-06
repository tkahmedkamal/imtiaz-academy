import { Spinner } from '../../../../ui';
import StudentTabDetailsItem from './StudentTabDetailsItem';
import useEnrollmentStudentDetails from './useStudentDetails';

const StudentDetails = ({ studentId }) => {
  const { data, isLoading } = useEnrollmentStudentDetails(studentId);

  const {
    studentPersonalInformation: info,
    studentEnrollmentInformation: enrollments,
  } = data || {};

  return (
    <>
      <header className='border-b border-divider pb-4 text-xl font-bold text-primary-text dark:border-dark-divider dark:text-dark-primary-text'>
        <h2 className='font-publicSans'>{info?.name}</h2>
      </header>

      {isLoading ? (
        <div className='relative py-16'>
          <Spinner />
        </div>
      ) : (
        <StudentTabDetailsItem info={info} enrollments={enrollments} />
      )}
    </>
  );
};

export default StudentDetails;
