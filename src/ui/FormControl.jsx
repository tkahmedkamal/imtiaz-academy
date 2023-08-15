const FormControl = ({ children }) => {
  return (
    <div className='flex items-center justify-between gap-4 xs:flex-wrap sm:flex-nowrap'>
      {children}
    </div>
  );
};

export default FormControl;
