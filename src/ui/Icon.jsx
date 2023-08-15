import React from 'react';

const Icon = ({ children, onClick }) => {
  return (
    <li
      className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-primary-text/5 transition duration-500 hover:bg-primary/10 hover:text-primary dark:bg-dark-light-gray dark:text-secondary-text dark:hover:bg-dark-primary/5 dark:hover:text-dark-primary'
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default Icon;
