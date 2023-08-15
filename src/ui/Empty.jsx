const Empty = ({ message }) => {
  return (
    <p className='px-2 py-6 text-center font-publicSans text-lg font-semibold text-primary-text dark:text-dark-secondary-text'>
      {`${message} 😞`}
    </p>
  );
};

export default Empty;
