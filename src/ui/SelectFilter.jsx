import SelectOption from './SelectOption';

const SelectFilter = ({ options, onChange, defaultValue = 'all' }) => {
  return (
    <select
      className='placeholder:text-secondary-text-text/50 block w-full rounded-md border border-divider p-2.5 font-publicSans text-sm text-primary-text outline-none transition-colors duration-500 focus:border-gray dark:border-dark-divider dark:bg-dark-light-gray dark:text-dark-secondary-text dark:focus:border-dark-gray'
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <SelectOption key='all' value='all' label='All' />
      {options?.map(({ id, name }) => (
        <SelectOption key={id} value={name} label={name} />
      ))}
    </select>
  );
};

export default SelectFilter;
