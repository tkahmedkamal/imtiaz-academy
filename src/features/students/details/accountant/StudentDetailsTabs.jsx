import { useTranslation } from 'react-i18next';


const StudentDetailsTabs = ({ tab, setTab }) => {
  const { t } = useTranslation();
  const tabs = [
    {
      label: t('studentDetails.info'),
      id:"Info"
    },
    {
      label: t('studentDetails.contact'),
      id:"Contact"
    },
    {
      label: t('studentDetails.classData'),
      id:"Enrollment"
    },
  ];

  const tabItems = tabs.map(({ label, id }) => (
    <button
      className={`w-full rounded-md border border-divider p-1.5 text-center font-publicSans font-semibold text-primary-text transition-colors duration-500 hover:bg-primary dark:border-dark-divider dark:text-dark-primary-text dark:hover:bg-dark-primary ${
        tab === id.toLowerCase() ? 'bg-primary dark:bg-dark-primary' : ''
      }`}
      key={id}
      onClick={() => setTab(id.toLowerCase())}
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
