import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../ui/Breadcrumb';

const withPage = (Component, title, isPrev, prevLabel, prevLink) => {
  function Config(props) {
    const { t } = useTranslation();

    useEffect(() => {
      document.title = `${t(title)} - Imtiaz Academy`;
    }, [t]);

    return (
      <>
        <div className='mb-5 flex flex-wrap items-center justify-between'>
          <div className='space-y-2'>
            <h1 className='font-publicSans text-3xl font-semibold text-primary-text dark:text-dark-primary-text/75'>
              {t(title)}
            </h1>
            <Breadcrumb
              current={t(title)}
              isPrev={isPrev}
              prevLabel={t(prevLabel)}
              prevLink={prevLink}
            />
          </div>
        </div>
        <Component {...props} />
      </>
    );
  }

  return Config;
};

export default withPage;
