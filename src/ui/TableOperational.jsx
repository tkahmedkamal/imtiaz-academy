import { useTranslation } from 'react-i18next';
import { BsPlus } from 'react-icons/bs';

import Modal from './Modal';
import Button from './Button';
import Search from './Search';
import Filter from './Filter';

const TableOperational = ({ windowName, noFilter, labelBtn }) => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center justify-between overflow-auto border-l border-r border-t border-divider bg-paper p-6 dark:border-dark-divider dark:bg-dark-paper xs:flex-wrap'>
      <Search />
      <div className='flex items-center gap-3 xs:mt-3 xs:flex-wrap'>
        {!noFilter && <Filter />}
        <Modal.Open opens={windowName}>
          <Button icon={<BsPlus />} status='primary'>
            {t(labelBtn)}
          </Button>
        </Modal.Open>
      </div>
    </div>
  );
};

export default TableOperational;
