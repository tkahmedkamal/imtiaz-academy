import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HiOutlineX } from 'react-icons/hi';
import { HiMenuAlt3 } from 'react-icons/hi';

import { AppLayout, Sidebar } from './layout';
import { FloatButton } from './ui';
import {
  Dashboard,
  Student,
  Teachers,
  EducationalProgram,
  EducationalProgramDetails,
  NotFound,
} from './pages';

const App = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleToggleSidebar = () => {
    setToggle(prev => !prev);
  };

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, pathname]);

  return (
    <div className='flex w-full'>
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

      <Routes>
        <Route path='/dashboard' element={<AppLayout toggle={toggle} />}>
          <Route index element={<Dashboard />} />
          <Route path='students' element={<Student />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='educational-program'>
            <Route index element={<EducationalProgram />} />
            <Route path='details' element={<EducationalProgramDetails />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            // color: "var(--color-grey-700)",
            // backgroundColor: "var(--color-grey-0)",
          },
        }}
      />
    </div>
  );
};

export default App;
