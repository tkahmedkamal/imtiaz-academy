import { useEffect, useState } from 'react';

import { Languages, Notification, SwitchTheme } from '../ui';

const TopBar = ({ toggle }) => {
  const [mobileWindow, setMobileWindow] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      setMobileWindow(true);
    } else {
      setMobileWindow(false);
    }
  }, []);

  return (
    <div
      className={
        !mobileWindow
          ? ` left-0 top-0 z-10 border-b border-divider bg-paper px-1 py-1 transition-all duration-150 dark:border-dark-divider dark:bg-dark-paper ${
              toggle ? 'ml-64 w-[calc(100vw-256px)]' : 'ml-0 w-full'
            }`
          : ' left-0 top-0 z-10 ml-0 w-full border-b border-divider bg-paper px-8 py-2 dark:border-dark-divider dark:bg-dark-paper'
      }
    >
      <ul className='flex items-center justify-end gap-2'>
        <Languages />
        <SwitchTheme />
        <Notification />
      </ul>
    </div>
  );
};

export default TopBar;
