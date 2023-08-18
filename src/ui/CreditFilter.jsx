import { useTranslation } from 'react-i18next';

import ButtonMini from './ButtonMini';
import useFilter from '../hooks/useFilter';

const CreditFilter = () => {
  const { t } = useTranslation();
  const { term: status, handler: handleClick } = useFilter('credit');

  return (
    <div className='flex items-center rounded-md border border-divider bg-light-gray p-1.5 dark:border-dark-divider dark:bg-dark-light-gray'>
      <ButtonMini active={status === 'all'} status='all' onClick={handleClick}>
        {t('global.all')}
      </ButtonMini>
      <ButtonMini
        active={status === 'less-than-zero'}
        status='less-than-zero'
        onClick={handleClick}
      >
        {t('global.ltZero')}
      </ButtonMini>
      <ButtonMini
        active={status === 'greater-than-zero'}
        status='greater-than-zero'
        onClick={handleClick}
      >
        {t('global.gtZero')}
      </ButtonMini>
      <ButtonMini
        active={status === 'equal-zero'}
        status='equal-zero'
        onClick={handleClick}
      >
        {t('global.eqZero')}
      </ButtonMini>
    </div>
  );
};

export default CreditFilter;
