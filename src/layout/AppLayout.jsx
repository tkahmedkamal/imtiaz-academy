import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import TopBar from './TopBar';
import { opacityVariants } from '../utils/motion';

const AppLayout = ({ toggle }) => {
  return (
    <>
      <TopBar toggle={toggle} />
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
