import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';

import SidebarListItem from './SidebarListItem';
import { leftSideVariants } from '../utils/motion';
import { Logo } from '../ui';

const Sidebar = () => {
  const { t } = useTranslation();

  const listItems = [
    {
      label: t('sidebar.dashboard'),
      icon: <AiOutlineDashboard />,
      link: '/',
    },
    {
      label: t('sidebar.students'),
      icon: <HiOutlineUsers />,
      link: '/students',
    },
    {
      label: t('sidebar.teachers'),
      icon: <HiOutlineUserGroup />,
      link: '/teachers',
    },
    {
      label: t('sidebar.educational-program'),
      icon: <HiOutlineUserGroup />,
      link: '/educational-program',
    },
  ];

  return (
    <aside className='w-64 flex-shrink-0 overflow-hidden xs:fixed xs:z-20 md:static md:z-0'>
      <motion.div
        variants={leftSideVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='fixed z-20 h-full w-64 border-r border-dotted border-divider bg-paper py-6 drop-shadow-2xl transition-colors duration-150 dark:border-dark-divider dark:bg-dark-paper xs:shadow-2xl dark:xs:drop-shadow-2xl-dark md:shadow-none md:drop-shadow-none dark:md:shadow-none dark:md:drop-shadow-none'
      >
        <Link to='/' className='block items-center gap-3 px-6'>
          <Logo />
        </Link>

        <div className='mt-8 pt-5'>
          <ul className='space-y-4'>
            {listItems?.map(item => (
              <li
                className='font-publicSans font-medium text-secondary-text dark:text-dark-secondary-text'
                key={item.label}
              >
                <SidebarListItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
