const ActionBtn = ({ title, icon, status, onClick }) => {
  const variants = {
    primary: 'hover:text-common-info',
    danger: 'hover:text-common-error',
    warn: 'hover:text-common-warning',
  };

  return (
    <div
      className={`group cursor-pointer rounded-full p-1.5 text-lg text-gray transition-colors duration-500 hover:bg-gray/5 dark:hover:bg-dark-gray/10  ${variants[status]}`}
      title={title}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default ActionBtn;
