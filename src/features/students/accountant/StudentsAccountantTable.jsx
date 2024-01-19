import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Spinner, Pagination, Empty } from '../../../ui';
import useStudents from '../useStudents';
import StudentsAccountantRow from './StudentsAccountantRow';
import { useStudentsCtx } from '../../../context/StudentContext';

const StudentsAccountantTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useStudents();

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
            <Table.Th>{t('global.phone')}</Table.Th>
            <Table.Th>{t('global.country')}</Table.Th>
            <Table.Th>{t('global.totalEnrollmentCost')}</Table.Th>
            <Table.Th>{t('global.totalPaidAmount')}</Table.Th>
            <Table.Th>{t('global.credit')}</Table.Th>
            <Table.Th>{t('global.status')}</Table.Th>
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={students}
            render={(student, index) => (
              <StudentsAccountantRow
                key={student.id}
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

export default StudentsAccountantTable;
