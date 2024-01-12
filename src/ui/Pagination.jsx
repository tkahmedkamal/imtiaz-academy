import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import PaginationBtn from './PaginationBtn';

const Pagination = ({ limit, results, pageCount }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  let currentPage = +searchParams.get('page') || 1;

  const handleNext = () => {
    const next = currentPage >= pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  };

  const handlePrev = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  };

  if (!pageCount || pageCount <= 1) {
    return null;
  }

  return (
    <div className=' flex items-center border-b border-l border-r border-divider bg-default px-6 py-4 dark:border-dark-divider dark:bg-dark-default xs:flex-wrap xs:justify-center sm:flex-nowrap sm:justify-between'>
      <div className='font-publicSans text-sm text-primary-text dark:text-dark-secondary-text'>
        {t('pagination.showing')}{' '}
        <span className='font-publicSans font-semibold text-primary-text dark:text-dark-secondary-text'>
          {(currentPage - 1) * limit + 1}
        </span>{' '}
        {t('pagination.to')}{' '}
        <span className='font-publicSans font-semibold text-primary-text dark:text-dark-secondary-text'>
          {currentPage >= pageCount ? results : limit * currentPage}
        </span>{' '}
        {t('pagination.of')}{' '}
        <span className='font-publicSans font-semibold text-primary-text dark:text-dark-secondary-text'>
          {results}
        </span>{' '}
        {t('pagination.results')}
      </div>

      <div className='inline-flex xs:mt-3 sm:mt-0'>
        <PaginationBtn disabled={currentPage === 1} onClick={handlePrev}>
          <span className='text-xl'>
            <BsArrowLeftShort />
          </span>
          {t('pagination.prev')}
        </PaginationBtn>

        <PaginationBtn
          disabled={currentPage >= pageCount}
          onClick={handleNext}
          isNext
        >
          {t('pagination.next')}
          <span className='text-xl'>
            <BsArrowRightShort />
          </span>
        </PaginationBtn>
      </div>
    </div>
  );
};

export default Pagination;
