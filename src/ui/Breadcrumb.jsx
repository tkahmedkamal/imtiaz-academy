import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsDot } from 'react-icons/bs';

const Breadcrumb = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const crumbs = pathname
    .split('/')
    .map(crumb => crumb)
    .filter(crumb => crumb !== '');
  let url = '';

  return (
    <nav className='flex font-publicSans' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center'>
        {crumbs.map((crumb, index) => {
          url += `/${crumb}`;
          const firstIndex = index !== 0;
          const lastIndex = index === crumbs.length - 1;

          return (
            <Fragment key={index}>
              {!lastIndex && (
                <li>
                  <Link
                    to={url}
                    className='flex items-center text-sm capitalize text-gray hover:underline dark:text-dark-secondary-text'
                  >
                    {firstIndex && (
                      <span className='text-xl text-gray/80'>
                        <BsDot />
                      </span>
                    )}
                    {t(`sidebar.${crumb}`)}
                  </Link>
                </li>
              )}
              {lastIndex && (
                <p className='flex items-center text-sm capitalize text-gray/60 dark:text-dark-secondary-text/60'>
                  <span className='text-xl text-gray/80'>
                    <BsDot />
                  </span>
                  {t(`sidebar.${crumb}`)}
                </p>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
