import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Spinner, Pagination, Empty } from '../../ui';
import useEducationalDetails from './useEducationalDetails';
import EducationalDetailsRow from './EducationalDetailsRow';
import { useEducationalDetailsCtx } from '../../context/EducationalDetailsContext';

const EducationalDetailsTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useEducationalDetails();

  const {
    data: details,
    pageSize,
    totalRecordsFiltered,
    totalPages,
  } = data?.pagedResponse || {};

  const { setLength, setPageCount } = useEducationalDetailsCtx();

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
            <Table.Th>{t('educational.details.texts.sub')}</Table.Th>
            <Table.Th>{t('educational.details.texts.numOfClasses')}</Table.Th>
            <Table.Th>{t('educational.details.texts.numOfHours')}</Table.Th>
            <Table.Th>{t('educational.details.texts.cost')}</Table.Th>
            <Table.Th>{t('educational.details.texts.discount')}</Table.Th>
            <Table.Th>
              {t('educational.details.texts.costAfterDiscount')}
            </Table.Th>
            <Table.Th>{t('educational.details.texts.programType')}</Table.Th>
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={details}
            render={(detail, index) => (
              <EducationalDetailsRow
                key={detail.id}
                detail={detail}
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
      {!details?.length && (
        <Empty message='There is no data for educational programs details at this time.' />
      )}
    </div>
  );
};

export default EducationalDetailsTable;
