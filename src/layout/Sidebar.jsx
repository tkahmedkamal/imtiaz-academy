import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { BsCheckLg } from 'react-icons/bs';

import SidebarListItem from './SidebarListItem';
import { useAuthCtx } from '../context/authContext';
import { leftSideVariants } from '../utils/motion';
import { Logo } from '../ui';
import TopBar from './TopBar';

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthCtx();

  const logout = () => {
    localStorage.removeItem('im_access_token');
    queryClient.removeQueries();
    setUser(null);
    navigate('/login', { replace: true });
  };

  const listItems = [
    {
      label: t('sidebar.dashboard'),
      icon: <AiOutlineDashboard />,
      link: '/dashboard',
      show:
      user?.roles.includes('EnrollmentAgent') ||
      user.roles.includes('Admin')
    },
    {
      label: t('sidebar.registration'),
      icon: <HiOutlineUsers />,
      link: '/dashboard/students',
      show:
        user.roles.includes('EnrollmentAgent') 
    },
    {
      label: t('sidebar.students-enrollments'),
      icon: <HiOutlineUsers />,
      link: '/dashboard/students-enrollments',
      show:
        user?.roles.includes('EnrollmentAgent')
    },
    {
      label: t('sidebar.student-Fees'), // الرسوم الدراسية
      icon: <HiOutlineUsers />,
      link: '/dashboard/students-enrollments',
      show:
        user?.roles.includes('AccountantAgent')
    },
    {
      label: t('sidebar.total-student-Fees'), // الرسوم الدراسية
      icon: <HiOutlineUsers />,
      link: '/dashboard/students',
      show:
        user?.roles.includes('AccountantAgent')
    },
    {
      label: t('sidebar.teachers'),
      icon: <HiOutlineUserGroup />,
      link: '/dashboard/teachers',
      show:
      user?.roles.includes('EnrollmentAgent') ||
      user.roles.includes('Admin')
    },
    {
      label: t('sidebar.educational-program'),
      icon: <HiOutlineUserGroup />,
      link: '/dashboard/educational-program',
      show:
      user?.roles.includes('EnrollmentAgent') ||
      user.roles.includes('Admin')
    },
    {
      label: t('sidebar.course'),
      icon: <MdOutlineOndemandVideo />,
      link: '/dashboard/educational-program/course',
      show:
      user?.roles.includes('EnrollmentAgent') ||
      user.roles.includes('Admin')
    },
    {
      label: t('sidebar.approved'),
      icon: <BsCheckLg />,
      link: '/dashboard/approved',
      show: user?.roles.includes('Admin'),
    },
    {
      label: t('sidebar.userManagement'),
      icon: <HiOutlineUsers />,
      link: '/dashboard/user-management',
      show: user?.roles.includes('Admin'),
    },
    {
      label: t('sidebar.archivedStudents'),
      icon: <HiOutlineUsers />,
      link: '/dashboard/archived-students',
      show:
        // user?.roles.includes('AccountantAgent') ||
        user.roles.includes('EnrollmentAgent')
    },
    {
      label: t('sidebar.logout'),
      icon: <BiLogOut />,
      noLink: true,
      handler: logout,
    },
  ];

  return (
    <aside className='w-64 flex-shrink-0 overflow-hidden xs:fixed xs:z-20 md:static md:z-20'>
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
                <TopBar></TopBar>

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
