import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import LoadingButton from './LoadingButton';

const Confirm = ({
  closeModal,
  handleConfirm,
  isLoading,
  statusBtn,
  label,
  message,
  icon,
}) => {
  const { t } = useTranslation();

  return (
    <div className='space-y-6 text-center'>
      <img src={icon} alt={label} width={100} className='m-auto block' />
      <div className='space-y-2'>
        <h3 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
          {label}
        </h3>
        <p className='font-inter text-secondary-text dark:text-secondary-text'>
          {message}
        </p>
      </div>
      <div className='flex items-center justify-center gap-3'>
        <LoadingButton
          onClick={handleConfirm}
          isLoading={isLoading}
          status={statusBtn}
        >
          {label}
        </LoadingButton>
        <Button status='light' onClick={closeModal}>
          {t('global.cancel')}
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
