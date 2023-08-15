import { Link } from 'react-router-dom';

const Button = ({ children, icon, type, link, status, onClick }) => {
  const baseStyle =
    'inline-flex items-center rounded-md px-5 py-2.5 text-center font-publicSans text-sm font-medium transition duration-500 focus:outline-none focus:ring-4';
  const variants = {
    primary: `${baseStyle} bg-primary text-common-white hover:bg-secondary hover:text-primary-text focus:ring-primary/50 dark:bg-dark-primary dark:hover:bg-dark-secondary`,
    light: `${baseStyle} bg-light-gray text-primary-text hover:bg-gray/50 hover:text-primary-text focus:ring-gray/50 dark:bg-dark-light-gray dark:text-dark-gray dark:hover:bg-dark-gray/20`,
  };

  return (
    <>
      {!link && (
        <button
          type={type || 'button'}
          className={variants[status]}
          onClick={onClick}
        >
          <span className='text-2xl'>{icon}</span>
          {children}
        </button>
      )}

      {link && (
        <Link to={link} className={variants[status]}>
          <span className='text-2xl'>{icon}</span>
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
