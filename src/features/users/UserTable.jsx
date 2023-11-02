import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Spinner, Pagination, Empty } from '../../ui';
import useUsers from './useUsers';
import UsersRow from './UsersRow';
import { useUsersCtx } from '../../context/UserContext';

const UsersTable = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useUsers();

  const {
    data: users,
    pageSize,
    totalRecordsFiltered,
    totalPages,
  } = data?.pagedResponse || {};

  const { setLength, setPageCount } = useUsersCtx();

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
            <Table.Th>{t('global.status')}</Table.Th>
            <Table.Th>{t('global.actions')}</Table.Th>
          </Table.Thead>

          <Table.Tbody
            data={users}
            render={(user, index) => (
              <UsersRow
                key={user.id}
                user={user}
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
      {!users?.length && (
        <Empty message='There is no data for users at this time.' />
      )}
    </div>
  );
};

export default UsersTable;
