const tabs = [
  {
    label: 'Info',
  },
  {
    label: 'Contact',
  },
  {
    label: 'Enrollment',
  },
];

const StudentDetailsTabs = ({ tab, setTab }) => {
  const tabItems = tabs.map(({ label }) => (
    <button
      className={`w-full rounded-md border border-divider p-1.5 text-center font-publicSans font-semibold text-primary-text transition-colors duration-500 hover:bg-primary dark:border-dark-divider dark:text-dark-primary-text dark:hover:bg-dark-primary ${
        tab === label.toLowerCase() ? 'bg-primary dark:bg-dark-primary' : ''
      }`}
      key={label}
      onClick={() => setTab(label.toLowerCase())}
    >
      {label}
    </button>
  ));
  return (
    <div className='mt-6 flex items-center justify-between gap-2'>
      {tabItems}
    </div>
  );
};

export default StudentDetailsTabs;
