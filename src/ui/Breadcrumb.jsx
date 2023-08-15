import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsDot } from 'react-icons/bs';

const Breadcrumb = ({ prev, current, isPrev, prevLabel, prevLink }) => {
  const { t } = useTranslation();

  return (
    <nav className='flex font-publicSans' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center'>
          <Link
            to='/'
            className='inline-flex items-center text-sm text-gray hover:underline dark:text-dark-secondary-text'
          >
            {prev || t('sidebar.dashboard')}
          </Link>
        </li>
        {isPrev && (
          <li aria-current='page'>
            <Link
              to={`/${prevLink}`}
              className='flex items-center text-sm text-gray hover:underline dark:text-dark-secondary-text'
            >
              <span className='text-xl text-gray/80'>
                <BsDot />
              </span>
              {prevLabel}
            </Link>
          </li>
        )}
        <li aria-current='page'>
          <div className='flex items-center'>
            <span className='text-xl text-gray/80'>
              <BsDot />
            </span>
            <span className='ml-1 text-sm text-gray/60 dark:text-dark-secondary-text/50 md:ml-2'>
              {current}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
