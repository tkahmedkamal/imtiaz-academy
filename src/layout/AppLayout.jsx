import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';
import { HiMenuAlt3 } from 'react-icons/hi';

import TopBar from './TopBar';
import { Sidebar } from '../layout';
import { FloatButton } from '../ui';
import { opacityVariants } from '../utils/motion';

const AppLayout = () => {
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, []);

  const handleToggleSidebar = () => {
    setToggle(prev => !prev);
  };

  return (
    <>
      <TopBar toggle={toggle} />
      <AnimatePresence>{toggle && <Sidebar />}</AnimatePresence>

      <button
        className='group fixed bottom-9 right-6 z-50 cursor-pointer rounded-full bg-primary p-3 drop-shadow-2xl transition-colors duration-500 hover:bg-paper dark:bg-dark-primary dark:hover:bg-dark-light-gray'
        onClick={handleToggleSidebar}
      >
        {!toggle && (
          <FloatButton>
            <HiMenuAlt3 />
          </FloatButton>
        )}
        {toggle && (
          <FloatButton>
            <HiOutlineX />
          </FloatButton>
        )}
      </button>
      <main className='w-[calc(100%-256px)] flex-grow p-6'>
        <motion.div
          variants={opacityVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='m-auto mt-24 max-w-[1440px]'
        >
          <Outlet />
        </motion.div>
      </main>
    </>
  );
};

export default AppLayout;
