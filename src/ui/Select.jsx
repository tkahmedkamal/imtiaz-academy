import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

const Select = ({ label, set, children, ...props }) => {
  const [field, meta] = useField(props);
  const { t } = useTranslation();

  return (
    <div className='w-full'>
      <label
        htmlFor={props.id}
        className='mb-2 block font-publicSans text-xs font-semibold capitalize text-primary-text/80 dark:text-dark-secondary-text'
      >
        {label}
      </label>

      <select
        className={`block w-full rounded-lg border border-divider p-2.5 indent-2 text-sm text-primary-text transition-colors duration-500 focus:border-primary focus-visible:outline-none disabled:bg-disable dark:border-dark-divider dark:bg-dark-paper dark:text-dark-primary-text/75 dark:placeholder:text-dark-primary-text/50 dark:disabled:bg-dark-disable ${
          meta.error &&
          meta.touched &&
          'border-common-error text-common-error placeholder-common-error focus:border-common-error'
        }`}
        {...props}
        {...field}
        onChange={e => {
          field.onChange(e);
          if (set) {
            set(e.target.value);
          }
        }}
      >
        <option
          value=''
          defaultValue={`${t('global.choose')} ${label}`}
          className='text-secondary-text'
        >
          {t('global.choose')} {label}
        </option>
        {children}
      </select>

      {meta.error && meta.touched && (
        <p className='mt-2 font-inter text-sm text-common-error'>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default Select;
