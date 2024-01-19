import { useSearchParams } from 'react-router-dom';

const useFilter = (key, select, defaultValue = 'all') => {
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get(key) || defaultValue;

  const handler = e => {
    let value;

    if (!select) {
      value = e.target.dataset.status;
    } else {
      value = e.target.value;
    }
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return {
    term,
    handler,
  };
};

export default useFilter;
