import { useTranslation } from 'react-i18next';

import ButtonMini from './ButtonMini';
import useFilter from '../hooks/useFilter';

const GenderFilter = () => {
  const { t } = useTranslation();
  const { term: status, handler: handleClick } = useFilter('gender');

  return (
    <div className='flex items-center rounded-md border border-divider bg-light-gray p-1.5 dark:border-dark-divider dark:bg-dark-light-gray'>
      <ButtonMini active={status === 'all'} status='all' onClick={handleClick}>
        {t('global.all')}
      </ButtonMini>
      <ButtonMini
        active={status === 'male'}
        status='male'
        onClick={handleClick}
      >
        {t('global.male')}
      </ButtonMini>
      <ButtonMini
        active={status === 'female'}
        status='female'
        onClick={handleClick}
      >
        {t('global.female')}
      </ButtonMini>
    </div>
  );
};

export default GenderFilter;
