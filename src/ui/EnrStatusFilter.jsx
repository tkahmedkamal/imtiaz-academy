import { useTranslation } from 'react-i18next';

import ButtonMini from './ButtonMini';
import useFilter from '../hooks/useFilter';

const EnrStatusFilter = () => {
  const { t } = useTranslation();
  const { term: status, handler: handleClick } = useFilter('enrollmentStatus');

  return (
    <div className='flex items-center rounded-md border border-divider bg-light-gray p-1.5 dark:border-dark-divider dark:bg-dark-light-gray'>
      
      <ButtonMini active={status === 'all'} status='all' onClick={handleClick}>
        {t('global.all')}
      </ButtonMini>
      <ButtonMini
        active={status === '1'}
        status='1'  // 1 for active
        onClick={handleClick}
      >
        {t('global.active')}
      </ButtonMini>
      <ButtonMini
        active={status === '2'}
        status='2' // 2 for pending
        onClick={handleClick}
      >
        {t('global.pending')}
      </ButtonMini>
    </div>
  );
};

export default EnrStatusFilter;
