import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Spinner, Pagination, Empty } from '../../ui';
import useStudentsEnrollments from '../studentsEnrollments/useStudentsEnrollments';
import StudentsEnrollmentsRow from './StudentsEnrollmentsRow';
import { useStudentsCtx } from '../../context/StudentContext';
import { useAuthCtx } from '../../context/authContext';

const StudentsEnrollmentsTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useStudentsEnrollments();
  const { user } = useAuthCtx();

  const {
    data: students,
    pageSize,
    totalRecordsFiltered,
    totalPages,
  } = data?.pagedResponse || {};

  const { setLength, setPageCount } = useStudentsCtx();

  useEffect(() => {
    setLength(totalRecordsFiltered);
    setPageCount(totalPages);
  }, [setLength, setPageCount, totalRecordsFiltered, totalPages]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='rounded-sm'>
      <div className='overflow-x-auto'>
        <Table>
          <Table.Thead>
            <Table.Th>{t('global.index')}</Table.Th>
            <Table.Th>{t('global.name')}</Table.Th>
            <Table.Th>{t('global.courseName')}</Table.Th>
            <Table.Th>{t('educational.course.texts.numOfClasses')}</Table.Th>
            <Table.Th>{t('global.enrollmentCost')}</Table.Th>
            <Table.Th>{t('global.totalPaidAmount')}</Table.Th>
            <Table.Th>{t('global.status')}</Table.Th>
            <Table.Th>{t('global.phone')}</Table.Th>
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={students}
            render={(student, index) => (
              <StudentsEnrollmentsRow
                key={student.studentEnrollmentId}
                student={student}
                index={index}
              />
            )}
          />
        </Table>
      </div>
      <Pagination
        limit={pageSize}
        results={totalRecordsFiltered}
        pageCount={totalPages}
      />
      {!students?.length && (
        <Empty message='There is no data for students at this time.' />
      )}
    </div>
  );
};

export default StudentsEnrollmentsTable;
