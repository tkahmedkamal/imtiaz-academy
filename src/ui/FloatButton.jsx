const FloatButton = ({ children }) => {
  return (
    <span className='transition-color text-lg text-common-white duration-500 group-hover:text-common-black dark:group-hover:text-common-white'>
      {children}
    </span>
  );
};

export default FloatButton;
