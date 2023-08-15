import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Spinner, Pagination, Empty } from '../../ui';
import useEducational from './useEducational';
import EducationalRow from './EducationalRow';
import { useEducationalCtx } from '../../context/EducationalContext';

const EducationalTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useEducational();

  const {
    data: programs,
    pageSize,
    totalRecordsFiltered,
    totalPages,
  } = data?.pagedResponse || {};

  const { setLength, setPageCount } = useEducationalCtx();

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
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={programs}
            render={(program, index) => (
              <EducationalRow
                key={program.id}
                program={program}
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
      {!programs?.length && (
        <Empty message='There is no data for educational programs at this time.' />
      )}
    </div>
  );
};

export default EducationalTable;
