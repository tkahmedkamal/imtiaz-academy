import { useTranslation } from 'react-i18next';

import ButtonMini from './ButtonMini';
import useFilter from '../hooks/useFilter';

const ProgramTypeFilter = () => {
  const { t } = useTranslation();
  const { term: status, handler: handleClick } = useFilter('programType');

  return (
    <div className='flex items-center rounded-md border border-divider bg-light-gray p-1.5 dark:border-dark-divider dark:bg-dark-light-gray'>
      <ButtonMini active={status === 'all'} status='all' onClick={handleClick}>
        {t('global.all')}
      </ButtonMini>
      <ButtonMini
        active={status === 'personal'}
        status='personal'
        onClick={handleClick}
      >
        {t('global.personal')}
      </ButtonMini>
      <ButtonMini
        active={status === 'group'}
        status='group'
        onClick={handleClick}
      >
        {t('global.group')}
      </ButtonMini>
    </div>
  );
};

export default ProgramTypeFilter;
