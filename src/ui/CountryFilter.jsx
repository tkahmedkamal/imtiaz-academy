import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';
import { useCountries } from '../hooks';

const CountryFilter = () => {
  const { term, handler: handleChange } = useFilter('country', true);
  const { data } = useCountries();

  return (
    <div className='w-[160px]'>
      <SelectFilter
        options={data}
        onChange={handleChange}
        defaultValue={term}
      />
    </div>
  );
};

export default CountryFilter;
