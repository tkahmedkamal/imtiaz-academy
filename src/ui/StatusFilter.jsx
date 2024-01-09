import { useTranslation } from 'react-i18next';

import ButtonMini from './ButtonMini';
import useFilter from '../hooks/useFilter';

const StatusFilter = () => {
  const { t } = useTranslation();
  const { term: status, handler: handleClick } = useFilter('status');

  return (
    <div className='flex items-center rounded-md border border-divider bg-light-gray p-1.5 dark:border-dark-divider dark:bg-dark-light-gray'>
      
      <ButtonMini
        active={status === 'active'}
        status='active'
        onClick={handleClick}
      >
        {t('global.active')}
      </ButtonMini>
      <ButtonMini
        active={status === 'pending'}
        status='pending'
        onClick={handleClick}
      >
        {t('global.pending')}
      </ButtonMini>
      <ButtonMini active={status === 'all'} status='all' onClick={handleClick}>
        {t('global.all')}
      </ButtonMini>
    </div>
  );
};

export default StatusFilter;
