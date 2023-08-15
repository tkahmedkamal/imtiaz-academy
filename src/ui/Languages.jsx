import { EnFlag, MLFlag } from '../assets';
import { useConfig } from '../context/ConfigContext';

const Languages = () => {
  const { lng, handleSwitchLang } = useConfig();

  return (
    <button
      className='inline-flex cursor-pointer items-center justify-center rounded-lg bg-light-gray px-4 py-2 font-publicSans text-sm font-semibold text-primary-text transition-colors duration-500 dark:bg-dark-light-gray dark:text-dark-secondary-text'
      onClick={handleSwitchLang}
    >
      {lng === 'en' && (
        <>
          <img src={MLFlag} alt='Malaysia' className='mr-2 h-5 w-5' />
          Malaysia (MA)
        </>
      )}

      {lng === 'ml' && (
        <>
          <img src={EnFlag} alt='English' className='mr-2 h-5 w-5' />
          English (US)
        </>
      )}
    </button>
  );
};

export default Languages;
