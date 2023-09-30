import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useNotApproved from './useNotApproved';
import ApprovedRow from './ApprovedRow';
import { Table, Spinner, Pagination, Empty } from '../../ui';
import { useApproveCtx } from '../../context/ApproveContext';

const ApprovedTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useNotApproved();

  const {
    data: users,
    pageSize,
    totalRecordsFiltered,
    totalPages,
  } = data?.pagedResponse || {};

  const { setLength, setPageCount } = useApproveCtx();

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
            <Table.Th>{t('global.userType')}</Table.Th>
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={users}
            render={(user, index) => (
              <ApprovedRow key={user.id} user={user} index={index} />
            )}
          />
        </Table>
      </div>
      <Pagination
        limit={pageSize}
        results={totalRecordsFiltered}
        pageCount={totalPages}
      />
      {!users?.length && (
        <Empty message='There is no data for students at this time.' />
      )}
    </div>
  );
};

export default ApprovedTable;
