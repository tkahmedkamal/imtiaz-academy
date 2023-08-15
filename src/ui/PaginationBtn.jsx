const PaginationBtn = ({ onClick, disabled, isNext, children }) => {
  const variants = {
    next: 'rounded-r border-l border-divider dark:border-dark-divider',
    prev: 'rounded-l',
  };

  return (
    <button
      className={`flex h-8 items-center justify-center bg-light-gray px-3 font-publicSans text-sm font-medium text-primary-text transition-colors duration-500 hover:bg-primary hover:text-common-white disabled:bg-gray/25 disabled:text-gray disabled:line-through  dark:bg-dark-light-gray dark:text-dark-secondary-text dark:hover:bg-dark-primary dark:hover:text-common-white dark:disabled:bg-dark-gray/10 dark:disabled:text-dark-gray/80 ${
        isNext ? variants.next : variants.prev
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PaginationBtn;
