import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Spinner, Pagination, Empty } from '../../ui';
import useCourse from './useCourse';
import CourseRow from './CourseRow.jsx';
import { useCourseCtx } from '../../context/CourseContext';

const CourseTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useCourse();

  const {
    data: details,
    pageSize,
    totalRecordsFiltered,
    totalPages,
  } = data?.pagedResponse || {};

  const { setLength, setPageCount } = useCourseCtx();

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
            <Table.Th>{t('educational.course.texts.name')}</Table.Th>
            <Table.Th>{t('educational.course.texts.numOfClasses')}</Table.Th>
            <Table.Th>{t('educational.course.texts.numOfHours')}</Table.Th>
            <Table.Th>{t('educational.course.texts.cost')}</Table.Th>
            <Table.Th>{t('educational.course.texts.discount')}</Table.Th>
            <Table.Th>
              {t('educational.course.texts.costAfterDiscount')}
            </Table.Th>
            <Table.Th>{t('educational.course.texts.programType')}</Table.Th>
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={details}
            render={(detail, index) => (
              <CourseRow key={detail.id} detail={detail} index={index} />
            )}
          />
        </Table>
      </div>
      <Pagination
        limit={pageSize}
        results={totalRecordsFiltered}
        pageCount={totalPages}
      />
      {!details?.length && (
        <Empty message='There is no data for educational programs details at this time.' />
      )}
    </div>
  );
};

export default CourseTable;
