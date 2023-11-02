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
  NotFound,
  Approved,
  Users
} from './pages';
import { Login, StudentSignup, TeacherSignup } from './pages/auth';
import { ProtectedRoutes } from './ui';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, pathname]);

  return (
    <div className='flex w-full'>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoutes>
              <AppLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='students' element={<Student />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='educational-program'>
            <Route index element={<EducationalProgram />} />
            <Route path='course' element={<Course />} />
          </Route>
          <Route path='approved' element={<Approved />} />
          <Route path='user-management' element={<Users />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/employee-signup' element={<TeacherSignup />} />
        <Route path='/student-signup' element={<StudentSignup />} />
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
          className:
            'bg-paper dark:bg-dark-paper text-primary-text dark:text-dark-primary-text',
        }}
      />
    </div>
  );
};

export default App;
