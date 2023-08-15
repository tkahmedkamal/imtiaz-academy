import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    () => searchParams.get('search') || '',
  );

  const handleChange = e => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    let time = setTimeout(() => {
      searchParams.set('search', searchValue);
      setSearchParams(searchParams);
    }, 1000);

    return () => clearTimeout(time);
  }, [searchParams, searchValue, setSearchParams]);

  return {
    searchValue,
    handleChange,
  };
};

export default useSearch;
