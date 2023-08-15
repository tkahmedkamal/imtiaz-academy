const ButtonMini = ({ children, status, active, onClick }) => {
  const variants = {
    active:
      'bg-secondary dark:bg-dark-secondary text-common-black dark:text-common-white',
    inactive: 'text-common-black dark:text-dark-secondary-text',
  };

  return (
    <button
      className={`rounded-md px-3 py-1 font-publicSans text-sm font-medium ${
        active ? variants.active : variants.inactive
      }`}
      data-status={status}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonMini;
