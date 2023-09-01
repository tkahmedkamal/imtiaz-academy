import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AppLayout } from './layout';

import {
  Dashboard,
  Student,
  Teachers,
  EducationalProgram,
  Course,
  Login,
  NotFound,
} from './pages';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, pathname]);

  return (
    <div className='flex w-full'>
      <Routes>
        <Route path='/dashboard' element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='students' element={<Student />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='educational-program'>
            <Route index element={<EducationalProgram />} />
            <Route path='course' element={<Course />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<Login />} />
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
