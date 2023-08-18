import { useField } from 'formik';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='w-full'>
      <label
        htmlFor={props.id.split(' ').join('')}
        className='mb-2 block font-publicSans text-xs font-semibold capitalize text-primary-text/80 dark:text-dark-secondary-text'
      >
        {label.split('-').join(' ')}
      </label>

      <input
        {...props}
        {...field}
        className={`block w-full rounded-lg border border-divider p-3 indent-2 text-sm text-primary-text placeholder-secondary-text/50 transition-colors duration-500 focus:border-primary focus-visible:outline-none dark:border-dark-divider dark:bg-dark-paper dark:text-dark-primary-text/75 dark:placeholder:text-dark-secondary-text/50 dark:focus:border-dark-primary ${
          meta.error &&
          meta.touched &&
          '!border-common-error text-common-error focus:border-common-error'
        }`}
      />

      {meta.error && meta.touched && (
        <p className='mt-2 font-inter text-sm text-common-error'>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default Input;
