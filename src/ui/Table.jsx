const Th = ({ children }) => {
  return (
    <th scope='col' className='px-4 py-2 text-center'>
      {children}
    </th>
  );
};

export const Tr = ({ children }) => {
  return (
    <tr className='border-b border-divider bg-paper transition-colors duration-500 hover:bg-gray/5 dark:border-dark-gray/20 dark:bg-dark-paper hover:dark:bg-dark-light-gray'>
      {children}
    </tr>
  );
};

export const Td = ({ classes, children }) => {
  return (
    <td
      className={`px-2 py-2 text-center text-sm font-medium text-primary-text dark:text-dark-secondary-text ${classes}`}
    >
      {children}
    </td>
  );
};

const Thead = ({ children }) => {
  return (
    <thead className='border-b border-divider bg-default text-xs uppercase text-primary-text dark:border-dark-gray/20 dark:bg-dark-default dark:text-dark-primary-text/75'>
      <tr>{children}</tr>
    </thead>
  );
};

const Tbody = ({ data, render }) => {
  return <tbody className='relative'>{data?.map(render)}</tbody>;
};

const Table = ({ children }) => {
  return (
    <table className='w-full border border-divider text-left font-publicSans text-sm text-primary-text dark:border-dark-divider'>
      {children}
    </table>
  );
};

Table.Th = Th;
Table.Tr = Tr;
Table.Td = Td;
Table.Thead = Thead;
Table.Tbody = Tbody;

export default Table;
