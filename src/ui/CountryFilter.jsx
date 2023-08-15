import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';

const options = [
  {
    value: 'all',
    label: 'Select Country',
  },
  {
    value: 'egypt',
    label: 'Egypt',
  },
  {
    value: 'syria',
    label: 'Syria',
  },
  {
    value: 'russia',
    label: 'Russia',
  },
  {
    value: 'america',
    label: 'America',
  },
  {
    value: 'morocco',
    label: 'Morocco',
  },
];

const CountryFilter = () => {
  const { term, handler: handleChange } = useFilter('country', true);

  return (
    <div>
      <SelectFilter
        options={options}
        onChange={handleChange}
        defaultValue={term}
      />
    </div>
  );
};

export default CountryFilter;
