import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';

import { useSearch } from '../hooks';

const Search = () => {
  const { t } = useTranslation();
  const { searchValue, handleChange } = useSearch();

  return (
    <div>
      <div className='relative mt-0 w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-primary-text dark:text-dark-secondary-text'>
          <BiSearch />
        </div>
        <input
          type='text'
          className='block rounded-lg border border-divider p-2 pl-10 font-publicSans text-sm text-primary-text outline-none transition-colors duration-500 placeholder:text-secondary-text/50 focus:border-gray dark:border-dark-divider dark:bg-dark-light-gray dark:text-dark-primary-text/75 dark:placeholder:text-dark-secondary-text/75 dark:focus:border-dark-gray xs:w-full sm:w-60'
          placeholder={t('global.search')}
          onChange={handleChange}
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default Search;
