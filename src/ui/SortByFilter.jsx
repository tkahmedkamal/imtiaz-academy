import SelectFilter from './SelectFilter.jsx';
import { useFilter } from '../hooks';

const options = [
  {
    value: 'asc',
    label: 'Newest to Oldest',
  },
  {
    value: 'desc',
    label: 'Oldest to Newest',
  },
];

const SortByFilter = () => {
  const { term, handler: handleChange } = useFilter('sortBy', true, 'asc');

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

export default SortByFilter;
