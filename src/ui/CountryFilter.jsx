import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';
import { useCountries } from '../hooks';
import { useTranslation } from 'react-i18next';

const CountryFilter = () => {
  const { term, handler: handleChange } = useFilter('country', true);
  const { data } = useCountries();
  const { t } = useTranslation();

  return (
    <div className='w-[160px]'>
      <SelectFilter
        options={data}
        onChange={handleChange}
        defaultValue={term}
        filterFor= {t('global.allCountries')}
            />
    </div>
  );
};

export default CountryFilter;
